<?php

namespace App\Http\Requests\Contacts;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // TODO check for unique email addresses
        return [
            'email_address' => ['required_without:first_name', 'string', 'email', 'max:255'],
            'first_name' => ['required_without:email_address', 'string', 'max:255'],
            'last_name' => ['string', 'max:255'],
            'phone_number' => ['string', 'max:20'],
        ];
    }
}
