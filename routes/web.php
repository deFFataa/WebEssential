<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Models\Category;
use App\Models\Post;

// sleep(1);
Route::get('/', function () {
    return inertia('Home', ['categories' => Category::all(), 'posts' => Post::all()]);
});
Route::inertia('/about', 'About');
Route::get('/create-post', [PostController::class, 'create']);
Route::post('/store/post', [PostController::class, 'store']);
Route::get('/posts/{post}', [PostController::class, 'edit']);
Route::put('/posts/{post}/update', [PostController::class, 'update']);
Route::delete('/posts/{post}/delete', [PostController::class, 'destroy']);

Route::get('/create-category', [CategoryController::class, 'create']);
Route::post('/store/category', [CategoryController::class, 'store']);
Route::get('/category/{category}', [CategoryController::class, 'show']);
Route::get('/category/{category}/edit', [CategoryController::class, 'edit']);
Route::put('/category/{category}/update', [CategoryController::class, 'update']);
Route::delete('/category/{category}/delete', [CategoryController::class, 'destroy']);

