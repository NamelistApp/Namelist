<?php

namespace App\Models\Eloquent;

use App\Actions\Crm\CrmObjectAction;
use Database\Factories\CrmObjectFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

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

    public static function firstOrCreateWithProperty(string $propertyKey, string $propertyValue, Portal $portal, string $objectTypeId)
    {
        $objectId = DB::select(<<<'SQL'
select c.id from crm_objects c
left join crm_object_properties op on op.crm_object_id = c.id
where op.key = ? and op.value::jsonb = to_jsonb(?::text)
and c.portal_id = ? and c.crm_object_type_id = ?
limit 1
SQL, [$propertyKey, $propertyValue, $portal->id, $objectTypeId]);

        if ($objectId[0]?->id ?? null) {
            return self::find($objectId);
        }

        return CrmObjectAction::create($portal, CrmObjectType::find($objectTypeId), [
            'properties' => [
                $propertyKey => $propertyValue,
            ],
        ]);
    }
}
