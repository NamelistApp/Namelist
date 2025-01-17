<?php

namespace App\Models\Eloquent\Objects;

use App\Models\Eloquent\CrmObject;
use App\Models\Eloquent\Event;
use App\Models\Enum\ObjectTypeId;
use Illuminate\Database\Eloquent\Builder;

class Form extends CrmObject
{
    protected $appends = ['view_count', 'submission_count'];

    protected static function booted(): void
    {
        static::addGlobalScope('object_type', function (Builder $builder) {
            $builder->where('crm_object_type_id', ObjectTypeId::Form);
        });

        static::creating(function ($object) {
            $object->crm_object_type_id = ObjectTypeId::Form;
        });
    }

    public function getViewCountAttribute()
    {
        return Event::where('name', '$form_viewed')
            ->whereRaw("properties->>'\$form_id' = ?", [$this->id])
            ->count();
    }

    public function getSubmissionCountAttribute()
    {
        return Event::where('name', '$form_submitted')
            ->whereRaw("properties->>'\$form_id' = ?", [$this->id])
            ->count();
    }
}
