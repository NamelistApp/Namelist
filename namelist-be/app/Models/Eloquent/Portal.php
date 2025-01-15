<?php

namespace App\Models\Eloquent;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;

class Portal extends Model implements AuthenticatableContract
{
    use Authenticatable, HasApiTokens, HasFactory;

    protected $fillable = [
        'name',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function crmObjects(): HasMany
    {
        return $this->hasMany(CrmObject::class);
    }

    public function objectProperties(): HasMany
    {
        return $this->hasMany(CrmObjectProperty::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }
}
