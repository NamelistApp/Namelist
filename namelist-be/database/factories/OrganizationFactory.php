<?php

namespace Database\Factories;

use App\Models\Eloquent\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrganizationFactory extends Factory
{
    protected $model = Organization::class;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
        ];
    }
}
