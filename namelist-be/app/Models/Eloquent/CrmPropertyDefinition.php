<?php

namespace App\Models\Eloquent;

use Illuminate\Database\Eloquent\Model;

class CrmPropertyDefinition extends Model
{
    protected $fillable = [
        'key',
        'type',
        'validations',
    ];

    protected $casts = [
        'validations' => 'array',
    ];

    public function getNameAttribute(): string
    {
        return ucfirst(str_replace('_', ' ', $this->key));
    }
}
