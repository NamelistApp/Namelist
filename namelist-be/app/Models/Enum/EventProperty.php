<?php

namespace App\Models\Enum;

class EventProperty
{
    public const set = '$set';

    public const setOnce = '$set_once';

    public const unset = '$unset';

    public const alias = 'alias';

    public const anonDistinctId = '$anon_distinct_id';

    public const creatorEventUuid = '$creator_event_uuid';

    public const formId = '$form_id';

    public const fields = '$fields';
}
