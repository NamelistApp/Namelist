<?php

namespace App\Models\Eloquent;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CrmObject extends Model
{
    protected $fillable = [
        'name',
        'properties',
    ];

    protected $casts = [
        'properties' => 'array',
    ];

    public function portal(): BelongsTo
    {
        return $this->belongsTo(Portal::class);
    }

    public function objectType(): BelongsTo
    {
        return $this->belongsTo(CrmObjectType::class);
    }
}
