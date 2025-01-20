<?php

namespace App\Models\Eloquent;

use App\Models\Eloquent\Objects\Contact;
use App\Models\Eloquent\Objects\Form;
use Database\Factories\PortalFactory;
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

    protected static function newFactory()
    {
        return PortalFactory::new();
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function crmObjects(): HasMany
    {
        return $this->hasMany(CrmObject::class);
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }

    public function forms(): HasMany
    {
        return $this->hasMany(Form::class);
    }

    public function objectProperties(): HasMany
    {
        return $this->hasMany(CrmObjectProperty::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function appUsers(): HasMany
    {
        return $this->hasMany(AppUser::class);
    }

    public function appUserDistinctIds(): HasMany
    {
        return $this->hasMany(AppUserDistinctId::class);
    }

    public function fetchAppUser(string $distinctId): ?AppUser
    {
        return $this->appUserDistinctIds()->where('distinct_id', $distinctId)->first()?->appUser;
    }
}
