<?php

namespace App\Listeners;

use App\Events\EventCreated;
use App\Models\Eloquent\CrmObject;
use App\Models\Enum\EventName;
use App\Models\Enum\EventProperty;
use App\Models\Enum\ObjectTypeId;
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

        $contact = CrmObject::firstOrCreateWithProperty(
            'email_address',
            $emailAddress,
            $event->portal,
            ObjectTypeId::Contact->value
        );

        // TODO: create submission object
    }
}
