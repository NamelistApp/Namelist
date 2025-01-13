<?php

namespace App\Models\Eloquent;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CrmObjectProperty extends Model
{
    public function crmObject(): BelongsTo
    {
        return $this->belongsTo(CrmObject::class);
    }
}
