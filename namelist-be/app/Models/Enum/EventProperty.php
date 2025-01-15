<?php

namespace App\Models\Enum;

enum EventProperty: string
{
    case set = '$set';
    case setOnce = '$set_once';
    case unset = '$unset';
    case alias = 'alias';
    case anonDistinctId = '$anon_distinct_id';
    case creatorEventUuid = '$creator_event_uuid';
}
