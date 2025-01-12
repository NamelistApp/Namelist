<?php

namespace App\Data\Models;

use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsTo;
use MongoDB\Laravel\Relations\EmbedsMany;

class CrmObject extends Model
{
    protected $table = 'Contact';

    const CREATED_AT = 'createdAt';

    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'team',
        'objectType',
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

    public function properties(): EmbedsMany
    {
        return $this->embedsMany(CustomFieldEntry::class);
    }
}
