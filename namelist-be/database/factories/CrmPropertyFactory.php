<?php

namespace Database\Factories;

use App\Models\Eloquent\CrmObjectProperty;
use Illuminate\Database\Eloquent\Factories\Factory;

class CrmPropertyFactory extends Factory
{
    protected $model = CrmObjectProperty::class;

    public function definition(): array
    {
        return [
            'key' => $this->faker->word(),
            'name' => $this->faker->name(),
        ];
    }
}
