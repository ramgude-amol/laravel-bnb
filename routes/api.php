<?php

use App\Http\Controllers\Api\BookableAvailabilityController;
use App\Http\Controllers\Api\BookableController;
use App\Http\Controllers\Api\BookablePriceController;
use App\Http\Controllers\Api\BookingByReviewController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/bookables', [BookableController::class, 'index']);

// Route::get('/bookable/{id}', [BookableController::class, 'show']);
Route::apiResource('bookable', BookableController::class)->only(['index', 'show']);
Route::apiResource('bookables', BookableController::class);

Route::get('bookables/{bookable}/availability', BookableAvailabilityController::class)
    ->name('bookables.availability.show');

Route::get('bookable/{review}/reviews', ReviewController::class)
    ->name('bookables.reviews.index');


Route::get('bookable/{bookable}/price', BookablePriceController::class)
    ->name('bookables.price.show');


Route::apiResource('reviews', ReviewController::class)->only(['show', 'store']);

Route::get('booking-by-review/{reviewKey}', BookingByReviewController::class)
    ->name('booking.by-review.show');

Route::post('checkout', CheckoutController::class)
    ->name('checkout');
