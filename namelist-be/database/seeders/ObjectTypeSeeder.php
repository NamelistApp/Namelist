<?php

namespace Database\Seeders;

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
        $contactObjectType = ObjectType::create([
            'name' => 'Contact',
        ]);

        $contactProperties = [
            'first_name' => PropertyDefinitionType::text,
            'last_name' => PropertyDefinitionType::text,
            'email_address' => PropertyDefinitionType::email,
            'phone_number' => PropertyDefinitionType::phoneNumber,
        ];

        foreach ($contactProperties as $name => $type) {
            $contactObjectType->properties()->create([
                'name' => $name,
                'type' => $type,
            ]);
        }
    }
}
