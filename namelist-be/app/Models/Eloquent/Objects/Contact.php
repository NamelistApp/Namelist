<?php

namespace App\Models\Eloquent\Objects;

use App\Models\Eloquent\CRMObject;
use App\Models\Enum\ObjectTypeId;
use Illuminate\Database\Eloquent\Builder;

class Contact extends CRMObject
{
    protected static function booted(): void
    {
        static::addGlobalScope('object_type', function (Builder $builder) {
            $builder->where('object_type_id', ObjectTypeId::Contact);
        });

        static::creating(function ($contact) {
            $contact->object_type_id = ObjectTypeId::Contact;
        });
    }
}
