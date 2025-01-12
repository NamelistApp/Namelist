<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsTo;
use MongoDB\Laravel\Relations\HasMany;

class Team extends Model
{
    use HasFactory;

    protected $table = 'Team';

    const CREATED_AT = 'createdAt';

    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'name',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(CrmObject::class);
    }

    public function crmObjects(): HasMany
    {
        return $this->hasMany(CrmObject::class);
    }

    public function customFields()
    {
        return $this->hasMany(CustomField::class, 'team');
    }
}
