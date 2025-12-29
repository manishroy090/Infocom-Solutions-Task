<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;




Route::prefix('auth')->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('login', 'login');
        Route::post('register', 'register');
    });
});

Route::middleware('auth:api')->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::get('logout', 'logout');
        Route::get('refresh', 'refresh');
        Route::get('me', 'me');
    });
});
