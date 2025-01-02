<?php

namespace App\Models;

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

    public static function for(ObjectType $objectType, array $propertyNames): Builder
    {
        return PropertyDefinition::where('object_type_id', $objectType->id)->whereIn('name', $propertyNames);
    }
}
