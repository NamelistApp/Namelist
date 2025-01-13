<?php

namespace App\Models\Eloquent;

use Illuminate\Database\Eloquent\Model;

class CrmPropertyDefinition extends Model
{
    protected $fillable = [
        'name',
        'type',
        'validations',
    ];

    protected $casts = [
        'validations' => 'array',
    ];
}
