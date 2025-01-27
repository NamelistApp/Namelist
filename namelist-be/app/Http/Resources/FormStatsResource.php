<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FormStatsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'view_count' => $this->view_count,
            'submission_count' => $this->submission_count,
        ];
    }
}
