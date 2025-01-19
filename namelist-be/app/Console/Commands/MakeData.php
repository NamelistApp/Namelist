<?php

namespace App\Console\Commands;

use App\Jobs\Models\ProcessEvent;
use App\Jobs\ProcessEventJob;
use App\Models\Eloquent\CrmObjectProperty;
use App\Models\Eloquent\CrmObjectType;
use App\Models\Eloquent\CrmPropertyDefinition;
use App\Models\Eloquent\Objects\Contact;
use App\Models\Eloquent\Objects\Form;
use App\Models\Eloquent\Portal;
use App\Models\Enum\EventName;
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

    private function makeForms(Portal $portal)
    {
        $objectType = CrmObjectType::find('form');
        $form = Form::factory()->for($portal)->create();

        $properties = [
            'name' => 'Demo form',
            'type' => 'waitlist',
            'fields' => [
                'name' => 'email',
                'type' => 'email',
                'required' => true,
            ],
        ];

        $propertyDefinitions = CrmPropertyDefinition::where('crm_object_type_id', $objectType->id)
            ->whereIn('key', array_keys($properties))
            ->get();

        foreach ($properties as $key => $value) {
            $property = $propertyDefinitions->first(function (CrmPropertyDefinition $definition) use ($key) {
                return $definition->key === $key;
            });
            $form->properties()->forceCreate([
                'crm_property_definition_id' => $property->id,
                'portal_id' => $portal->id,
                'crm_object_type_id' => $objectType->id,
                'name' => $property->name,
                'key' => $key,
                'value' => $value,
            ]);
        }

        for ($i = 0; $i < mt_rand(2000, 6000); $i++) {
            ProcessEventJob::dispatch($portal, ProcessEvent::dummyEvent(EventName::formViewed, [EventName::formId => $form->id]));
        }

        for ($i = 0; $i < mt_rand(2000, 4000); $i++) {
            ProcessEventJob::dispatch($portal, ProcessEvent::dummyEvent(EventName::formSubmitted, [EventName::formId => $form->id]));
        }

        $this->info('Created form. Run events queue to process events.');
    }

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

        $this->makeForms($portal);
    }
}
