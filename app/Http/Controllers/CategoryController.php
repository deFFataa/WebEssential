<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('CreateCategory', [
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $field = $request->validate(
            [
                'name' => 'required'
            ]
        );
        try {
            Category::create($field);
        } catch (\Throwable $th) {
            return redirect('/create-category')->with('error', 'There was an error creating the category.');
        }

        return redirect('/create-category')->with('message', 'Category created successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $getAllCategory = Category::all();

        if ($getAllCategory->isEmpty()) {
            return inertia('CategoryShow', [
                'categories' => Category::all(),
                'posts' => ['posts' => 'No data yet'],
            ]);
        }

        return inertia('CategoryShow', [
            'categories' => Category::all(),
            'posts' => $category->posts()->paginate(9),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia('EditCategory', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $field = $request->validate(
            [
                'name' => 'required'
            ]
        );
        try {
            $category->update($field);
        } catch (\Throwable $th) {
            return redirect('/create-category')->with('error', 'There was an error creating the category.');
        }

        return redirect('/create-category')->with('message', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return redirect('/create-category')->with('message', 'Category deleted successfully.');
    }
}
