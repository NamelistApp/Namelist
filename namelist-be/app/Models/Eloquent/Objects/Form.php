<?php

namespace App\Models\Eloquent\Objects;

use App\Models\Eloquent\CrmObject;
use App\Models\Eloquent\CrmObjectAssociation;
use App\Models\Enum\ObjectTypeId;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Form extends CrmObject
{
    protected static function booted(): void
    {
        static::addGlobalScope('object_type', function (Builder $builder) {
            $builder->where('crm_object_type_id', ObjectTypeId::Form);
        });

        static::creating(function ($contact) {
            $contact->crm_object_type_id = ObjectTypeId::Form;
        });
    }

    public function submissions(): HasManyThrough
    {
        return $this->hasManyThrough(CrmObject::class, CrmObjectAssociation::class, 'crm_object_id', 'associated_crm_object_id')
            ->where('crm_object_type_id', ObjectTypeId::FormSubmission);
    }
}
