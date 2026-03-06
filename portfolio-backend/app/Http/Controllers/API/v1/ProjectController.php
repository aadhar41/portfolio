<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProjectController extends Controller
{
    /**
     * Return all projects with optional category and search filters.
     */
    public function index(Request $request)
    {
        $cacheKey = 'projects_list_' . $request->get('category', 'all') . '_' . $request->get('search', 'all') . '_' . $request->get('page', 1) . '_' . $request->get('per_page', 'all') . '_' . $request->get('is_active', 'all');

        $projects = Cache::remember($cacheKey, now()->addHours(24), function () use ($request) {
            $query = Project::query();

            if ($request->filled('is_active')) {
                $query->where('is_active', $request->boolean('is_active'));
            } elseif (!request()->is('api/v1/admin/*')) {
                $query->where('is_active', true);
            }

            if ($request->filled('category') && $request->category !== 'all') {
                $query->where('category', $request->category);
            }

            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', '%' . $search . '%')
                        ->orWhere('description', 'like', '%' . $search . '%');
                });
            }

            return $query->orderByDesc('featured')
                ->orderBy('sort_order')
                ->paginate($request->integer('per_page', 10));
        });

        return response()->json($projects);
    }

    /**
     * Return a single project.
     */
    public function show($id)
    {
        $project = Cache::remember("project_detail_{$id}", now()->addHours(24), function () use ($id) {
            return Project::where('id', $id)
                ->when(!request()->is('api/v1/admin/*'), function ($q) {
                    $q->where('is_active', true);
                })
                ->firstOrFail();
        });

        return response()->json($project);
    }

    /**
     * Store a new project.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'is_active'        => 'nullable|boolean',
            'title'            => 'required|string|max:255',
            'description'      => 'required|string',
            'long_description' => 'nullable|string',
            'image'            => 'nullable|string|max:255',
            'live_url'         => 'nullable|url|max:255',
            'github_url'       => 'nullable|url|max:255',
            'technologies'     => 'required|array',
            'category'         => 'required|string|in:web,mobile,api',
            'featured'         => 'boolean',
            'sort_order'       => 'nullable|integer',
        ]);

        $project = Project::create($validated);
        Cache::flush();
        return response()->json($project, 201);
    }

    /**
     * Update an existing project.
     */
    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'is_active'        => 'nullable|boolean',
            'title'            => 'sometimes|string|max:255',
            'description'      => 'sometimes|string',
            'long_description' => 'nullable|string',
            'image'            => 'nullable|string|max:255',
            'live_url'         => 'nullable|url|max:255',
            'github_url'       => 'nullable|url|max:255',
            'technologies'     => 'sometimes|array',
            'category'         => 'sometimes|string|in:web,mobile,api',
            'featured'         => 'boolean',
            'sort_order'       => 'nullable|integer',
        ]);

        $project->update($validated);
        Cache::flush();

        return response()->json($project);
    }

    /**
     * Delete a project.
     */
    public function destroy($id)
    {
        Project::findOrFail($id)->delete();
        Cache::flush();

        return response()->json(['message' => 'Project deleted successfully.']);
    }
}
