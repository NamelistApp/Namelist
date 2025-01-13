<?php

namespace Database\Seeders;

use App\Models\Eloquent\User;
use Illuminate\Database\Seeder;

class DevSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'email' => 'david@namelist.app',
            'first_name' => 'David',
            'password' => 'password',
            'is_staff' => true,
        ]);
    }
}
