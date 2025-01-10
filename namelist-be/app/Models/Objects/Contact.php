<?php

namespace App\Models\Objects;

use App\Models\CRMObject;
use App\Models\Enum\ObjectTypeId;
use Illuminate\Database\Eloquent\Builder;

class Contact extends CRMObject
{
    protected static function booted(): void
    {
        static::addGlobalScope('objectType', function (Builder $builder) {
            $builder->where('objectType', ObjectTypeId::Contact);
        });

        static::creating(function ($contact) {
            $contact->object_type_id = ObjectTypeId::Contact;
        });
    }
}
