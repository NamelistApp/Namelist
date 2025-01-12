<?php

namespace App\Data\Models;

use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsTo;

class CustomFieldEntry extends Model
{
    protected $table = 'CustomFieldEntry';

    const CREATED_AT = 'createdAt';

    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'fieldValue',
    ];

    public function crmObject(): BelongsTo
    {
        return $this->belongsTo(CrmObject::class, 'contact');
    }

    public function customField(): BelongsTo
    {
        return $this->belongsTo(CustomField::class, 'field');
    }
}
