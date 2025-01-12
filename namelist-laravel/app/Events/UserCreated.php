<?php

namespace App\Events;

use App\Models\User;

class UserCreated
{
    public User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
