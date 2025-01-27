<?php

namespace Database\Factories;

use App\Models\Eloquent\Organization;
use App\Models\Eloquent\Portal;
use Illuminate\Database\Eloquent\Factories\Factory;

class PortalFactory extends Factory
{
    protected $model = Portal::class;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'organization_id' => Organization::factory(),
        ];
    }
}
