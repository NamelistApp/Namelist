<?php

namespace App\Console\Commands;

use App\Jobs\Models\ProcessEvent;
use App\Jobs\ProcessEventJob;
use App\Models\Eloquent\Portal;
use Illuminate\Console\Command;

class MakeEvents extends Command
{
    protected $signature = 'app:makeevents {portalId}';

    protected $description = 'Command description';

    public function handle()
    {
        $eventsJson = '[
    {
      "distinct_id": "$annon:2698dda2-cabe-4bd2-a3bc-f29fafaf6c37",
      "properties": {
        "$app_version": "1.0",
        "$set": {"test": "value"},
        "$os_version": "17.4",
        "$identifier": "io.paywalls.PaywallsExample",
        "$lib": "swift",
        "$lib_version": "0.1.0",
        "$app_build_number": "1",
        "$manufacturer": "Apple",
        "$device_model": "arm64",
        "$screen_height": "852",
        "$screen_width": "393",
        "$os": "iOS",
        "$form_id": "1"
      },
      "name": "$form_viewed",
      "timestamp": 1723178013,
      "uuid": "0d55659e-aba4-4937-89a6-c4621b2457ca"
    },
    {
      "distinct_id": "$annon:fe0ccd41-2104-4e43-b1bb-9e3cbf056c41",
      "properties": {
        "$app_version": "1.0",
        "$set": {"test": "value"},
        "$os_version": "17.4",
        "$identifier": "io.paywalls.PaywallsExample",
        "$lib": "swift",
        "$lib_version": "0.1.0",
        "$app_build_number": "1",
        "$manufacturer": "Apple",
        "$device_model": "arm64",
        "$screen_height": "852",
        "$screen_width": "393",
        "$os": "iOS"
      },
      "name": "Test Event",
      "timestamp": 1723178013,
      "uuid": "235254C8-A136-45D2-8E8B-41E9B4809B41"
    },
    {
      "uuid": "DC3271B4-C2DA-44D6-88E6-B8A6218D3D27",
      "timestamp": 1723178015,
      "properties": {
        "$manufacturer": "Apple",
        "$set": {},
        "$device_model": "arm64",
        "$app_version": "1.0",
        "$identifier": "io.paywalls.PaywallsExample",
        "$os": "iOS",
        "$unset": [],
        "$screen_height": "852",
        "$set_once": {},
        "$lib": "swift",
        "$os_version": "17.4",
        "$screen_width": "393",
        "$app_build_number": "1",
        "$lib_version": "0.1.0",
        "$anon_distinct_id": "$annon:fe0ccd41-2104-4e43-b1bb-9e3cbf056c41"
      },
      "distinct_id": "McTester",
      "name": "$identify"
    },
    {
      "uuid": "b1e1f163-bd4b-4ddf-a18d-9b32fcc22b91",
      "timestamp": 1723178015,
      "properties": {
        "$manufacturer": "Apple",
        "$set": {},
        "test-event-property": "test",
        "$device_model": "arm64",
        "$app_version": "1.0",
        "$identifier": "io.paywalls.PaywallsExample",
        "$os": "iOS",
        "$unset": [],
        "$screen_height": "852",
        "$set_once": {},
        "$lib": "swift",
        "$os_version": "17.4",
        "$screen_width": "393",
        "$app_build_number": "1",
        "$lib_version": "0.1.0"
      },
      "distinct_id": "McTester",
      "name": "test_event"
    }
  ]';

        $events = json_decode($eventsJson, true);
        $portal = Portal::find($this->argument('portalId'));
        foreach ($events as $event) {
            ProcessEventJob::dispatch($portal, new ProcessEvent($event));
        }
    }
}
