<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ExperienceController extends Controller
{
    /**
     * Return all experiences, latest first.
     */
    public function index(Request $request)
    {
        $cacheKey = 'experiences_list_' . $request->get('search', 'all') . '_' . $request->get('page', 1) . '_' . $request->get('per_page', 'all');

        $experiences = Cache::remember($cacheKey, now()->addHours(24), function () use ($request) {
            $query = Experience::query();

            if (!request()->is('api/v1/admin/*')) {
                $query->where('is_active', true);
            }

            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('company', 'like', '%' . $search . '%')
                        ->orWhere('position', 'like', '%' . $search . '%')
                        ->orWhere('description', 'like', '%' . $search . '%');
                });
            }

            return ($request->has('page') || $request->has('per_page'))
                ? $query->orderByDesc('start_date')->paginate($request->integer('per_page', 10))
                : $query->orderByDesc('start_date')->get();
        });

        return response()->json($experiences);
    }

    /**
     * Return a single experience entry.
     */
    public function show($id)
    {
        $isAdmin = request()->is('api/v1/admin/*');
        $cacheKey = "experience_detail_{$id}_" . ($isAdmin ? 'admin' : 'public');

        $experience = Cache::remember($cacheKey, now()->addHours(24), function () use ($id, $isAdmin) {
            $query = Experience::query();
            if (!$isAdmin) {
                $query->where('is_active', true);
            }
            return $query->findOrFail($id);
        });

        return response()->json($experience);
    }

    /**
     * Store a new experience entry.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'is_active'    => 'nullable|boolean',
            'company'      => 'required|string|max:255',
            'position'     => 'required|string|max:255',
            'description'  => 'required|string',
            'start_date'   => 'required|string',
            'end_date'     => 'nullable|string',
            'is_current'   => 'boolean',
            'technologies' => 'nullable|array',
        ]);

        $experience = Experience::create($validated);
        Cache::flush();
        return response()->json($experience, 201);
    }

    /**
     * Update an existing experience entry.
     */
    public function update(Request $request, $id)
    {
        $experience = Experience::findOrFail($id);

        $validated = $request->validate([
            'is_active'    => 'nullable|boolean',
            'company'      => 'sometimes|string|max:255',
            'position'     => 'sometimes|string|max:255',
            'description'  => 'sometimes|string',
            'start_date'   => 'sometimes|string',
            'end_date'     => 'nullable|string',
            'is_current'   => 'boolean',
            'technologies' => 'nullable|array',
        ]);

        $experience->update($validated);
        Cache::flush();

        return response()->json($experience);
    }

    /**
     * Delete an experience entry.
     */
    public function destroy($id)
    {
        Experience::findOrFail($id)->delete();
        Cache::flush();

        return response()->json(['message' => 'Experience deleted successfully.']);
    }
}
