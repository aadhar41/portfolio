<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    /**
     * Return all skills grouped by category.
     */
    public function index()
    {
        $skills = Skill::orderBy('category')
            ->orderBy('sort_order')
            ->get()
            ->groupBy('category');

        return response()->json($skills);
    }

    /**
     * Return a single skill.
     */
    public function show($id)
    {
        return response()->json(Skill::findOrFail($id));
    }

    /**
     * Store a new skill.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:255',
            'category'   => 'required|string|in:frontend,backend,database,tools',
            'level'      => 'nullable|integer|min:1|max:100',
            'sort_order' => 'nullable|integer',
        ]);

        return response()->json(Skill::create($validated), 201);
    }

    /**
     * Update an existing skill.
     */
    public function update(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);

        $validated = $request->validate([
            'name'       => 'sometimes|string|max:255',
            'category'   => 'sometimes|string|in:frontend,backend,database,tools',
            'level'      => 'nullable|integer|min:1|max:100',
            'sort_order' => 'nullable|integer',
        ]);

        $skill->update($validated);

        return response()->json($skill);
    }

    /**
     * Delete a skill.
     */
    public function destroy($id)
    {
        Skill::findOrFail($id)->delete();

        return response()->json(['message' => 'Skill deleted successfully.']);
    }
}
