<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Skill;
use Illuminate\Support\Facades\DB;

$mapping = [
    'frontend' => 'Frontend Technologies',
    'backend' => 'Backend Development',
    'database' => 'Database Management',
    'devops' => 'Tools & Platforms',
    'tools' => 'Tools & Platforms',
    'Frontend Development' => 'Frontend Technologies',
    'Frontend Technologies' => 'Frontend Technologies',
    'Backend Technologies' => 'Backend Development',
    'Backend Development' => 'Backend Development',
    'Database Management' => 'Database Management',
    'API Development' => 'API Development',
    'Software Development' => 'Software Development',
    'Best Practices' => 'Best Practices',
    'Leadership' => 'Leadership',
    'other' => 'other'
];

$skills = Skill::all();
$updated = 0;

foreach ($skills as $skill) {
    $current = $skill->category;
    if (isset($mapping[$current])) {
        $newCategory = $mapping[$current];
        if ($current !== $newCategory) {
            $skill->category = $newCategory;
            $skill->save();
            $updated++;
        }
    } else {
        // Fallback to 'other' if not in mapping
        $skill->category = 'other';
        $skill->save();
        $updated++;
    }
}

echo "Updated $updated skills to standard categories.\n";

$counts = Skill::selectRaw('category, count(*) as count')->groupBy('category')->get()->pluck('count', 'category')->toArray();
echo json_encode($counts, JSON_PRETTY_PRINT);
