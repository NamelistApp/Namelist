<?php

use App\Http\Controllers\Crm\CrmObjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('portal/{portal}')->middleware(['auth:sanctum'])->group(function () {
    Route::get('crm-objects/{objectType}', [CrmObjectController::class, 'index']);
    Route::post('crm-objects/{objectType}', [CrmObjectController::class, 'store']);
    Route::get('crm-objects/{objectType}/{crmObject}', [CrmObjectController::class, 'show']);
})->scopeBindings();
