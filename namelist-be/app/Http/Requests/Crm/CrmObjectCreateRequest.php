<?php

namespace App\Http\Requests\Crm;

use App\Models\Eloquent\CrmObjectType;
use App\Models\Eloquent\Portal;
use App\Models\Enum\ObjectTypeId;
use App\Rules\UniquePropertyValue;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class CrmObjectCreateRequest extends FormRequest
{
    public function __construct(Portal $portal, CrmObjectType $objectType) {}

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
            ->pluck('validations', 'key')
            ->mapWithKeys(fn ($validations, $key) => ["properties.$key" => $validations])
            ->toArray();

        $uniqueProperties = $uniqueObjectTypeProperties[$this->objectType->id] ?? [];

        foreach ($uniqueProperties as $property) {
            $validations["properties.$property"][] = new UniquePropertyValue($this->portal, $this->objectType->id, 'email_address');
        }

        Log::debug('validations', $validations);

        return $validations;
    }
}
