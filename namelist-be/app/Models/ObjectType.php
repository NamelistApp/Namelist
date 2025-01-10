<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class ObjectType extends Model
{
    protected $table = 'ObjectType';

    const CREATED_AT = 'createdAt';

    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'name',
    ];

    public function customFields()
    {
        return $this->hasMany(CustomField::class, 'objectType');
    }
}
