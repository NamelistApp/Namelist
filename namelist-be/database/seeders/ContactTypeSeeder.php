<?php

namespace Database\Seeders;

use App\Models\Eloquent\CrmObjectType;
use App\Models\Enum\ObjectTypeId;
use App\Models\Enum\PropertyDefinitionType;
use Illuminate\Database\Seeder;

class ContactTypeSeeder extends Seeder
{
    const CONTACT_PROPERTIES = [
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

    public function run(): void
    {
        if (CrmObjectType::where('id', ObjectTypeId::Contact)->exists()) {
            return;
        }

        $contactObjectType = CrmObjectType::create([
            'id' => ObjectTypeId::Contact,
            'name' => 'Contact',
        ]);

        foreach (static::CONTACT_PROPERTIES as $property) {
            $contactObjectType->propertyDefinitions()->create([
                'key' => $property['name'],
                'type' => $property['type'],
                'validations' => $property['validations'],
            ]);
        }
    }
}
