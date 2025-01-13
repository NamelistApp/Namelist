<?php

namespace App\Models\Eloquent;

use Illuminate\Database\Eloquent\Model;

class CrmObjectType extends Model
{
    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'name',
    ];

    public function propertyDefinitions()
    {
        return $this->hasMany(CrmPropertyDefinition::class);
    }
}
