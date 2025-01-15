<?php

namespace App\Models\Enum;

final class EventName
{
    public const createAlias = '$create_alias';

    public const identify = '$identify';

    public const mergeDangerously = '$merge_dangerously';

    public const appOpened = '$app_opened';

    public const paywallVisit = '$paywall_visit';
}
