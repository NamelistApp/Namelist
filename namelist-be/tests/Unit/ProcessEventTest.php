<?php

namespace Tests\Unit;

use App\Jobs\Models\ProcessEvent;
use PHPUnit\Framework\TestCase;

class ProcessEventTest extends TestCase
{
    public function test_no_set_set_once_data(): void
    {
        // Given
        $eventJson = '{
            "distinct_id": "$annon:88692c2e-24db-42c6-822b-9fa19ee77702",
            "timestamp": 1724984876,
            "name": "Test Event",
            "uuid": "97970755-8DFB-495C-B5D9-35CE3DCC60A8",
            "properties": {
                "$screen_width": "393",
                "$network_cellular": false,
                "$device_model": "arm64",
                "$os": "iOS",
                "$screen_height": "852",
                "$locale": "en",
                "$app_name": "PaywallsExample",
                "$app_namespace": "io.paywalls.PaywallsExample",
                "$lib": "swift",
                "$device_type": "Mobile",
                "$os_version": "17.4",
                "$ip": "192.168.0.12",
                "$manufacturer": "Apple",
                "$app_build_number": "1",
                "$device_name": "iPhone",
                "$session_id": "946DED96-3B67-45CE-AD19-FFFD9FA1AB22",
                "$network_wifi": true,
                "test": "value",
                "$app_version": "1.0",
                "$lib_version": "0.1.0"
            }
        }';
        $event = json_decode($eventJson, true);
        $expectedEvent = [
            'distinct_id' => '$annon:88692c2e-24db-42c6-822b-9fa19ee77702',
            'name' => 'Test Event',
            'properties' => [
                '$screen_width' => '393',
                '$network_cellular' => false,
                '$device_model' => 'arm64',
                '$os' => 'iOS',
                '$screen_height' => '852',
                '$locale' => 'en',
                '$app_name' => 'PaywallsExample',
                '$app_namespace' => 'io.paywalls.PaywallsExample',
                '$lib' => 'swift',
                '$device_type' => 'Mobile',
                '$os_version' => '17.4',
                '$ip' => '192.168.0.12',
                '$manufacturer' => 'Apple',
                '$app_build_number' => '1',
                '$device_name' => 'iPhone',
                '$session_id' => '946DED96-3B67-45CE-AD19-FFFD9FA1AB22',
                '$network_wifi' => true,
                'test' => 'value',
                '$app_version' => '1.0',
                '$lib_version' => '0.1.0',
                '$set' => [
                    '$device_model' => 'arm64',
                    '$os' => 'iOS',
                    '$app_name' => 'PaywallsExample',
                    '$app_namespace' => 'io.paywalls.PaywallsExample',
                    '$device_type' => 'Mobile',
                    '$os_version' => '17.4',
                    '$app_build_number' => '1',
                    '$app_version' => '1.0',
                    '$lib_version' => '0.1.0',
                ],
                '$set_once' => [
                    '$initial_device_model' => 'arm64',
                    '$initial_os' => 'iOS',
                    '$initial_app_name' => 'PaywallsExample',
                    '$initial_app_namespace' => 'io.paywalls.PaywallsExample',
                    '$initial_device_type' => 'Mobile',
                    '$initial_os_version' => '17.4',
                    '$initial_app_build_number' => '1',
                    '$initial_app_version' => '1.0',
                    '$initial_lib_version' => '0.1.0',
                ],
            ],
            'timestamp' => 1724984876,
            'uuid' => '97970755-8DFB-495C-B5D9-35CE3DCC60A8',
        ];

        // When
        $processEvent = new ProcessEvent($event);

        // Then
        $this->assertEquals($processEvent->toArray(), $expectedEvent);
    }

    public function test_has_set_set_once_data(): void
    {
        // Given
        $eventJson = '{
            "distinct_id": "$annon:88692c2e-24db-42c6-822b-9fa19ee77702",
            "timestamp": 1724984876,
            "name": "Test Event",
            "uuid": "97970755-8DFB-495C-B5D9-35CE3DCC60A8",
            "properties": {
                "$screen_width": "393",
                "$network_cellular": false,
                "$device_model": "arm64",
                "$os": "iOS",
                "$screen_height": "852",
                "$locale": "en",
                "$app_name": "PaywallsExample",
                "$app_namespace": "io.paywalls.PaywallsExample",
                "$lib": "swift",
                "$device_type": "Mobile",
                "$os_version": "17.4",
                "$ip": "192.168.0.12",
                "$set": {
                    "testProp": "Test Value"
                },
                "$set_once": {
                    "gender": "male"
                },
                "$manufacturer": "Apple",
                "$app_build_number": "1",
                "$device_name": "iPhone",
                "$session_id": "946DED96-3B67-45CE-AD19-FFFD9FA1AB22",
                "$network_wifi": true,
                "test": "value",
                "$app_version": "1.0",
                "$lib_version": "0.1.0"
            }
        }';
        $event = json_decode($eventJson, true);
        $expectedEvent = [
            'distinct_id' => '$annon:88692c2e-24db-42c6-822b-9fa19ee77702',
            'name' => 'Test Event',
            'properties' => [
                '$screen_width' => '393',
                '$network_cellular' => false,
                '$device_model' => 'arm64',
                '$os' => 'iOS',
                '$screen_height' => '852',
                '$locale' => 'en',
                '$app_name' => 'PaywallsExample',
                '$app_namespace' => 'io.paywalls.PaywallsExample',
                '$lib' => 'swift',
                '$device_type' => 'Mobile',
                '$os_version' => '17.4',
                '$ip' => '192.168.0.12',
                '$manufacturer' => 'Apple',
                '$app_build_number' => '1',
                '$device_name' => 'iPhone',
                '$session_id' => '946DED96-3B67-45CE-AD19-FFFD9FA1AB22',
                '$network_wifi' => true,
                'test' => 'value',
                '$app_version' => '1.0',
                '$lib_version' => '0.1.0',
                '$set' => [
                    'testProp' => 'Test Value',
                    '$device_model' => 'arm64',
                    '$os' => 'iOS',
                    '$app_name' => 'PaywallsExample',
                    '$app_namespace' => 'io.paywalls.PaywallsExample',
                    '$device_type' => 'Mobile',
                    '$os_version' => '17.4',
                    '$app_build_number' => '1',
                    '$app_version' => '1.0',
                    '$lib_version' => '0.1.0',
                ],
                '$set_once' => [
                    'gender' => 'male',
                    '$initial_device_model' => 'arm64',
                    '$initial_os' => 'iOS',
                    '$initial_app_name' => 'PaywallsExample',
                    '$initial_app_namespace' => 'io.paywalls.PaywallsExample',
                    '$initial_device_type' => 'Mobile',
                    '$initial_os_version' => '17.4',
                    '$initial_app_build_number' => '1',
                    '$initial_app_version' => '1.0',
                    '$initial_lib_version' => '0.1.0',
                ],
            ],
            'timestamp' => 1724984876,
            'uuid' => '97970755-8DFB-495C-B5D9-35CE3DCC60A8',
        ];

        // When
        $processEvent = new ProcessEvent($event);

        // Then
        $this->assertEquals($processEvent->toArray(), $expectedEvent);
    }
}
