<?php

namespace App\Http\Controllers;

use App\Http\Requests\IngestEventsRequest;
use App\Jobs\Models\ProcessEvent;
use App\Jobs\ProcessEventJob;
use Illuminate\Support\Facades\Auth;

class IngestController extends Controller
{
    public function __invoke(IngestEventsRequest $request)
    {
        foreach ($request->safe()->events as $event) {
            ProcessEventJob::dispatch(Auth::guard('portal')->user(), new ProcessEvent($event));
        }
    }
}
