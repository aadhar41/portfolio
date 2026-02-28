<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    /**
     * Return all experiences, latest first.
     */
    public function index()
    {
        return response()->json(
            Experience::orderByDesc('start_date')->get()
        );
    }

    /**
     * Return a single experience entry.
     */
    public function show($id)
    {
        return response()->json(Experience::findOrFail($id));
    }

    /**
     * Store a new experience entry.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company'      => 'required|string|max:255',
            'position'     => 'required|string|max:255',
            'description'  => 'required|string',
            'start_date'   => 'required|string',
            'end_date'     => 'nullable|string',
            'is_current'   => 'boolean',
            'technologies' => 'nullable|array',
        ]);

        return response()->json(Experience::create($validated), 201);
    }

    /**
     * Update an existing experience entry.
     */
    public function update(Request $request, $id)
    {
        $experience = Experience::findOrFail($id);

        $validated = $request->validate([
            'company'      => 'sometimes|string|max:255',
            'position'     => 'sometimes|string|max:255',
            'description'  => 'sometimes|string',
            'start_date'   => 'sometimes|string',
            'end_date'     => 'nullable|string',
            'is_current'   => 'boolean',
            'technologies' => 'nullable|array',
        ]);

        $experience->update($validated);

        return response()->json($experience);
    }

    /**
     * Delete an experience entry.
     */
    public function destroy($id)
    {
        Experience::findOrFail($id)->delete();

        return response()->json(['message' => 'Experience deleted successfully.']);
    }
}
