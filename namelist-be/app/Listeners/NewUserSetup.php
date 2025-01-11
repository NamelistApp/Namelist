<?php

namespace App\Listeners;

use App\Events\UserCreated;

class NewUserSetup
{
    // create a new org for every new user for now
    // this will need to be changed when we allow users
    // to invite other users to their orgs
    public function handle(UserCreated $event): void
    {
        $user = $event->user;
        $org = $user->organizations()->create([
            'name' => $user->name,
        ]);

        $team = $org->teams()->create([
            'name' => 'Default team',
        ]);

        $user->refresh();
        $user->setCurrentTeam($team);
    }
}
