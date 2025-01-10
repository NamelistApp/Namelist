<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsTo;
use MongoDB\Laravel\Relations\HasMany;

class CrmObject extends Model
{
    protected $table = 'Contact';

    const CREATED_AT = 'createdAt';

    const UPDATED_AT = 'updatedAt';

    // include properties
    protected $with = [
        'properties',
    ];

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function objectType(): BelongsTo
    {
        return $this->belongsTo(ObjectType::class);
    }

    public function properties(): HasMany
    {
        return $this->hasMany(ObjectProperty::class);
    }
}
