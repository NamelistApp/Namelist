<?php

namespace App\Http\Requests\Crm;

use App\Models\Enum\ObjectTypeId;
use App\Models\ObjectType;
use App\Models\Team;
use App\Rules\UniquePropertyValue;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class CrmObjectCreateRequest extends FormRequest
{
    public function __construct(Team $team, ObjectType $objectType) {}

    public function attributes(): array
    {
        return [
            'properties.emailAddress' => 'email address',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $uniqueObjectTypeProperties = [
            ObjectTypeId::Contact->value => ['emailAddress'],
        ];

        Log::debug($this->objectType);

        $validations = $this->objectType->customFields
            ->pluck('validations', 'name')
            ->mapWithKeys(fn ($validations, $name) => ["properties.$name" => $validations])
            ->toArray();

        $uniqueProperties = $uniqueObjectTypeProperties[$this->objectType->id] ?? [];

        foreach ($uniqueProperties as $property) {
            $validations["properties.$property"][] = new UniquePropertyValue($this->team, $this->objectType->id, 'emailAddress');
        }

        Log::debug('validations', $validations);

        return $validations;
    }
}
