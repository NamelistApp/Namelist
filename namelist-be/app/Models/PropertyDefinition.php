<?php

namespace App\Models;

use App\Models\Enum\ObjectTypeId;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class PropertyDefinition extends Model
{
    protected $fillable = [
        'name',
        'type',
    ];

    protected $casts = [
        'metadata' => 'array',
    ];

    public static function for(ObjectTypeId $objectTypeId, array $propertyNames): Builder
    {
        return PropertyDefinition::where('object_type_id', $objectTypeId->value)->whereIn('name', $propertyNames);
    }
}
