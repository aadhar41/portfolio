<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SkillController extends Controller
{
    /**
     * Return all skills grouped by category.
     */
    public function index(Request $request)
    {
        $cacheKey = 'skills_list_' . $request->get('search', 'all') . '_' . $request->get('page', 1) . '_' . $request->get('per_page', 'all');

        $skills = Cache::remember($cacheKey, now()->addHours(24), function () use ($request) {
            $query = Skill::select("id", "is_active", "name", "category", "level", "sort_order")->orderBy('category')
                ->orderBy('sort_order');

            if (!request()->is('api/v1/admin/*')) {
                $query->where('is_active', true);
            }

            if ($request->filled('search')) {
                $query->where('name', 'like', '%' . $request->search . '%');
            }

            if ($request->filled('per_page')) {
                return $query->paginate($request->integer('per_page', 10));
            }

            return $query->get()->groupBy('category');
        });

        return response()->json($skills);
    }

    /**
     * Return a single skill.
     */
    public function show($id)
    {
        $isAdmin = request()->is('api/v1/admin/*');
        $cacheKey = "skill_detail_{$id}_" . ($isAdmin ? 'admin' : 'public');

        $skill = Cache::remember($cacheKey, now()->addHours(24), function () use ($id, $isAdmin) {
            $query = Skill::query();
            if (!$isAdmin) {
                $query->where('is_active', true);
            }
            return $query->findOrFail($id);
        });

        return response()->json($skill);
    }

    /**
     * Store a new skill.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'is_active'  => 'nullable|boolean',
            'name'       => 'required|string|max:255',
            'category'   => 'required|string|in:frontend,backend,database,tools',
            'level'      => 'nullable|integer|min:1|max:100',
            'sort_order' => 'nullable|integer',
        ]);

        $skill = Skill::create($validated);
        Cache::flush();
        return response()->json($skill, 201);
    }

    /**
     * Update an existing skill.
     */
    public function update(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);

        $validated = $request->validate([
            'is_active'  => 'nullable|boolean',
            'name'       => 'sometimes|string|max:255',
            'category'   => 'sometimes|string|in:frontend,backend,database,tools',
            'level'      => 'nullable|integer|min:1|max:100',
            'sort_order' => 'nullable|integer',
        ]);

        $skill->update($validated);
        Cache::flush();

        return response()->json($skill);
    }

    /**
     * Delete a skill.
     */
    public function destroy($id)
    {
        Skill::findOrFail($id)->delete();
        Cache::flush();

        return response()->json(['message' => 'Skill deleted successfully.']);
    }
}
