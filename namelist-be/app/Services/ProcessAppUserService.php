<?php

// Very much inspired by PostHog. Thank you 🙏🏻: https://github.com/PostHog/posthog/blob/master/plugin-server/src/worker/ingestion/person-state.ts

namespace App\Services;

use App\Jobs\Models\ProcessEvent;
use App\Models\Eloquent\AppUser;
use App\Models\Eloquent\AppUserDistinctId;
use App\Models\Eloquent\Portal;
use App\Models\Enum\EventName;
use App\Models\Enum\EventProperty;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProcessAppUserService
{
    public function __construct(
        protected Portal $portal,
        protected ProcessEvent $event
    ) {
        $this->portal = $portal;
        $this->event = $this->event;
    }

    public function run(): void
    {
        $appUser = $this->handleIdentifyOrAlias();
        if ($appUser) {
            $this->updateAppUserProperties($appUser, true);
        } else {
            $this->updateProperties();
        }
    }

    private function updateProperties(): void
    {
        $appUser = $this->portal->fetchAppUser($this->event->distinctId);

        if ($appUser) {
            $appUser->properties = $this->eventPropertiesUpdated($appUser->properties);
            $appUser->save();
        } else {
            $properties = $this->eventPropertiesUpdated();
            $this->createUser(
                $properties,
                false,
                [$this->event->distinctId],
                $this->event->uuid,
                $this->event->timestamp
            );
        }
    }

    private function updateAppUserProperties(AppUser $appUser, $isIdentified = false)
    {
        $properties = $this->eventPropertiesUpdated($appUser->properties);

        $appUser->properties = $properties;
        if ($isIdentified) {
            $appUser->is_identified = true;
        }
        $appUser->save();
    }

    private function handleIdentifyOrAlias(): ?AppUser
    {
        try {
            if (
                collect([
                    EventName::createAlias,
                    EventName::mergeDangerously,
                ])->contains($this->event->name)
                && isset($this->event->properties[EventProperty::alias->value])
            ) {
                return $this->merge(
                    (string) $this->event->properties[EventProperty::alias->value],
                    $this->event->distinctId
                );
            } elseif (
                $this->event->name == EventName::identify
                && $anonDistinctId = $this->event->properties[EventProperty::anonDistinctId->value] ?? null
            ) {
                // Merge anonomous distinct id into identified distinct id
                return $this->merge(
                    $this->event->properties[EventProperty::anonDistinctId->value],
                    $this->event->distinctId
                );
            }
        } catch (\Exception $e) {
            Log::error($e, [
                'location' => 'handleIdentifyOrAlias',
                'event' => $this->event,
                'distinctId' => $this->event->distinctId,
                'anonDistinctId' => $this->event->properties[EventProperty::anonDistinctId->value] ?? null,
                'alias' => $this->event->properties[EventProperty::alias->value] ?? null,
            ]);
        }

        return null;
    }

    private function merge(string $otherDistinctId, string $mergeIntoDistinctId): ?AppUser
    {
        if ($otherDistinctId == $mergeIntoDistinctId) {
            return null;
        }

        $otherAppUser = $this->portal->fetchAppUser($otherDistinctId);
        $mergeIntoAppUser = $this->portal->fetchAppUser($mergeIntoDistinctId);

        if ($otherAppUser && ! $mergeIntoAppUser) {
            // @davidmoreen Merge user doesnt exists but other does. Attach the merge distinct id to the other user by inserting it into the app_user_distinct_id table
            // with the other users' app_user_id
            $this->portal->appUserDistinctIds()->create([
                'app_user_id' => $otherAppUser->id,
                'distinct_id' => $mergeIntoDistinctId,
            ]);

            return $otherAppUser;
        } elseif (! $otherAppUser && $mergeIntoAppUser) {
            // @davidmoreen Merge user exists but other doesn't. Attach the other distinct id to the other user by inserting it into the app_user_distinct_id table
            // with the other users' app_user_id
            $this->portal->appUserDistinctIds()->create([
                'app_user_id' => $mergeIntoAppUser->id,
                'distinct_id' => $otherDistinctId,
            ]);

            return $mergeIntoAppUser;
        } elseif ($otherAppUser && $mergeIntoAppUser) {
            // @davidmoreen Both users exist. Merge them together
            if ($otherAppUser->id == $mergeIntoAppUser->id) {
                return $mergeIntoAppUser;
            }

            return $this->mergeAppUsers(
                $mergeIntoAppUser,
                $otherAppUser,
            );
        } else {
            // @davidmoreen neither user exists. Create new user and set it to is_identified=true. Attach both distinct ids to the new user.
            return $this->createUser(
                $this->eventPropertiesUpdated(), // @davidmoreen a list of default properties to create the user with
                true,
                [$mergeIntoDistinctId, $otherDistinctId],
                $this->event->uuid,
                $this->event->timestamp
            );
        }
    }

    private function createUser(
        array $properties,
        bool $isIdentified,
        array $distinctIds,
        string $createdEventUuid,
        int $timestamp
    ): AppUser {
        if (count($distinctIds) < 1) {
            throw new \Exception('No distinct ids passed');
        }

        $appUser = $this->portal->appUsers()->forceCreate([
            'properties' => array_merge($properties, [EventProperty::creatorEventUuid->value => $createdEventUuid]),
            'is_identified' => $isIdentified,
            'created_at' => $timestamp,
        ]);
        collect($distinctIds)->each(function ($distinctId) use ($appUser) {
            $this->portal->appUserDistinctIds()->create([
                'app_user_id' => $appUser->id,
                'distinct_id' => $distinctId,
            ]);
        });

        return $appUser;
    }

    private function mergeAppUsers(
        AppUser $mergeInto,
        AppUser $otherUser
    ): AppUser {
        // min created_at bettwen the two app users
        $firstTimeSeen = min($mergeInto->created_at, $otherUser->created_at);
        $canMerge = $this->canMerge($otherUser);

        if (! $canMerge) {
            Log::warning('Cannot merge user %d and %d', $mergeInto->id, $otherUser->id);

            return $mergeInto; // The original user from the event
        }

        $properties = array_merge($otherUser->properties, $mergeInto->properties);
        $properties = $this->eventPropertiesUpdated($properties);

        return $this->handleMerge($mergeInto, $otherUser, $firstTimeSeen, $properties);
    }

    private function handleMerge(
        AppUser $target,
        AppUser $source,
        \DateTime $firstTimeSeen,
        array $properties
    ): AppUser {
        try {
            DB::beginTransaction();

            // Update the user
            $target->created_at = $firstTimeSeen;
            $target->properties = $properties;
            $target->is_identified = true; // Identified b/c this would be called downstream of handleIdentifyOrAlias
            $target->save();

            // update the distinct ids
            AppUserDistinctId::where([
                'app_user_id', $source->id,
                'portal_id', $target->portal_id,
            ])->update([
                'app_user_id' => $target->id,
            ]);

            $source->delete();

            DB::commit();

            return $target;
        } catch (\Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }

    /**
     * Either is merge_dangerously or app user is not already identified:
     * $create_alias and $identify events will not merge a user who's already identified
     */
    private function canMerge(AppUser $appUser): bool
    {
        return $this->event->name == EventName::mergeDangerously || ! $appUser->is_identified;
    }

    private function eventPropertiesUpdated(array $personProperties = []): array
    {
        $properties = $this->event->properties[EventProperty::set->value] ?? [];
        $setOnceProperties = $this->event->properties[EventProperty::setOnce->value] ?? [];
        $unsetProperties = $this->event->properties[EventProperty::unset->value] ?? [];

        foreach ($properties as $key => $value) {
            if (! isset($personProperties[$key]) || $personProperties[$key] !== $value) {
                $personProperties[$key] = $value;
            }
        }
        foreach ($setOnceProperties as $key => $value) {
            if (! isset($personProperties[$key])) {
                $personProperties[$key] = $value;
            }
        }
        foreach ($unsetProperties as $key) {
            if (isset($personProperties[$key])) {
                unset($personProperties[$key]);
            }
        }

        return $personProperties;
    }
}
