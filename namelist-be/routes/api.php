<?php

use App\Http\Controllers\Objects\CrmObjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('portal/{portal}')->middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('objects/{objectType}', CrmObjectController::class);
});
