<?php

namespace App\Models\Eloquent;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CrmObject extends Model
{
    protected $table = 'crm_objects';

    protected $with = [
        'properties',
    ];

    public function portal(): BelongsTo
    {
        return $this->belongsTo(Portal::class);
    }

    public function objectType(): BelongsTo
    {
        return $this->belongsTo(CrmObjectType::class);
    }

    public function properties(): HasMany
    {
        return $this->hasMany(CrmObjectProperty::class);
    }
}
