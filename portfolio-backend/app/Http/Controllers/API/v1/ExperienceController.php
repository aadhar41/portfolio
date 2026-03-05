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
    public function index(Request $request)
    {
        $query = Experience::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('company', 'like', '%' . $search . '%')
                    ->orWhere('position', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        $experiences = ($request->has('page') || $request->has('per_page'))
            ? $query->orderByDesc('start_date')->paginate($request->integer('per_page', 10))
            : $query->orderByDesc('start_date')->get();

        return response()->json($experiences);
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
