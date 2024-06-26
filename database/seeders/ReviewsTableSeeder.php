<?php

namespace Database\Seeders;

use App\Models\Bookable;
use App\Models\Review;
use Carbon\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Bookable::all()->each(function(Bookable $bookable){
            $reviews = Review::factory(random_int(5,30))->make();
            $bookable->reviews()->saveMany($reviews);
        });
    }
}
