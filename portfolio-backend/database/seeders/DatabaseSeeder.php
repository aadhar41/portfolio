<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{Profile, Skill, Experience, Education, Project, Blog};

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Profile
        Profile::create([
            'name'         => 'Aadhar Gaur',
            'title'        => 'Full Stack Developer',
            'bio'          => 'Passionate developer building modern web applications.',
            'email'        => 'aadhar@example.com',
            'location'     => 'India',
            'github_url'   => 'https://github.com/aadhar41',
            'linkedin_url' => 'https://www.linkedin.com/in/aadhar-gaur-php',
        ]);

        // Skills
        $skills = [
            ['name' => 'React',      'category' => 'frontend', 'level' => 75, 'sort_order' => 5],
            ['name' => 'Laravel',    'category' => 'backend',  'level' => 85, 'sort_order' => 1],
            ['name' => 'MySQL',      'category' => 'database', 'level' => 80, 'sort_order' => 2],
            ['name' => 'JavaScript', 'category' => 'frontend', 'level' => 88, 'sort_order' => 4],
            ['name' => 'PHP',        'category' => 'backend',  'level' => 85, 'sort_order' => 2],
            ['name' => 'Tailwind',   'category' => 'frontend', 'level' => 92, 'sort_order' => 6],
        ];
        foreach ($skills as $s) Skill::create($s);

        // Projects
        Project::create([
            'title'        => 'Portfolio Website',
            'description'  => 'Personal portfolio built with Laravel + React.',
            'technologies' => ['React 19', 'Laravel 12', 'MySQL', 'Tailwind CSS'],
            'category'     => 'web',
            'featured'     => true,
            'github_url'   => 'https://github.com/aadhar41/portfolio',
        ]);

        // Blog
        Blog::create([
            'title'        => 'Getting Started with Laravel 12',
            'slug'         => 'getting-started-laravel-12',
            'excerpt'      => 'A beginner guide to building APIs with Laravel 12.',
            'content'      => '# Getting Started with Laravel 12...',
            'tags'         => ['laravel', 'php', 'backend'],
            'status'       => 'published',
            'published_at' => now(),
            'read_time'    => 5,
        ]);
    }
}
