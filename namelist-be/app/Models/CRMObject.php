<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CrmObject extends Model
{
    protected $table = 'crm_objects';

    public function portal(): BelongsTo
    {
        return $this->belongsTo(Portal::class);
    }

    public function objectType(): BelongsTo
    {
        return $this->belongsTo(ObjectType::class);
    }

    public function properties(): HasMany
    {
        return $this->hasMany(ObjectProperties::class, 'object_id');
    }
}
