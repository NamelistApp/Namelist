<?php

namespace App\Rules;

use App\Models\Eloquent\Portal;
use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Log;

class UniquePropertyValue implements DataAwareRule, ValidationRule
{
    protected $data = [];

    protected $portal;

    protected $objectTypeId;

    protected $propertyKey;

    public function __construct(Portal $portal, string $objectTypeId, string $propertyKey)
    {
        $this->portal = $portal;
        $this->objectTypeId = $objectTypeId;
        $this->propertyKey = $propertyKey;
    }

    public function setData(array $data): static
    {
        $this->data = $data;

        return $this;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        Log::debug('UniquePropertyValue', [
            'crm_object_type_id' => $this->objectTypeId,
            'name' => $this->propertyKey,
            'value' => $value,
        ]);

        $sql = <<<'EOF'
lower(trim('"' FROM value::text)) = lower(?)
EOF;

        $exists = $this->portal->crmObjects()
            ->where('crm_object_type_id', $this->objectTypeId)
            ->whereRaw(
                'properties->>? = ?',
                [$this->propertyKey, $value]
            )
            ->exists();

        if ($exists) {
            $fail('The :attribute must be unique');
        }
    }
}
