<?php

namespace App\Console\Commands;

use App\Jobs\Models\ProcessEvent;
use App\Jobs\ProcessEventJob;
use App\Models\Eloquent\CrmObjectProperty;
use App\Models\Eloquent\CrmObjectType;
use App\Models\Eloquent\CrmPropertyDefinition;
use App\Models\Eloquent\Objects\Contact;
use App\Models\Eloquent\Portal;
use Illuminate\Console\Command;

class MakeData extends Command
{
    protected $signature = 'app:make-data {portalId}';

    protected $description = 'Make dummy data for a portal';

    private function makeContacts(Portal $portal, CrmObjectType $objectType, array $propertyKeys)
    {
        $propertyDefinitions = CrmPropertyDefinition::where('crm_object_type_id', $objectType->id)
            ->whereIn('key', array_keys($propertyKeys))
            ->get();

        $contacts = Contact::factory()
            ->count(mt_rand(1000, 3000))
            ->for($portal)
            ->create();

        $rows = [];

        foreach ($contacts as $contact) {
            foreach ($propertyKeys as $key => $value) {
                $property = $propertyDefinitions->first(function (CrmPropertyDefinition $definition) use ($key) {
                    return $definition->key === $key;
                });
                $rows[] = [
                    'crm_object_id' => $contact->id,
                    'crm_property_definition_id' => $property->id,
                    'portal_id' => $portal->id,
                    'crm_object_type_id' => $objectType->id,
                    'name' => $property->name,
                    'key' => $property->key,
                    'value' => json_encode($value()),
                ];
            }
        }

        collect($rows)->chunk(1000)->each(function ($chunk) {
            CrmObjectProperty::insert($chunk->toArray());
        });

        $this->info('Created '.count($contacts).' '.$objectType->name.'s');
    }

    /**
     * Given the portal id, make a bunch of people, forms, events, etc. There should be dummy data for all object types
     */
    public function handle()
    {
        $portal = Portal::find($this->argument('portalId'));

        $this->makeContacts($portal, CrmObjectType::find('contact'), [
            'first_name' => fn () => fake()->firstName(),
            'last_name' => fn () => fake()->lastName(),
            'company_name' => fn () => fake()->company(),
            'email_address' => fn () => fake()->email(),
            'phone_number' => fn () => fake()->phoneNumber(),
            'source' => fn () => fake()->randomElement(['web', 'ios', 'android']),
            'notes' => fn () => fake()->text(),
            'last_touched_at' => fn () => fake()->date(),
        ]);

        //       $eventsJson = '[
        //   {
        //     "distinct_id": "$annon:2698dda2-cabe-4bd2-a3bc-f29fafaf6c37",
        //     "properties": {
        //       "$app_version": "1.0",
        //       "$set": {"test": "value"},
        //       "$os_version": "17.4",
        //       "$identifier": "io.paywalls.PaywallsExample",
        //       "$lib": "swift",
        //       "$lib_version": "0.1.0",
        //       "$app_build_number": "1",
        //       "$manufacturer": "Apple",
        //       "$device_model": "arm64",
        //       "$screen_height": "852",
        //       "$screen_width": "393",
        //       "$os": "iOS",
        //       "$form_id": "1"
        //     },
        //     "name": "$form_viewed",
        //     "timestamp": 1723178013,
        //     "uuid": "0d55659e-aba4-4937-89a6-c4621b2457ca"
        //   },
        //   {
        //     "distinct_id": "$annon:fe0ccd41-2104-4e43-b1bb-9e3cbf056c41",
        //     "properties": {
        //       "$app_version": "1.0",
        //       "$set": {"test": "value"},
        //       "$os_version": "17.4",
        //       "$identifier": "io.paywalls.PaywallsExample",
        //       "$lib": "swift",
        //       "$lib_version": "0.1.0",
        //       "$app_build_number": "1",
        //       "$manufacturer": "Apple",
        //       "$device_model": "arm64",
        //       "$screen_height": "852",
        //       "$screen_width": "393",
        //       "$os": "iOS"
        //     },
        //     "name": "Test Event",
        //     "timestamp": 1723178013,
        //     "uuid": "235254C8-A136-45D2-8E8B-41E9B4809B41"
        //   },
        //   {
        //     "uuid": "DC3271B4-C2DA-44D6-88E6-B8A6218D3D27",
        //     "timestamp": 1723178015,
        //     "properties": {
        //       "$manufacturer": "Apple",
        //       "$set": {},
        //       "$device_model": "arm64",
        //       "$app_version": "1.0",
        //       "$identifier": "io.paywalls.PaywallsExample",
        //       "$os": "iOS",
        //       "$unset": [],
        //       "$screen_height": "852",
        //       "$set_once": {},
        //       "$lib": "swift",
        //       "$os_version": "17.4",
        //       "$screen_width": "393",
        //       "$app_build_number": "1",
        //       "$lib_version": "0.1.0",
        //       "$anon_distinct_id": "$annon:fe0ccd41-2104-4e43-b1bb-9e3cbf056c41"
        //     },
        //     "distinct_id": "McTester",
        //     "name": "$identify"
        //   },
        //   {
        //     "uuid": "b1e1f163-bd4b-4ddf-a18d-9b32fcc22b91",
        //     "timestamp": 1723178015,
        //     "properties": {
        //       "$manufacturer": "Apple",
        //       "$set": {},
        //       "test-event-property": "test",
        //       "$device_model": "arm64",
        //       "$app_version": "1.0",
        //       "$identifier": "io.paywalls.PaywallsExample",
        //       "$os": "iOS",
        //       "$unset": [],
        //       "$screen_height": "852",
        //       "$set_once": {},
        //       "$lib": "swift",
        //       "$os_version": "17.4",
        //       "$screen_width": "393",
        //       "$app_build_number": "1",
        //       "$lib_version": "0.1.0"
        //     },
        //     "distinct_id": "McTester",
        //     "name": "test_event"
        //   }
        // ]';

        //       $events = json_decode($eventsJson, true);
        //       $portal = Portal::find($this->argument('portalId'));
        //       foreach ($events as $event) {
        //           ProcessEventJob::dispatch($portal, new ProcessEvent($event));
        //       }
    }
}
