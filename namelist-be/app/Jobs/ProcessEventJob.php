<?php

namespace App\Jobs;

use App\Jobs\Models\ProcessEvent;
use App\Models\Eloquent\Portal;
use App\Services\ProcessAppUserService;
use App\Services\ProcessEventService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ProcessEventJob implements ShouldQueue
{
    use Queueable;

    protected ProcessAppUserService $appUserService;

    protected ProcessEventService $eventService;

    public function __construct(
        protected Portal $portal,
        protected ProcessEvent $event
    ) {
        $this->appUserService = new ProcessAppUserService(
            $this->portal,
            $this->event
        );
        $this->eventService = new ProcessEventService(
            $this->portal,
            $this->event
        );
    }

    public function handle(): void
    {
        $this->appUserService->run();
        $this->eventService->run();
    }
}
