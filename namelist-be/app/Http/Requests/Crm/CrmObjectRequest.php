<?php

namespace App\Http\Requests\Crm;

use GuzzleHttp\Psr7\Request;
use Illuminate\Foundation\Http\FormRequest;

class CrmObjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(Request $request): array
    {
        dd('hello world');

        // TODO check for unique email addresses
        return [
            'email_address' => ['required_without:first_name', 'nullable', 'email'],
            'first_name' => ['required_without:email_address', 'nullable', 'string', 'max:255'],
            'last_name' => ['nullable', 'string', 'max:255'],
            'phone_number' => ['nullable', 'string', 'max:20'],
        ];
    }
}
