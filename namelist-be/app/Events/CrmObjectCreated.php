<?php

namespace App\Events;

use App\Models\Eloquent\CrmObject;

class CrmObjectCreated
{
    public CrmObject $crmObject;

    public function __construct(CrmObject $crmObject)
    {
        $this->crmObject = $crmObject;
    }
}
