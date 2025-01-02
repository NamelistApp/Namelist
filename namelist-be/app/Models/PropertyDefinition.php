<?php

namespace App\Models;

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
}
