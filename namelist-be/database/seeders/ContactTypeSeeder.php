<?php

namespace Database\Seeders;

use App\Models\Eloquent\CrmObjectType;
use App\Models\Enum\ObjectTypeId;
use App\Models\Enum\PropertyDefinitionType;
use Illuminate\Database\Seeder;

class ContactTypeSeeder extends Seeder
{
    public function run(): void
    {
        $contactObjectType = CrmObjectType::create([
            'id' => ObjectTypeId::Contact,
            'name' => 'Contact',
        ]);

        $contactProperties = [
            [
                'name' => 'first_name',
                'type' => PropertyDefinitionType::text,
                'validations' => ['required_without:properties.email_address', 'nullable', 'string', 'max:120'],
            ],
            [
                'name' => 'last_name',
                'type' => PropertyDefinitionType::text,
                'validations' => ['nullable', 'string', 'max:120'],
            ],
            [
                'name' => 'company_name',
                'type' => PropertyDefinitionType::text,
                'validations' => ['nullable', 'string', 'max:120'],
            ],
            [
                'name' => 'email_address',
                'type' => PropertyDefinitionType::emailAddress,
                'validations' => ['required_without:properties.first_name', 'nullable', 'email'],
            ],
            [
                'name' => 'phone_number',
                'type' => PropertyDefinitionType::phoneNumber,
                'validations' => ['nullable', 'string', 'max:120'],
            ],
            [
                'name' => 'source',
                'type' => PropertyDefinitionType::text,
                'validations' => ['nullable', 'string', 'max:120'],
            ],
            [
                'name' => 'notes',
                'type' => PropertyDefinitionType::textArea,
                'validations' => ['nullable', 'string'],
            ],
            [
                'name' => 'tags',
                'type' => PropertyDefinitionType::list,
                'validations' => ['nullable', 'array'],
            ],
            [
                'name' => 'owner_id',
                'type' => PropertyDefinitionType::number,
                'validations' => ['nullable', 'integer'],
            ],
            [
                'name' => 'last_touched_at',
                'type' => PropertyDefinitionType::date,
                'validations' => ['nullable', 'date'],
            ],
            [
                'name' => 'archived_at',
                'type' => PropertyDefinitionType::date,
                'validations' => ['nullable', 'date'],
            ],
        ];

        foreach ($contactProperties as $property) {
            $contactObjectType->propertyDefinitions()->create([
                'key' => $property['name'],
                'name' => ucwords(str_replace('_', ' ', $property['name'])),
                'type' => $property['type'],
                'validations' => $property['validations'],
            ]);
        }
    }
}
