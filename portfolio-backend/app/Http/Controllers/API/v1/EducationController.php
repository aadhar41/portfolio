<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class EducationController extends Controller
{
    /**
     * Return all education entries, latest first.
     */
    public function index(Request $request)
    {
        $cacheKey = 'education_list_' . $request->get('search', 'all') . '_' . $request->get('page', 1) . '_' . $request->get('per_page', 'all');

        $education = Cache::remember($cacheKey, now()->addHours(24), function () use ($request) {
            $query = Education::query();

            if (!request()->is('api/v1/admin/*')) {
                $query->where('is_active', true);
            }

            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('institution', 'like', '%' . $search . '%')
                        ->orWhere('degree', 'like', '%' . $search . '%')
                        ->orWhere('field_of_study', 'like', '%' . $search . '%');
                });
            }

            return ($request->has('page') || $request->has('per_page'))
                ? $query->orderByDesc('start_year')->paginate($request->integer('per_page', 10))
                : $query->orderByDesc('start_year')->get();
        });

        return response()->json($education);
    }

    /**
     * Return a single education entry.
     */
    public function show($id)
    {
        $isAdmin = request()->is('api/v1/admin/*');
        $cacheKey = "education_detail_{$id}_" . ($isAdmin ? 'admin' : 'public');

        $education = Cache::remember($cacheKey, now()->addHours(24), function () use ($id, $isAdmin) {
            $query = Education::query();
            if (!$isAdmin) {
                $query->where('is_active', true);
            }
            return $query->findOrFail($id);
        });

        return response()->json($education);
    }

    /**
     * Store a new education entry.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'is_active'     => 'nullable|boolean',
            'institution'   => 'required|string|max:255',
            'degree'        => 'required|string|max:255',
            'field_of_study' => 'required|string|max:255',
            'start_year'    => 'required|string',
            'end_year'      => 'nullable|string',
            'grade'         => 'nullable|string|max:50',
        ]);

        $education = Education::create($validated);
        Cache::flush();
        return response()->json($education, 201);
    }

    /**
     * Update an existing education entry.
     */
    public function update(Request $request, $id)
    {
        $education = Education::findOrFail($id);

        $validated = $request->validate([
            'is_active'     => 'nullable|boolean',
            'institution'   => 'sometimes|string|max:255',
            'degree'        => 'sometimes|string|max:255',
            'field_of_study' => 'sometimes|string|max:255',
            'start_year'    => 'sometimes|string',
            'end_year'      => 'nullable|string',
            'grade'         => 'nullable|string|max:50',
        ]);

        $education->update($validated);
        Cache::flush();

        return response()->json($education);
    }

    /**
     * Delete an education entry.
     */
    public function destroy($id)
    {
        Education::findOrFail($id)->delete();
        Cache::flush();

        return response()->json(['message' => 'Education deleted successfully.']);
    }
}
