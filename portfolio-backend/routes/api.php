<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\v1\ProfileController;
use App\Http\Controllers\API\v1\ProjectController;
use App\Http\Controllers\API\v1\BlogController;
use App\Http\Controllers\API\v1\ContactController;
use App\Http\Controllers\API\v1\SkillController;


use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\ExperienceController;
use App\Http\Controllers\API\v1\EducationController;

Route::prefix('v1')->group(function () {

    // ---- Authentication ----
    Route::post('/login', [AuthController::class, 'login']);

    // ---- Public endpoints ----
    Route::get('/profile',        [ProfileController::class, 'index']);
    Route::get('/skills',         [SkillController::class, 'index']);
    Route::get('/projects',       [ProjectController::class, 'index']);
    Route::get('/projects/{id}',  [ProjectController::class, 'show']);
    Route::get('/blogs',          [BlogController::class, 'index']);
    Route::get('/blogs/{slug}',   [BlogController::class, 'show']);
    Route::post('/contact',       [ContactController::class, 'store']);

    // ---- Admin endpoints (protected by Sanctum) ----
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me',      [AuthController::class, 'me']);

        Route::prefix('admin')->group(function () {
            Route::put('/profile', [ProfileController::class, 'update']);
            Route::apiResource('skills', SkillController::class);
            Route::apiResource('experiences', ExperienceController::class);
            Route::apiResource('education', EducationController::class);
            Route::apiResource('projects', ProjectController::class);
            Route::apiResource('blogs', BlogController::class);
            Route::get('/contacts', [ContactController::class, 'index']);
        });
    });
});
