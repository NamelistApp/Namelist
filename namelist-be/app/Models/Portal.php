<?php

namespace App\Models;

use App\Models\Enum\ObjectTypeId;
use App\Models\Objects\Contact;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Portal extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function objects(): HasMany
    {
        return $this->hasMany(BaseObject::class);
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class)->where('object_type_id', ObjectTypeId::Contact);
    }
}
