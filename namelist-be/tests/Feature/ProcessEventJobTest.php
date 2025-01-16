<?php

namespace Tests\Feature;

use App\Jobs\Models\ProcessEvent;
use App\Jobs\ProcessEventJob;
use App\Models\Eloquent\AppUser;
use App\Models\Eloquent\Event;
use App\Models\Eloquent\Portal;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProcessEventJobTest extends TestCase
{
    use RefreshDatabase;

    private const BASE_EVENT_JSON = <<<'EOF'
{
  "events": [
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
  ]
}
EOF;

    public function test_ingest_events(): void
    {
        // Given
        $portal = Portal::factory()->create();
        $eventData = json_decode(self::BASE_EVENT_JSON, true);

        // When
        collect($eventData['events'])->each(function ($event) use ($portal) {
            $job = new ProcessEventJob($portal, new ProcessEvent($event));
            $job->handle();
        });

        // Then
        // Assert correct app user
        $this->assertDatabaseCount('app_users', 1);
        $this->assertDatabaseCount('app_user_distinct_id', 2);

        // distinct ids
        $this->assertDatabaseHas('app_user_distinct_id', ['distinct_id' => '$annon:fe0ccd41-2104-4e43-b1bb-9e3cbf056c41']);
        $this->assertDatabaseHas('app_user_distinct_id', ['distinct_id' => 'McTester']);

        // app user properties
        $appUser = AppUser::first();
        $this->assertEquals($appUser->properties['test'], 'value');
        $this->assertEquals($appUser->is_identified, true);

        // events
        $this->assertDatabaseCount('events', 3);
        $event = Event::orderBy('id', 'desc')->first(); // get last event
        $this->assertEquals($event->timestamp, '2024-08-09 04:33:35');
        $this->assertEquals($event->name, 'test_event');
        $this->assertEquals($event->distinct_id, 'McTester');
        $this->assertEquals($event->properties['test-event-property'], 'test');
        $this->assertDatabaseHas('events', ['uuid' => 'b1e1f163-bd4b-4ddf-a18d-9b32fcc22b91']);
        $this->assertDatabaseHas('events', ['uuid' => 'DC3271B4-C2DA-44D6-88E6-B8A6218D3D27']);
        $this->assertDatabaseHas('events', ['uuid' => '235254C8-A136-45D2-8E8B-41E9B4809B41']);
    }
}
