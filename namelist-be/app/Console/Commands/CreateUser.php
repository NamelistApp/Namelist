<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateUser extends Command
{
    protected $signature = 'app:create-user {name} {email} {password}';

    protected $description = 'Create a new user';

    public function handle()
    {
        $name = $this->argument('name');
        $email = $this->argument('email');
        $password = $this->argument('password');

        $user = User::create([
            'name' => $name,
            'emailAddress' => $email,
            'password' => Hash::make($password),
        ]);

        $this->info("User {$user->name} created successfully.");

        return Command::SUCCESS;
    }
}
