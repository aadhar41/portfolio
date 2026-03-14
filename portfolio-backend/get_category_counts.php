<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$counts = \App\Models\Skill::selectRaw('category, count(*) as count')->groupBy('category')->get()->pluck('count', 'category')->toArray();
echo json_encode($counts, JSON_PRETTY_PRINT);
