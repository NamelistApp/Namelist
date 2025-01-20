<?php

namespace Database\Seeders;

use App\Models\Eloquent\CrmObjectType;
use App\Models\Enum\EngagementType;
use App\Models\Enum\ObjectTypeId;
use App\Models\Enum\PropertyDefinitionType;
use Illuminate\Database\Seeder;

class EngagementTypeSeeder extends Seeder
{
    public function run(): void
    {
        if (CrmObjectType::where('id', ObjectTypeId::Engagement)->exists()) {
            return;
        }

        $objectType = CrmObjectType::create([
            'id' => ObjectTypeId::Engagement,
            'name' => 'Engagement',
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
                'validations' => ['required', 'string', 'in:'.implode(',', array_column(EngagementType::cases(), 'value'))],
            ],
            [
                'name' => 'outcome',
                'type' => PropertyDefinitionType::text,
                'validations' => ['nullable', 'string'],
            ],
            [
                'name' => 'start_date',
                'type' => PropertyDefinitionType::date,
                'validations' => ['nullable', 'date'],
            ],
            [
                'name' => 'end_date',
                'type' => PropertyDefinitionType::date,
                'validations' => ['nullable', 'date'],
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
