<?php

namespace App\Events;

use App\Data\Models\User;

class UserCreated
{
    public User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
