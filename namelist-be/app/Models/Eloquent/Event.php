<?php

namespace App\Models\Eloquent;

use App\Events\EventCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    use HasFactory;

    protected $casts = [
        'properties' => 'array',
        'timestamp' => 'datetime',
    ];

    protected $dispatchesEvents = [
        'created' => EventCreated::class,
    ];

    protected $fillable = [
        'uuid',
        'distinct_id',
        'name',
        'properties',
        'timestamp',
    ];

    public function portal(): BelongsTo
    {
        return $this->belongsTo(Portal::class);
    }
}
