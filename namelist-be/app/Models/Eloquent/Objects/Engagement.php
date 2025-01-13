<?php

namespace App\Models\Eloquent\Objects;

use App\Models\Eloquent\CrmObject;
use App\Models\Enum\ObjectTypeId;
use Illuminate\Database\Eloquent\Builder;

class Engagement extends CrmObject
{
    protected static function booted(): void
    {
        static::addGlobalScope('object_type', function (Builder $builder) {
            $builder->where('crm_object_type_id', ObjectTypeId::Engagement);
        });

        static::creating(function ($contact) {
            $contact->crm_object_type_id = ObjectTypeId::Engagement;
        });
    }
}
