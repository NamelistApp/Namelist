<?php

namespace App\Models\Enum;

enum EngagementType: string
{
    case Call = 'call';
    case Email = 'email';
    case Meeting = 'meeting';
}
