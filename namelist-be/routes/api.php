<?php

use App\Http\Controllers\Crm\CrmObjectController;
use App\Http\Controllers\Crm\FormController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('portal/{portal}')->middleware(['auth:sanctum'])->group(function () {
    Route::get('crm-objects/{objectType}', [CrmObjectController::class, 'index']);
    Route::post('crm-objects/{objectType}', [CrmObjectController::class, 'store']);
    Route::get('crm-objects/{objectType}/{crmObject}', [CrmObjectController::class, 'show']);

    Route::resource('forms', FormController::class);
    Route::get('forms/{form}/stats', [FormController::class, 'stats']);
})->scopeBindings();

// Called from clients who send a bearer token
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('app_users/{distinct_id}', [App\Http\Controllers\AppUserController::class, 'show']);
    Route::post('ingest', App\Http\Controllers\IngestController::class)->name('ingest');
});
