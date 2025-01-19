<?php

namespace App\Listeners;

use App\Events\EventCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class CreateFormSubmission implements ShouldQueue
{
    public function __construct() {}

    public function handle(EventCreated $event): void
    {
        Log::debug('CreateFormSubmissions');
    }
}
