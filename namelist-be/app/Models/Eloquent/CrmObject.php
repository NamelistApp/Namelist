<?php

namespace App\Models\Eloquent;

use Database\Factories\CrmObjectFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CrmObject extends Model
{
    use HasFactory;

    protected $table = 'crm_objects';

    protected $perPage = 50;

    protected $with = [
        'properties',
    ];

    protected static function newFactory()
    {
        return CrmObjectFactory::new();
    }

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
        return $this->hasMany(CrmObjectProperty::class, 'crm_object_id', 'id');
    }
}
