<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\v1\ProfileController;
use App\Http\Controllers\API\v1\ProjectController;
use App\Http\Controllers\API\v1\BlogController;
use App\Http\Controllers\API\v1\ContactController;
use App\Http\Controllers\API\v1\SkillController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {

    // ---- Public endpoints ----
    Route::get('/profile',        [ProfileController::class, 'index']);
    Route::get('/skills',         [SkillController::class, 'index']);
    Route::get('/projects',       [ProjectController::class, 'index']);
    Route::get('/projects/{id}',  [ProjectController::class, 'show']);
    Route::get('/blogs',          [BlogController::class, 'index']);
    Route::get('/blogs/{slug}',   [BlogController::class, 'show']);
    Route::post('/contact',       [ContactController::class, 'store']);

    // ---- Admin endpoints (protected by Sanctum) ----
    Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
        Route::put('/profile/{id}', [ProfileController::class, 'update']);
        Route::apiResource('projects', ProjectController::class)
            ->except(['index', 'show']);
        Route::apiResource('blogs', BlogController::class)
            ->except(['index', 'show']);
        Route::get('/contacts', [ContactController::class, 'index']);
    });
});
