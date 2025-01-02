<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ObjectProperties extends Model
{
    protected $casts = [
        'value' => 'json',
    ];

    public function crmObject(): BelongsTo
    {
        return $this->belongsTo(CrmObject::class);
    }
}
