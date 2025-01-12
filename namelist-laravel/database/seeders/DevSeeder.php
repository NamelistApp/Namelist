<?php

namespace Database\Seeders;

use App\Models\User;
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
            'name' => 'David',
            'password' => 'password',
            'is_staff' => true,
        ]);
    }
}
