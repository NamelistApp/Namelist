<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ObjectProperties extends Model
{
    protected $casts = [
        'value' => 'json',
    ];

    public function object(): BelongsTo
    {
        return $this->belongsTo(BaseObject::class);
    }
}
