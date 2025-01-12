<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ObjectType extends Model
{
    protected $fillable = [
        'name',
    ];

    public function propertyDefinitions()
    {
        return $this->hasMany(PropertyDefinition::class);
    }
}
