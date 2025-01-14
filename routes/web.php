<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

sleep(1);
Route::inertia('/', 'Home');
Route::inertia('/about', 'About');
Route::inertia('/add', 'Add');

Route::post('/store', [PostController::class, 'store']);