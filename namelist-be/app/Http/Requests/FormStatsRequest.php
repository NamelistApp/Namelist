<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormStatsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'startDate' => 'required|date',
            'endDate' => 'required|date',
        ];
    }
}
