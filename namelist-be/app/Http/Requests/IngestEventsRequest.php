<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IngestEventsRequest extends FormRequest
{
    public function authorize(): bool
    {
        // TODO maybe we can check for domains here if ever we have a domain whitelist
        return true;
    }

    public function rules(): array
    {
        return [
            'events' => 'required|array',
            'events.*.distinct_id' => 'required|string|max:255',
            'events.*.name' => 'required|string|max:255',
            'events.*.properties' => 'required|array',
            'events.*.timestamp' => 'required|integer',
            'events.*.uuid' => 'required|uuid',
        ];
    }
}
