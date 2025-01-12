<?php

namespace App\Data\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\HasMany;

class Organization extends Model
{
    use HasFactory;

    protected $table = 'Organization';

    const CREATED_AT = 'createdAt';

    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'name',
    ];

    protected $with = [
        'teams',
    ];

    public function teams(): HasMany
    {
        return $this->hasMany(Team::class);
    }
}
