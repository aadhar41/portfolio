<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\Skill;
use App\Models\Experience;
use App\Models\Education;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Return the full profile along with skills, experiences, and educations.
     */
    public function index()
    {
        return response()->json([
            'profile'     => Profile::first(),
            'skills'      => Skill::orderBy('category')->orderBy('sort_order')->get()->groupBy('category'),
            'experiences' => Experience::orderByDesc('start_date')->get(),
            'educations'  => Education::orderByDesc('start_year')->get(),
        ]);
    }

    /**
     * Return the profile record only.
     */
    public function show()
    {
        return response()->json(Profile::firstOrFail());
    }

    /**
     * Update the profile (there is only one profile).
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'title'        => 'required|string|max:255',
            'bio'          => 'required|string',
            'email'        => 'required|email|max:255',
            'phone'        => 'nullable|string|max:30',
            'location'     => 'nullable|string|max:255',
            'github_url'   => 'nullable|url|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'avatar'       => 'nullable|string|max:255',
        ]);

        $profile = Profile::updateOrCreate(['id' => 1], $validated);

        return response()->json($profile);
    }
}
