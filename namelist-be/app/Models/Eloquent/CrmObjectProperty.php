<?php

namespace App\Models\Eloquent;

use Database\Factories\CrmPropertyFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CrmObjectProperty extends Model
{
    use HasFactory;

    protected $casts = [
        'value' => 'array',
    ];

    protected static function newFactory()
    {
        return CrmPropertyFactory::new();
    }

    public function crmObject(): BelongsTo
    {
        return $this->belongsTo(CrmObject::class);
    }
}
