<?php

namespace App\Models\Eloquent\Objects;

use App\Models\Eloquent\CrmObject;
use App\Models\Eloquent\Event;
use App\Models\Enum\EventName;
use App\Models\Enum\ObjectTypeId;
use Database\Factories\FormFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Form extends CrmObject
{
    use HasFactory;

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

    protected static function newFactory()
    {
        return FormFactory::new();
    }

    public function getViewCountAttribute()
    {
        return Event::where('name', EventName::formViewed)
            ->whereRaw("properties->>'".EventName::formId."' = ?", [$this->id])
            ->count();
    }

    public function getSubmissionCountAttribute()
    {
        return Event::where('name', EventName::formSubmitted)
            ->whereRaw("properties->>'".EventName::formId."' = ?", [$this->id])
            ->count();
    }
}
