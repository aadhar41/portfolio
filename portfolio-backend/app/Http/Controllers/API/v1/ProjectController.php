<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Return all projects with optional category and search filters.
     */
    public function index(Request $request)
    {
        $query = Project::query();

        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        return response()->json(
            $query->orderByDesc('featured')->orderBy('sort_order')->get()
        );
    }

    /**
     * Return a single project.
     */
    public function show($id)
    {
        return response()->json(Project::findOrFail($id));
    }

    /**
     * Store a new project.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
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

        return response()->json(Project::create($validated), 201);
    }

    /**
     * Update an existing project.
     */
    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
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

        return response()->json($project);
    }

    /**
     * Delete a project.
     */
    public function destroy($id)
    {
        Project::findOrFail($id)->delete();

        return response()->json(['message' => 'Project deleted successfully.']);
    }
}
