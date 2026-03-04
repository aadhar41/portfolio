<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{Profile, Skill, Experience, Education, Project, Blog};
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ── Admin User ──────────────────────────────────────────────────
        User::factory()->create([
            'name'  => 'Aadhar Gaur',
            'email' => 'admin@portfolio.test',
        ]);

        // ── Profile ─────────────────────────────────────────────────────
        Profile::create([
            'name'         => 'Aadhar Gaur',
            'title'        => 'Senior PHP Developer | Backend Specialist | Laravel & Yii Expert',
            'bio'          => 'Results-driven developer with 10+ years of experience in backend development, specializing in scalable web applications and RESTful API development.',
            'email'        => 'aadhar41@gmail.com',
            'phone'        => '+91-7737138843',
            'location'     => 'Jaipur, Rajasthan, India',
            'github_url'   => 'https://github.com/aadhar41',
            'linkedin_url' => 'https://www.linkedin.com/in/aadhar-gaur-php',
        ]);

        // ── Skills ──────────────────────────────────────────────────────
        $skills = [
            // Backend Development
            ['name' => 'PHP',         'category' => 'Backend Development', 'level' => 95, 'sort_order' => 1],
            ['name' => 'Laravel',     'category' => 'Backend Development', 'level' => 95, 'sort_order' => 2],
            ['name' => 'Yii / Yii 2', 'category' => 'Backend Development', 'level' => 88, 'sort_order' => 3],
            ['name' => 'CodeIgniter', 'category' => 'Backend Development', 'level' => 82, 'sort_order' => 4],
            ['name' => 'Lumen',       'category' => 'Backend Development', 'level' => 80, 'sort_order' => 5],
            ['name' => 'CakePHP',     'category' => 'Backend Development', 'level' => 78, 'sort_order' => 6],
            ['name' => 'WordPress',   'category' => 'Backend Development', 'level' => 75, 'sort_order' => 7],

            // Database Management
            ['name' => 'MySQL',             'category' => 'Database Management', 'level' => 92, 'sort_order' => 8],
            ['name' => 'MongoDB',           'category' => 'Database Management', 'level' => 72, 'sort_order' => 9],
            ['name' => 'Query Optimization', 'category' => 'Database Management', 'level' => 88, 'sort_order' => 10],
            ['name' => 'Schema Design',     'category' => 'Database Management', 'level' => 85, 'sort_order' => 11],

            // API Development
            ['name' => 'RESTful API Architecture',   'category' => 'API Development', 'level' => 95, 'sort_order' => 12],
            ['name' => 'Third-party Integration',    'category' => 'API Development', 'level' => 90, 'sort_order' => 13],
            ['name' => 'Payment Gateway Integration', 'category' => 'API Development', 'level' => 85, 'sort_order' => 14],

            // Software Development
            ['name' => 'SDLC',                'category' => 'Software Development', 'level' => 88, 'sort_order' => 15],
            ['name' => 'Agile Methodologies', 'category' => 'Software Development', 'level' => 85, 'sort_order' => 16],
            ['name' => 'System Design',       'category' => 'Software Development', 'level' => 82, 'sort_order' => 17],
            ['name' => 'Code Review',         'category' => 'Software Development', 'level' => 90, 'sort_order' => 18],
            ['name' => 'Debugging',           'category' => 'Software Development', 'level' => 92, 'sort_order' => 19],

            // Frontend Technologies
            ['name' => 'HTML5',             'category' => 'Frontend Technologies', 'level' => 85, 'sort_order' => 20],
            ['name' => 'CSS3',              'category' => 'Frontend Technologies', 'level' => 80, 'sort_order' => 21],
            ['name' => 'JavaScript',        'category' => 'Frontend Technologies', 'level' => 82, 'sort_order' => 22],
            ['name' => 'jQuery',            'category' => 'Frontend Technologies', 'level' => 85, 'sort_order' => 23],
            ['name' => 'Bootstrap',         'category' => 'Frontend Technologies', 'level' => 85, 'sort_order' => 24],
            ['name' => 'Responsive Design', 'category' => 'Frontend Technologies', 'level' => 80, 'sort_order' => 25],

            // Tools & Platforms
            ['name' => 'Git',    'category' => 'Tools & Platforms', 'level' => 90, 'sort_order' => 26],
            ['name' => 'CLI',    'category' => 'Tools & Platforms', 'level' => 88, 'sort_order' => 27],
            ['name' => 'Docker', 'category' => 'Tools & Platforms', 'level' => 72, 'sort_order' => 28],
            ['name' => 'Linux',  'category' => 'Tools & Platforms', 'level' => 78, 'sort_order' => 29],
            ['name' => 'Apache', 'category' => 'Tools & Platforms', 'level' => 75, 'sort_order' => 30],
            ['name' => 'Nginx',  'category' => 'Tools & Platforms', 'level' => 70, 'sort_order' => 31],

            // Best Practices
            ['name' => 'Security Implementation',  'category' => 'Best Practices', 'level' => 88, 'sort_order' => 32],
            ['name' => 'Performance Optimization', 'category' => 'Best Practices', 'level' => 90, 'sort_order' => 33],
            ['name' => 'Technical Documentation',  'category' => 'Best Practices', 'level' => 85, 'sort_order' => 34],

            // Leadership
            ['name' => 'Team Mentoring',              'category' => 'Leadership', 'level' => 85, 'sort_order' => 35],
            ['name' => 'Project Management',          'category' => 'Leadership', 'level' => 82, 'sort_order' => 36],
            ['name' => 'Cross-functional Collaboration', 'category' => 'Leadership', 'level' => 85, 'sort_order' => 37],
            ['name' => 'Client Communication',        'category' => 'Leadership', 'level' => 88, 'sort_order' => 38],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }


        // ── Experiences ─────────────────────────────────────────────────
        $experiences = [
            [
                'position'     => 'Senior PHP Developer',
                'company'      => 'RG InfoTech',
                'description'  => 'Led development of 6-7 concurrent Laravel projects, ensuring 100% on-time delivery. Designed and implemented RESTful APIs for third-party service integration.',
                'start_date'   => 'Jan 2024',
                'end_date'     => 'Mar 2025',
                'is_current'   => false,
                'technologies' => ['PHP', 'Laravel', 'MySQL', 'RESTful APIs'],
            ],
            [
                'position'     => 'Senior Software Engineer',
                'company'      => 'SimplifyVMS',
                'description'  => 'Engineered backend services for large-scale Vendor Management System serving 10,000+ users. Optimized database queries improving system performance by 40%.',
                'start_date'   => 'Jun 2022',
                'end_date'     => 'Dec 2023',
                'is_current'   => false,
                'technologies' => ['PHP', 'MySQL', 'RESTful APIs', 'Agile'],
            ],
            [
                'position'     => 'Software Engineer III',
                'company'      => 'Matellio Inc.',
                'description'  => 'Developed and maintained client-based applications using PHP. Created and integrated APIs for seamless data exchange.',
                'start_date'   => 'Nov 2021',
                'end_date'     => 'Jun 2022',
                'is_current'   => false,
                'technologies' => [],
            ],
            [
                'position'     => 'PHP Developer',
                'company'      => 'The NineHertz',
                'description'  => 'Developed web applications using Yii 1 framework and CakePHP. Contributed to both frontend and backend development.',
                'start_date'   => 'May 2019',
                'end_date'     => 'Nov 2020',
                'is_current'   => false,
                'technologies' => [],
            ],
        ];

        foreach ($experiences as $exp) {
            Experience::create($exp);
        }

        // ── Education ───────────────────────────────────────────────────
        $educations = [
            [
                'degree'         => 'B.Tech',
                'field_of_study' => 'Information Technology',
                'institution'    => 'Rajasthan Technical University, Kota',
                'start_year'     => '2008',
                'end_year'       => '2012',
                'grade'          => null,
            ],
            [
                'degree'         => 'Senior Secondary',
                'field_of_study' => 'Science and Mathematics',
                'institution'    => 'D.B.N. School, Ajmer',
                'start_year'     => '2006',
                'end_year'       => '2008',
                'grade'          => null,
            ],
        ];

        foreach ($educations as $edu) {
            Education::create($edu);
        }

        // ── Projects ────────────────────────────────────────────────────
        $projects = [
            [
                'title'        => 'Vendor Management System',
                'description'  => 'A comprehensive VMS serving 10,000+ concurrent users with optimized performance and 99.9% uptime.',
                'technologies' => ['PHP', 'Laravel', 'MySQL', 'REST APIs', 'Agile'],
                'category'     => 'web',
                'featured'     => true,
            ],
            [
                'title'        => 'HRMS System',
                'description'  => 'Optimized and restructured HRMS code for enhanced performance and maintainability with custom modules.',
                'technologies' => ['PHP', 'Laravel', 'MySQL'],
                'category'     => 'web',
                'featured'     => true,
            ],
            [
                'title'        => 'Gaming Platform',
                'description'  => 'Integrated Evoplay third-party services and implemented 2FA security with invoice generation.',
                'technologies' => ['PHP', 'Laravel', 'Third-party APIs', 'Security'],
                'category'     => 'web',
                'featured'     => true,
            ],
            [
                'title'        => 'Medical Staff Recruitment',
                'description'  => 'Comprehensive web application for recruiting medical staff with job postings and applicant tracking.',
                'technologies' => ['PHP', 'JavaScript', 'MySQL'],
                'category'     => 'web',
                'featured'     => false,
            ],
            [
                'title'        => 'Car Rental Management',
                'description'  => 'Efficient car rental management system with vehicle reservations, returns, and customer management.',
                'technologies' => ['PHP', 'CodeIgniter', 'Bootstrap'],
                'category'     => 'web',
                'featured'     => false,
            ],
            [
                'title'        => 'Mobile App APIs',
                'description'  => 'Built RESTful APIs for mobile applications including React Native and iOS apps with Laravel backend.',
                'technologies' => ['PHP', 'Laravel', 'MySQL', 'RESTful APIs'],
                'category'     => 'api',
                'featured'     => false,
            ],
        ];

        foreach ($projects as $i => $proj) {
            Project::create(array_merge($proj, ['sort_order' => $i + 1]));
        }

        // ── Blog Posts ──────────────────────────────────────────────────
        $blogs = [
            [
                'title'        => 'Advanced Laravel Performance Optimization Techniques',
                'slug'         => 'advanced-laravel-performance-optimization',
                'excerpt'      => 'Discover powerful methods to boost your Laravel application\'s performance, from database optimization to caching strategies.',
                'content'      => '<p>Optimizing Laravel application performance is crucial for user experience and scalability.</p><h2>Database Optimization</h2><p>Database queries are often the bottleneck. Ensure you are:</p><ul><li>Using proper indexing on frequently queried columns.</li><li>Eager loading relationships to avoid N+1 query problems.</li><li>Batching inserts and updates when dealing with large datasets.</li></ul><h2>Caching Strategies</h2><p>Caching can drastically reduce the load on your database and server. Consider using Redis or Memcached for application-level caching.</p>',
                'tags'         => ['Laravel', 'PHP', 'Performance'],
                'status'       => 'published',
                'published_at' => now()->subDays(5),
                'read_time'    => 8,
            ],
            [
                'title'        => 'Building Scalable RESTful APIs with PHP',
                'slug'         => 'building-scalable-restful-apis-with-php',
                'excerpt'      => 'Learn best practices for creating robust and scalable APIs that can handle thousands of requests efficiently.',
                'content'      => '<p>A well-designed RESTful API is the backbone of modern web and mobile applications.</p><h2>API Design Principles</h2><p>Follow REST conventions: use proper HTTP methods, status codes, and resource naming.</p><h2>Authentication</h2><p>Use Laravel Sanctum or Passport for token-based API authentication.</p>',
                'tags'         => ['APIs', 'PHP', 'Laravel'],
                'status'       => 'published',
                'published_at' => now()->subDays(10),
                'read_time'    => 12,
            ],
            [
                'title'        => 'MySQL Query Optimization: From Slow to Lightning Fast',
                'slug'         => 'mysql-query-optimization',
                'excerpt'      => 'Transform your slow database queries into high-performance operations with these proven optimization strategies.',
                'content'      => '<p>Slow MySQL queries can cripple your application\'s performance.</p><h2>Indexing</h2><p>Add indexes to columns used in WHERE, JOIN, and ORDER BY clauses.</p><h2>Query Analysis</h2><p>Use EXPLAIN to understand how MySQL executes your queries and identify bottlenecks.</p>',
                'tags'         => ['Database', 'MySQL', 'Performance'],
                'status'       => 'published',
                'published_at' => now()->subDays(15),
                'read_time'    => 10,
            ],
            [
                'title'        => 'PHP 8.3 New Features Every Developer Should Know',
                'slug'         => 'php-83-new-features',
                'excerpt'      => 'Explore the latest PHP 8.3 features including readonly classes, new array functions, and performance improvements.',
                'content'      => '<p>PHP 8.3 brings several exciting improvements to the language.</p><h2>Typed Class Constants</h2><p>You can now declare typed constants in classes, interfaces, and traits.</p><h2>Override Attribute</h2><p>The new #[Override] attribute helps detect mistakes when overriding parent methods.</p>',
                'tags'         => ['PHP', 'Tips & Tricks'],
                'status'       => 'published',
                'published_at' => now()->subDays(20),
                'read_time'    => 6,
            ],
            [
                'title'        => 'Top 10 PHP Security Best Practices for 2025',
                'slug'         => 'php-security-best-practices-2025',
                'excerpt'      => 'Essential security practices every PHP developer must implement to protect their applications from common vulnerabilities.',
                'content'      => '<p>Security should never be an afterthought in PHP development.</p><h2>SQL Injection Prevention</h2><p>Always use prepared statements and parameterized queries.</p><h2>XSS Prevention</h2><p>Sanitize all user input and use htmlspecialchars() when outputting data.</p>',
                'tags'         => ['PHP', 'Security', 'Tips & Tricks'],
                'status'       => 'published',
                'published_at' => now()->subDays(25),
                'read_time'    => 9,
            ],
        ];

        foreach ($blogs as $blog) {
            Blog::create($blog);
        }
    }
}
