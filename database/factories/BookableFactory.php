<?php

namespace Database\Factories;

use App\Models\Bookable;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bookable>
 */
class BookableFactory extends Factory
{

    protected $model = Bookable::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $suffix = [
            'Villa', 'House', 'Cottage', 'Luxury Villa', 'Cheap House',
            'Room', 'Cheap Rooms', 'Luxury Rooms', 'Fancy Rooms'
        ];
        return [
            'title' => $this->faker->city(). Arr::random($suffix),
            'description' => $this->faker->text(),
            'price' =>  random_int(15, 600),
        ];
    }
}
