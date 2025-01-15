<?php

namespace App\Models\Eloquent;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $casts = [
        'properties' => 'array',
        'timestamp' => 'datetime',
    ];

    protected $fillable = [
        'uuid',
        'distinct_id',
        'name',
        'properties',
        'timestamp',
    ];
}
