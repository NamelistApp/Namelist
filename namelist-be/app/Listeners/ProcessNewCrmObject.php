<?php

namespace App\Listeners;

use App\Events\CrmObjectCreated;

class ProcessNewCrmObject
{
    public function __construct()
    {
        //
    }

    public function handle(CrmObjectCreated $event): void {}
}
