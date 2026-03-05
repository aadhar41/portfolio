<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

class BlogController extends Controller
{
    /**
     * Return all published blogs with optional tag filter.
     */
    public function index(Request $request)
    {
        $cacheKey = 'blogs_list_' . $request->get('tag', 'all') . '_' . $request->get('search', 'all') . '_' . $request->get('page', 1) . '_' . $request->get('per_page', 'all') . '_' . ($request->user() ? $request->user()->id : 'public');

        $blogs = Cache::remember($cacheKey, now()->addHours(24), function () use ($request) {
            $query = Blog::query();

            // Admin can see all, public only published
            if (!$request->user() || $request->user()->role !== 'admin') {
                $query->where('status', 'published');
            } elseif ($request->filled('status')) {
                $query->where('status', $request->status);
            }

            if ($request->filled('tag')) {
                $query->whereJsonContains('tags', $request->tag);
            }

            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', '%' . $search . '%')
                        ->orWhere('excerpt', 'like', '%' . $search . '%')
                        ->orWhere('content', 'like', '%' . $search . '%');
                });
            }

            return $query->orderByDesc('published_at')
                ->orderByDesc('created_at')
                ->paginate($request->integer('per_page', 10));
        });

        return response()->json($blogs);
    }

    /**
     * Return a single published blog by slug.
     */
    public function show($slug)
    {
        $blog = Cache::remember("blog_post_{$slug}", now()->addHours(24), function () use ($slug) {
            return Blog::where('slug', $slug)
                ->where('status', 'published')
                ->firstOrFail();
        });

        return response()->json($blog);
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
