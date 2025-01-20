<?php

namespace App\Jobs\Models;

use App\Models\Enum\EventProperty;
use App\Models\Enum\PropertyName;

final class ProcessEvent
{
    public string $distinctId;

    public string $name;

    public array $properties;

    public int $timestamp;

    public string $uuid;

    private $eventToUserProperties;

    private const eventToUserProperties = [
        PropertyName::appVersion,
        PropertyName::appName,
        PropertyName::appNamespace,
        PropertyName::appBuildNumber,
        PropertyName::osVersion,
        PropertyName::appNamespace,
        PropertyName::libVersion,
        PropertyName::deviceType,
        PropertyName::os,
        PropertyName::deviceType,
        PropertyName::deviceModel,
    ];

    public function __construct(array $event)
    {
        $this->eventToUserProperties = collect(ProcessEvent::eventToUserProperties);

        $event = collect($event);
        $this->distinctId = $event->get('distinct_id');
        $this->name = $event->get('name');
        $this->properties = $this->personProperties($event->get('properties'));
        $this->timestamp = $event->get('timestamp');
        $this->uuid = $event->get('uuid');
    }

    private function personProperties(array $properties): array
    {
        $properties = collect($properties);
        $userProperties = $properties->filter(function ($values, $key) {
            return $this->eventToUserProperties->contains($key);
        });

        $setOnceProperties = $userProperties->mapWithKeys(function ($value, $key) {
            return [
                '$initial_'.str_replace('$', '', $key) => $value,
            ];
        });

        $setProperties = [...$userProperties, ...$properties->get(EventProperty::set, [])];

        if (count($setProperties)) {
            $properties->put(EventProperty::set, $setProperties);
        }
        if (count($setOnceProperties)) {
            $properties->put(EventProperty::setOnce, [...$properties->get(EventProperty::setOnce, []), ...$setOnceProperties]);
        }

        return $properties->all();
    }

    public function toArray(): array
    {
        return [
            'distinct_id' => $this->distinctId,
            'name' => $this->name,
            'properties' => $this->properties,
            'timestamp' => $this->timestamp,
            'uuid' => $this->uuid,
        ];
    }

    public static function dummyEvent(string $name, array $withProperties = []): self
    {
        return new self([
            'distinct_id' => fake()->uuid(),
            'name' => $name,
            'properties' => array_merge($withProperties, [
                '$app_version' => fake()->semver(),
                '$initial_app_version' => fake()->semver(),
                '$app_build_number' => fake()->randomNumber(5, true),
                '$initial_app_build_number' => fake()->randomNumber(5, true),
                '$app_name' => fake()->word(),
                '$initial_app_name' => fake()->word(),
                '$app_namespace' => fake()->domainName(),
                '$initial_app_namespace' => fake()->domainName(),
                '$os_version' => fake()->numerify('#.#.#'),
                '$initial_os_version' => fake()->numerify('#.#.#'),
                '$lib_version' => fake()->semver(),
                '$initial_lib_version' => fake()->semver(),
                '$device_type' => fake()->randomElement(['phone', 'tablet', 'desktop']),
                '$initial_device_type' => fake()->randomElement(['phone', 'tablet', 'desktop']),
                '$os' => fake()->randomElement(['iOS', 'Android', 'Windows', 'Linux', 'macOS']),
                '$initial_os' => fake()->randomElement(['iOS', 'Android', 'Windows', 'Linux', 'macOS']),
                '$device_model' => fake()->word(),
                '$ios_device_model' => fake()->randomElement(['iPhone 12', 'iPhone 13 Pro', 'iPhone SE']),
                '$initial_device_model' => fake()->word(),
                '$screen_width' => fake()->numberBetween(720, 3840),
                '$screen_height' => fake()->numberBetween(480, 2160),
                '$manufacturer' => fake()->company(),
                '$network_wifi' => fake()->boolean(),
                '$network_cellular' => fake()->boolean(),
                '$session_duration_seconds' => fake()->numberBetween(1, 3600),
            ]),
            'timestamp' => fake()->dateTimeBetween('-1 year', 'now')->getTimestamp(),
            'uuid' => fake()->uuid(),
        ]);
    }
}
