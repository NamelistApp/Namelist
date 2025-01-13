<?php

namespace App\Listeners;

use App\Events\CrmObjectCreated;

class ProcessNewCrmObject
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(CrmObjectCreated $event): void {}
}
