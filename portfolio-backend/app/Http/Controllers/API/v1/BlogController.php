<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    /**
     * Return all published blogs with optional tag filter.
     */
    public function index(Request $request)
    {
        $query = Blog::where('status', 'published');

        if ($request->filled('tag')) {
            $query->whereJsonContains('tags', $request->tag);
        }

        return response()->json(
            $query->orderByDesc('published_at')->get()
        );
    }

    /**
     * Return a single published blog by slug.
     */
    public function show($slug)
    {
        return response()->json(
            Blog::where('slug', $slug)
                ->where('status', 'published')
                ->firstOrFail()
        );
    }

    /**
     * Store a new blog post.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'slug'         => 'nullable|string|unique:blogs,slug|max:255',
            'excerpt'      => 'required|string',
            'content'      => 'required|string',
            'cover_image'  => 'nullable|string|max:255',
            'tags'         => 'nullable|array',
            'status'       => 'in:draft,published',
            'published_at' => 'nullable|date',
            'read_time'    => 'nullable|integer|min:1',
        ]);

        // Auto-set published_at when publishing
        if (($validated['status'] ?? 'draft') === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        return response()->json(Blog::create($validated), 201);
    }

    /**
     * Update an existing blog post.
     */
    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $validated = $request->validate([
            'title'        => 'sometimes|string|max:255',
            'slug'         => 'nullable|string|unique:blogs,slug,' . $id . '|max:255',
            'excerpt'      => 'sometimes|string',
            'content'      => 'sometimes|string',
            'cover_image'  => 'nullable|string|max:255',
            'tags'         => 'nullable|array',
            'status'       => 'in:draft,published',
            'published_at' => 'nullable|date',
            'read_time'    => 'nullable|integer|min:1',
        ]);

        // Auto-set published_at when transitioning to published
        if (isset($validated['status']) && $validated['status'] === 'published' && !$blog->published_at) {
            $validated['published_at'] = now();
        }

        $blog->update($validated);

        return response()->json($blog);
    }

    /**
     * Delete a blog post.
     */
    public function destroy($id)
    {
        Blog::findOrFail($id)->delete();

        return response()->json(['message' => 'Blog post deleted successfully.']);
    }
}
