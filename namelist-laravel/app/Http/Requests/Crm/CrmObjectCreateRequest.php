<?php

namespace App\Http\Requests\Crm;

use App\Models\Enum\ObjectTypeId;
use App\Models\ObjectType;
use App\Models\Portal;
use App\Rules\UniquePropertyValue;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class CrmObjectCreateRequest extends FormRequest
{
    public function __construct(Portal $portal, ObjectType $objectType) {}

    public function attributes(): array
    {
        return [
            'properties.email_address' => 'email address',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $uniqueObjectTypeProperties = [
            ObjectTypeId::Contact->value => ['email_address'],
        ];

        $validations = $this->objectType->propertyDefinitions
            ->pluck('validations', 'name')
            ->mapWithKeys(fn ($validations, $name) => ["properties.$name" => explode('|', $validations)])
            ->toArray();

        $uniqueProperties = $uniqueObjectTypeProperties[$this->objectType->id] ?? [];

        foreach ($uniqueProperties as $property) {
            $validations["properties.$property"][] = new UniquePropertyValue($this->portal, $this->objectType->id, 'email_address');
        }

        Log::debug('validations', $validations);

        return $validations;
    }
}
