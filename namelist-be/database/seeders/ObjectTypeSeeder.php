<?php

namespace Database\Seeders;

use App\Models\Enum\ObjectTypeId;
use App\Models\Enum\PropertyDefinitionType;
use App\Models\ObjectType;
use Illuminate\Database\Seeder;

class ObjectTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contactObjectType = ObjectType::forceCreate([
            'id' => ObjectTypeId::Contact->value,
            'name' => 'Contact',
        ]);

        $contactProperties = [
            [
                'name' => 'first_name',
                'type' => PropertyDefinitionType::text,
                'validations' => 'required_without:properties.email_address|nullable|string|max:120',
            ],
            [
                'name' => 'last_name',
                'type' => PropertyDefinitionType::text,
                'validations' => 'nullable|string|max:120',
            ],
            [
                'name' => 'email_address',
                'type' => PropertyDefinitionType::emailAddress,
                'validations' => 'required_without:properties.first_name|nullable|email',
            ],
            [
                'name' => 'phone_number',
                'type' => PropertyDefinitionType::phoneNumber,
                'validations' => 'nullable|string|max:30',
            ],
        ];

        foreach ($contactProperties as $property) {
            $contactObjectType->customFields()->create([
                'title' => $property['name'],
                'fieldType' => $property['type'],
                'validations' => $property['validations'],
            ]);
        }
    }
}
