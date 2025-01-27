<?php

namespace App\Models\Eloquent;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class AppUser extends Model
{
    use HasFactory;

    protected $casts = [
        'properties' => 'array',
    ];

    public function distinctIds(): HasMany
    {
        return $this->hasMany(AppUserDistinctId::class);
    }

    public function events(): HasManyThrough
    {
        return $this->hasManyThrough(Event::class, AppUserDistinctId::class, 'app_user_id', 'distinct_id', 'id', 'distinct_id');
    }
}
