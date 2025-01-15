<?php

namespace App\Services;

use App\Jobs\Models\ProcessEvent;
use App\Models\Eloquent\Portal;

class ProcessEventService
{
    public function __construct(
        protected Portal $portal,
        protected ProcessEvent $event
    ) {}

    public function run(): void
    {
        $this->portal->events()->create($this->event->toArray());
    }
}
