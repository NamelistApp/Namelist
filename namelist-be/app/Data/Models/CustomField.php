<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class CustomField extends Model
{
    protected $table = 'CustomField';

    const CREATED_AT = 'createdAt';

    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'title',
        'desc',
        'fieldType',
        'objectType',
        'validations',
    ];
}
