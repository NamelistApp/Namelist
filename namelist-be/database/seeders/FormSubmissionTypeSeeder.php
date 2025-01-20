<?php

namespace Database\Seeders;

use App\Models\Eloquent\CrmObjectType;
use App\Models\Enum\ObjectTypeId;
use App\Models\Enum\PropertyDefinitionType;
use Illuminate\Database\Seeder;

class FormSubmissionTypeSeeder extends Seeder
{
    public function run(): void
    {
        if (CrmObjectType::where('id', ObjectTypeId::FormSubmission)->exists()) {
            return;
        }

        $objectType = CrmObjectType::create([
            'id' => ObjectTypeId::FormSubmission,
            'name' => 'Form Submission',
        ]);

        $properties = [
            [
                'name' => 'fields',
                'type' => PropertyDefinitionType::json,
                'validations' => ['required', 'json'],
            ],
        ];

        foreach ($properties as $property) {
            $objectType->propertyDefinitions()->create([
                'key' => $property['name'],
                'type' => $property['type'],
                'validations' => $property['validations'],
            ]);
        }
    }
}
