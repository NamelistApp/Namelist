<?php

namespace Database\Seeders;

use App\Models\Eloquent\CrmObjectType;
use App\Models\Enum\FormType;
use App\Models\Enum\ObjectTypeId;
use App\Models\Enum\PropertyDefinitionType;
use Illuminate\Database\Seeder;

class FormTypeSeeder extends Seeder
{
    public function run(): void
    {
        if (CrmObjectType::where('id', ObjectTypeId::Form)->exists()) {
            return;
        }

        $objectType = CrmObjectType::updateOrCreate([
            'id' => ObjectTypeId::Form,
            'name' => 'Form',
        ]);

        $properties = [
            [
                'name' => 'name',
                'type' => PropertyDefinitionType::text,
                'validations' => ['required', 'string'],
            ],
            [
                'name' => 'type',
                'type' => PropertyDefinitionType::text,
                'validations' => ['required', 'string', 'in:'.implode(',', array_column(FormType::cases(), 'value'))],
            ],
            [
                'name' => 'fields',
                'type' => PropertyDefinitionType::json,
                'validations' => ['required', 'array'],
            ],
        ];

        foreach ($properties as $property) {
            $objectType->propertyDefinitions()->updateOrCreate([
                'key' => $property['name'],
                'name' => ucwords(str_replace('_', ' ', $property['name'])),
                'type' => $property['type'],
                'validations' => $property['validations'],
            ]);
        }
    }
}
