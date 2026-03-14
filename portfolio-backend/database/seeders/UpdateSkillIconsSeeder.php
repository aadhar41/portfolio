<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Skill;

class UpdateSkillIconsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skillsData = [
            ['name' => 'PHP (5.*+, 7.*+, 8.1+)', 'icon' => 'fab fa-php', 'category' => 'Backend Development'],
            ['name' => 'Laravel (5–12)', 'icon' => 'fab fa-laravel', 'category' => 'Backend Development'],
            ['name' => 'Yii / Yii2', 'icon' => 'fas fa-layer-group', 'category' => 'Backend Development'],
            ['name' => 'CodeIgniter', 'icon' => 'fas fa-fire', 'category' => 'Backend Development'],
            ['name' => 'CakePHP', 'icon' => 'fas fa-birthday-cake', 'category' => 'Backend Development'],
            ['name' => 'Express.js', 'icon' => 'fas fa-terminal', 'category' => 'Backend Development'],
            ['name' => 'MySQL', 'icon' => 'fas fa-database', 'category' => 'Database Management'],
            ['name' => 'MongoDB', 'icon' => 'fas fa-leaf', 'category' => 'Database Management'],
            ['name' => 'Redis', 'icon' => 'fas fa-memory', 'category' => 'Database Management'],
            ['name' => 'Memcached', 'icon' => 'fas fa-code', 'category' => 'other'],
            ['name' => 'Query Optimization', 'icon' => 'fas fa-search', 'category' => 'Database Management'],
            ['name' => 'Schema Design', 'icon' => 'fas fa-sitemap', 'category' => 'Database Management'],
            ['name' => 'RESTful APIs', 'icon' => 'fas fa-server', 'category' => 'API Development'],
            ['name' => 'WebSockets', 'icon' => 'fas fa-plug', 'category' => 'API Development'],
            ['name' => 'Socket.io', 'icon' => 'fas fa-bolt', 'category' => 'API Development'],
            ['name' => 'Laravel Sanctum', 'icon' => 'fas fa-shield-alt', 'category' => 'API Development'],
            ['name' => 'JWT Authentication', 'icon' => 'fas fa-fingerprint', 'category' => 'API Development'],
            ['name' => 'Third-party Integration', 'icon' => 'fas fa-puzzle-piece', 'category' => 'API Development'],
            ['name' => 'Payment Gateway Integration', 'icon' => 'fas fa-credit-card', 'category' => 'API Development'],
            ['name' => 'SDLC', 'icon' => 'fas fa-recycle', 'category' => 'Software Development'],
            ['name' => 'Agile / Scrum', 'icon' => 'fas fa-sync-alt', 'category' => 'Software Development'],
            ['name' => 'MVC Architecture', 'icon' => 'fas fa-cubes', 'category' => 'Software Development'],
            ['name' => 'Unit Testing (PHPUnit)', 'icon' => 'fas fa-check-double', 'category' => 'Software Development'],
            ['name' => 'System Design', 'icon' => 'fas fa-project-diagram', 'category' => 'Software Development'],
            ['name' => 'Code Review', 'icon' => 'fas fa-eye', 'category' => 'Software Development'],
            ['name' => 'Debugging', 'icon' => 'fas fa-bug', 'category' => 'Software Development'],
            ['name' => 'HTML5', 'icon' => 'fab fa-html5', 'category' => 'Frontend Technologies'],
            ['name' => 'CSS3', 'icon' => 'fab fa-css3-alt', 'category' => 'Frontend Technologies'],
            ['name' => 'JavaScript (ES6+)', 'icon' => 'fab fa-js-square', 'category' => 'Frontend Technologies'],
            ['name' => 'React.js', 'icon' => 'fab fa-react', 'category' => 'Frontend Technologies'],
            ['name' => 'jQuery', 'icon' => 'fab fa-js', 'category' => 'Frontend Technologies'],
            ['name' => 'Bootstrap 5', 'icon' => 'fab fa-bootstrap', 'category' => 'Frontend Technologies'],
            ['name' => 'Tailwind CSS', 'icon' => 'fas fa-wind', 'category' => 'Frontend Technologies'],
            ['name' => 'Responsive Design', 'icon' => 'fas fa-mobile-alt', 'category' => 'Frontend Technologies'],
            ['name' => 'Git', 'icon' => 'fab fa-git-alt', 'category' => 'other'],
            ['name' => 'Composer', 'icon' => 'fas fa-music', 'category' => 'other'],
            ['name' => 'npm', 'icon' => 'fab fa-npm', 'category' => 'other'],
            ['name' => 'Vite', 'icon' => 'fas fa-bolt', 'category' => 'other'],
            ['name' => 'Postman', 'icon' => 'fas fa-rocket', 'category' => 'other'],
            ['name' => 'Insomnia', 'icon' => 'fas fa-moon', 'category' => 'other'],
            ['name' => 'Swagger', 'icon' => 'fas fa-map', 'category' => 'other'],
            ['name' => 'CLI', 'icon' => 'fas fa-terminal', 'category' => 'other'],
            ['name' => 'Linux', 'icon' => 'fab fa-linux', 'category' => 'other'],
            ['name' => 'Apache', 'icon' => 'fas fa-feather-alt', 'category' => 'other'],
            ['name' => 'Security Implementation', 'icon' => 'fas fa-shield-alt', 'category' => 'Best Practices'],
            ['name' => 'Performance Optimization', 'icon' => 'fas fa-tachometer-alt', 'category' => 'Best Practices'],
            ['name' => 'Technical Documentation', 'icon' => 'fas fa-file-alt', 'category' => 'Best Practices'],
            ['name' => 'Team Mentoring', 'icon' => 'fas fa-users', 'category' => 'Leadership'],
            ['name' => 'Project Management', 'icon' => 'fas fa-tasks', 'category' => 'Leadership'],
            ['name' => 'Cross-functional Collaboration', 'icon' => 'fas fa-hands-helping', 'category' => 'Leadership'],
            ['name' => 'Client Communication', 'icon' => 'fas fa-comment-dots', 'category' => 'Leadership'],
        ];

        foreach ($skillsData as $data) {
            Skill::where('name', $data['name'])->update([
                'icon' => $data['icon'],
                'category' => $data['category']
            ]);
        }

        // Handle generic match for anything not found by exact name (if any)
        $iconsFallback = [
            'php'         => 'fab fa-php',
            'laravel'     => 'fab fa-laravel',
            'yii'         => 'fas fa-layer-group',
            'mysql'       => 'fas fa-database',
            'react'       => 'fab fa-react',
            'javascript'  => 'fab fa-js-square',
        ];

        Skill::whereNull('icon')->get()->each(function ($skill) use ($iconsFallback) {
            $key = strtolower(explode(' ', explode('/', $skill->name)[0])[0]);
            if (isset($iconsFallback[$key])) {
                $skill->update(['icon' => $iconsFallback[$key]]);
            } else {
                $skill->update(['icon' => 'fas fa-code']);
            }
        });
    }
}
