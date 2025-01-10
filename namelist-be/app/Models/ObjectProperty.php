<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsTo;

class ObjectProperty extends Model
{
    protected $table = 'ObjectProperty';

    const CREATED_AT = 'createdAt';

    const UPDATED_AT = 'updatedAt';

    public function crmObject(): BelongsTo
    {
        return $this->belongsTo(CrmObject::class);
    }
}
