<?php

namespace App\Models\Eloquent;

use App\Actions\Crm\CrmObjectAction;
use Database\Factories\CrmObjectFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CrmObject extends Model
{
    use HasFactory;

    protected $table = 'crm_objects';

    protected $perPage = 50;

    protected $casts = [
        'properties' => 'array',
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

    public static function firstOrCreateWithProperty(string $propertyKey, string $propertyValue, array $properties, Portal $portal, string $objectTypeId)
    {
        $record = $portal->crmObjects()
            ->where('crm_object_type_id', $objectTypeId)
            ->whereRaw(
                'properties->>? = ?',
                [$propertyKey, $propertyValue]
            )
            ->first();

        if ($record) {
            return $record;
        }

        return CrmObjectAction::create($portal, CrmObjectType::find($objectTypeId), [
            'properties' => $properties,
        ]);
    }
}
