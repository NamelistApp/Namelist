<?php

namespace Database\Seeders;

use App\Data\Models\User;
use Illuminate\Database\Seeder;

class DevSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'emailAddress' => 'david@namelist.app',
            'name' => 'David',
            'password' => 'password',
        ]);
    }
}
