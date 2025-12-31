<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\TemplatesController;
use App\Http\Controllers\Api\FormSubmissionController;




Route::prefix('auth')->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('login', 'login')->name('login');
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


Route::group(['middleware'=>['auth:api','authorization'],'prefix'=>"templates"],function(){
 Route::controller(TemplatesController::class)->group(function () {
        Route::get('index', 'index');
        Route::post('store', 'store');
        Route::get('edit/{id}', 'edit');
        Route::put('/update/{id}','update');
        Route::get('delete', 'delete');
    });
});


Route::group(['middleware'=>['auth:api','authorization'],'prefix'=>"formsubmission"],function(){
 Route::controller(FormSubmissionController::class)->group(function () {
        Route::get('getschema', 'getSchema');
        Route::post('store', 'store');
        Route::get('store', 'excelImport');
        Route::get('store', 'excelImport');
    });
});