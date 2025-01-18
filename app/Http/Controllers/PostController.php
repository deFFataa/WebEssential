<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
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
        return inertia('Create', [
            'categories' => Category::all(),
            'posts' => Post::with('category')->latest()->get(),
        ]);
    }
    
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $fields = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'avatar' => 'sometimes',
            'link' => 'required',
            'categories' => [['required'], Rule::exists('categories', 'id')], 
        ]);

        $fields['category_id'] = $fields['categories'];
        unset($fields['categories']);

        if ($request->hasFile('avatar')) {
            $fields['avatar'] = $request->file('avatar')->store('assets/Uploads', 'public');
            $fields['has_avatar'] = true;
        } else {
            $fields['has_avatar'] = false;
        }

        Post::create($fields);

        return redirect('/create-post')
            ->with('categories', Category::all())
            ->with('posts', Post::with('category')->get())
            ->with('message', 'Post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return inertia('PostEdit', [
            'post' => $post->with('category')->firstWhere('id', $post->id),
            'categories' => Category::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $fields = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'avatar' => 'sometimes', // Accept null or file if provided
            'link' => 'required',
            'categories' => ['required', Rule::exists('categories', 'id')],
        ]);        
    
        // Update category_id
        $fields['category_id'] = $fields['categories'];
        unset($fields['categories']);
    
        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            $fields['avatar'] = $request->file('avatar')->store('assets/Uploads', 'public');
            $fields['has_avatar'] = true;
        } else {
            $fields['has_avatar'] = false;
        }
    
        // Use the instance to update
        $post->update($fields);
    
        // Return redirect with updated data
        return redirect('/create-post')
            ->with('message', 'Post updated successfully.');
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return redirect('/create-post')->with('message', 'Post deleted successfully.');
    }
}
