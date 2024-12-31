<?php

use App\Http\Controllers\Auth\SocialAuthController;
use Illuminate\Support\Facades\Route;

Route::get('/auth/google/redirect', SocialAuthController::class.'@getGoogleRedirect');
Route::get('/auth/google/callback', SocialAuthController::class.'@getGoogleCallback');
