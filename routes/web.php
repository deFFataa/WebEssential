<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Models\Category;

// sleep(1);
Route::get('/', function () {
    return inertia('Home', ['categories' => Category::all()]);
});
Route::inertia('/about', 'About');
Route::get('/create-post', [PostController::class, 'create']);
Route::inertia('/create-category', 'CreateCategory');

Route::post('/store/category', [CategoryController::class, 'store']);
Route::post('/store/post', [PostController::class, 'store']);
