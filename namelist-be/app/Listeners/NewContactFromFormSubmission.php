<?php

namespace App\Listeners;

use App\Actions\Crm\CrmObjectAction;
use App\Events\EventCreated;
use App\Models\Eloquent\CrmObject;
use App\Models\Eloquent\CrmObjectAssociation;
use App\Models\Eloquent\CrmObjectType;
use App\Models\Enum\CrmObjectSource;
use App\Models\Enum\EventName;
use App\Models\Enum\EventProperty;
use App\Models\Enum\ObjectTypeId;
use App\Models\Enum\PropertyName;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class NewContactFromFormSubmission implements ShouldQueue
{
    public function __construct() {}

    public function handle(EventCreated $event): void
    {
        $event = $event->event;

        if ($event->name != EventName::formSubmitted) {
            return;
        }

        $formIdKey = 'properties.'.EventProperty::formId;
        $emailKey = 'properties.'.EventProperty::fields.'.email_address';
        $validator = Validator::make($event->toArray(), [
            $formIdKey => 'integer',
            $emailKey => 'email',
        ]);

        if ($validator->fails()) {
            Log::debug('NewContactFromFormSubmission validation failed', [
                'event' => $event,
                'errors' => $validator->errors()->all(),
            ]);

            return;
        }

        $emailAddress = $validator->safe()[$emailKey];
        $formId = $validator->safe()[$formIdKey];
        $fields = $validator->safe()[EventProperty::fields];

        $contact = CrmObject::firstOrCreateWithProperty(
            'email_address',
            $emailAddress,
            [
                PropertyName::emailAddress => $emailAddress,
                PropertyName::initialFormId => $formId,
                PropertyName::source => CrmObjectSource::formSubmission,
            ],
            $event->portal,
            ObjectTypeId::Contact
        );

        $submission = CrmObjectAction::create(
            $event->portal,
            CrmObjectType::find(ObjectTypeId::FormSubmission),
            [
                'fields' => $fields,
            ]
        );

        CrmObjectAssociation::forceCreate([
            'crm_object_id' => $contact->id,
            'crm_object_type_id' => ObjectTypeId::Contact,
            'associated_crm_object_id' => $submission->id,
            'associated_crm_object_type_id' => ObjectTypeId::FormSubmission,
        ]);
    }
}
