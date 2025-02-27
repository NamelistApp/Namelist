<?php

namespace App\Http\Requests\Crm;

use App\Models\Eloquent\CrmObjectType;
use App\Models\Eloquent\Portal;
use App\Models\Enum\ObjectTypeId;
use App\Rules\UniquePropertyValue;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;

class CrmObjectCreateRequest extends FormRequest
{
    public function __construct(Portal $portal, CrmObjectType $objectType, Request $request) {}

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
            ObjectTypeId::Contact => ['email_address'],
        ];

        $validations = $this->objectType->propertyDefinitions
            ->pluck('validations', 'key')
            ->mapWithKeys(fn ($validations, $key) => ["properties.$key" => $validations])
            ->toArray();

        $uniqueProperties = $uniqueObjectTypeProperties[$this->objectType->id] ?? [];

        foreach ($uniqueProperties as $property) {
            $validations["properties.$property"][] = new UniquePropertyValue($this->portal, $this->objectType->id, 'email_address');
        }

        Log::debug('request', $this->request->all());
        Log::debug('validations', $validations);

        return $validations;
    }
}
