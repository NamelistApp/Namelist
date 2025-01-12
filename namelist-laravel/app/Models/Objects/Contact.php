<?php

namespace App\Models\Objects;

use App\Models\CRMObject;
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
