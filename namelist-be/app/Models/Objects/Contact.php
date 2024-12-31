<?php

namespace App\Models\Objects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Contact extends Model
{
    public function objectType(): MorphTo
    {
        return $this->morphTo();
    }
}
