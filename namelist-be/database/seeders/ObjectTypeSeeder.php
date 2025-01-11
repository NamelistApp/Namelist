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
                'name' => 'firstName',
                'type' => PropertyDefinitionType::text,
                'validations' => explode('|', 'required_without:properties.emailAddress|nullable|string|max:120'),
            ],
            [
                'name' => 'lastName',
                'type' => PropertyDefinitionType::text,
                'validations' => explode('|', 'nullable|string|max:120'),
            ],
            [
                'name' => 'emailAddress',
                'type' => PropertyDefinitionType::emailAddress,
                'validations' => explode('|', 'required_without:properties.firstName|nullable|email'),
            ],
            [
                'name' => 'phoneNumber',
                'type' => PropertyDefinitionType::phoneNumber,
                'validations' => explode('|', 'nullable|string|max:30'),
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
