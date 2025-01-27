<?php

namespace Database\Seeders;

use App\Models\Eloquent\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DevSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'email' => 'davidmoreen@namelist.dev',
            'first_name' => 'David',
            'password' => Hash::make('password'),
            'is_staff' => true,
        ]);

        $user->refresh();
        echo 'Portal API Token: '.$user->currentPortal->createToken('Portal API Token')->plainTextToken."\n";
    }
}
