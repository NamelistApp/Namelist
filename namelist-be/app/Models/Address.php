<?php

namespace App\Models;

class Address
{
    public function __construct(
        public string $street1,
        public string $street2,
        public string $city,
        public string $state,
        public string $zip,
        public string $country
    ) {}
}
