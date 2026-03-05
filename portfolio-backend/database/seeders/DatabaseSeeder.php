<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{Profile, Skill, Experience, Education, Project, Blog};
use Illuminate\Support\Facades\Hash;
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
        User::create([
            'name'     => 'Aadhar Admin',
            'email'    => 'admin@aadhar.com',
            'password' => Hash::make('admin123'),
            'role'     => 'admin',
        ]);

        User::create([
            'name'     => 'Aadhar Editor',
            'email'    => 'editor@aadhar.com',
            'password' => Hash::make('editor123'),
            'role'     => 'editor',
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
            'avatar'       => '/img/AboutAadhar.jpg',
        ]);

        // ── Skills ──────────────────────────────────────────────────────
        $skills = [
            // Backend Development
            ['name' => 'PHP (5.*+, 7.*+, 8.1+)', 'category' => 'Backend Development', 'level' => 95, 'sort_order' => 1],
            ['name' => 'Laravel (5–12)',      'category' => 'Backend Development', 'level' => 95, 'sort_order' => 2],
            ['name' => 'Yii / Yii2',          'category' => 'Backend Development', 'level' => 85, 'sort_order' => 3],
            ['name' => 'CodeIgniter',         'category' => 'Backend Development', 'level' => 82, 'sort_order' => 4],
            ['name' => 'CakePHP',             'category' => 'Backend Development', 'level' => 78, 'sort_order' => 5],
            ['name' => 'Express.js',          'category' => 'Backend Development', 'level' => 80, 'sort_order' => 6],

            // Database Management
            ['name' => 'MySQL',               'category' => 'Database Management', 'level' => 87, 'sort_order' => 7],
            ['name' => 'MongoDB',             'category' => 'Database Management', 'level' => 72, 'sort_order' => 8],
            ['name' => 'Redis',               'category' => 'Database Management', 'level' => 70, 'sort_order' => 9],
            ['name' => 'Memcached',           'category' => 'Database Management', 'level' => 71, 'sort_order' => 10],
            ['name' => 'Query Optimization',  'category' => 'Database Management', 'level' => 88, 'sort_order' => 11],
            ['name' => 'Schema Design',       'category' => 'Database Management', 'level' => 85, 'sort_order' => 12],

            // API & Backend
            ['name' => 'RESTful APIs',        'category' => 'API Development', 'level' => 95, 'sort_order' => 13],
            ['name' => 'WebSockets',          'category' => 'API Development', 'level' => 85, 'sort_order' => 14],
            ['name' => 'Socket.io',           'category' => 'API Development', 'level' => 82, 'sort_order' => 15],
            ['name' => 'Laravel Sanctum',     'category' => 'API Development', 'level' => 88, 'sort_order' => 16],
            ['name' => 'JWT Authentication',  'category' => 'API Development', 'level' => 85, 'sort_order' => 17],
            ['name' => 'Third-party Integration', 'category' => 'API Development', 'level' => 90, 'sort_order' => 18],
            ['name' => 'Payment Gateway Integration', 'category' => 'API Development', 'level' => 85, 'sort_order' => 19],

            // Software Development
            ['name' => 'SDLC',                'category' => 'Software Development', 'level' => 88, 'sort_order' => 20],
            ['name' => 'Agile / Scrum',       'category' => 'Software Development', 'level' => 85, 'sort_order' => 21],
            ['name' => 'MVC Architecture',    'category' => 'Software Development', 'level' => 90, 'sort_order' => 22],
            ['name' => 'Unit Testing (PHPUnit)', 'category' => 'Software Development', 'level' => 82, 'sort_order' => 23],
            ['name' => 'System Design',       'category' => 'Software Development', 'level' => 82, 'sort_order' => 24],
            ['name' => 'Code Review',         'category' => 'Software Development', 'level' => 90, 'sort_order' => 25],
            ['name' => 'Debugging',           'category' => 'Software Development', 'level' => 92, 'sort_order' => 26],

            // Frontend Technologies
            ['name' => 'HTML5',               'category' => 'Frontend Technologies', 'level' => 85, 'sort_order' => 27],
            ['name' => 'CSS3',                'category' => 'Frontend Technologies', 'level' => 80, 'sort_order' => 28],
            ['name' => 'JavaScript (ES6+)',   'category' => 'Frontend Technologies', 'level' => 82, 'sort_order' => 29],
            ['name' => 'React.js',            'category' => 'Frontend Technologies', 'level' => 85, 'sort_order' => 30],
            ['name' => 'jQuery',              'category' => 'Frontend Technologies', 'level' => 80, 'sort_order' => 31],
            ['name' => 'Bootstrap 5',         'category' => 'Frontend Technologies', 'level' => 85, 'sort_order' => 32],
            ['name' => 'Tailwind CSS',        'category' => 'Frontend Technologies', 'level' => 88, 'sort_order' => 33],
            ['name' => 'Responsive Design',   'category' => 'Frontend Technologies', 'level' => 80, 'sort_order' => 34],

            // Tools & Platforms
            ['name' => 'Git',                 'category' => 'Tools & Platforms', 'level' => 85, 'sort_order' => 35],
            ['name' => 'Composer',            'category' => 'Tools & Platforms', 'level' => 86, 'sort_order' => 36],
            ['name' => 'npm',                 'category' => 'Tools & Platforms', 'level' => 80, 'sort_order' => 37],
            ['name' => 'Vite',                'category' => 'Tools & Platforms', 'level' => 79, 'sort_order' => 38],
            ['name' => 'Postman',             'category' => 'Tools & Platforms', 'level' => 85, 'sort_order' => 39],
            ['name' => 'Insomnia',            'category' => 'Tools & Platforms', 'level' => 80, 'sort_order' => 40],
            ['name' => 'Swagger',             'category' => 'Tools & Platforms', 'level' => 82, 'sort_order' => 41],
            ['name' => 'CLI',                 'category' => 'Tools & Platforms', 'level' => 84, 'sort_order' => 42],
            ['name' => 'Linux',               'category' => 'Tools & Platforms', 'level' => 78, 'sort_order' => 43],
            ['name' => 'Apache',              'category' => 'Tools & Platforms', 'level' => 75, 'sort_order' => 44],

            // Best Practices
            ['name' => 'Security Implementation',  'category' => 'Best Practices', 'level' => 88, 'sort_order' => 45],
            ['name' => 'Performance Optimization', 'category' => 'Best Practices', 'level' => 90, 'sort_order' => 46],
            ['name' => 'Technical Documentation',  'category' => 'Best Practices', 'level' => 85, 'sort_order' => 47],

            // Leadership
            ['name' => 'Team Mentoring',              'category' => 'Leadership', 'level' => 85, 'sort_order' => 48],
            ['name' => 'Project Management',          'category' => 'Leadership', 'level' => 82, 'sort_order' => 49],
            ['name' => 'Cross-functional Collaboration', 'category' => 'Leadership', 'level' => 85, 'sort_order' => 50],
            ['name' => 'Client Communication',        'category' => 'Leadership', 'level' => 88, 'sort_order' => 51],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }

        // ── Experiences ─────────────────────────────────────────────────
        $experiences = [
            [
                'position'    => 'Sr PHP Developer',
                'company'     => 'RG InfoTech (Recursive Global InfoTech Pvt. Ltd.), Jaipur',
                'description' => 'Designed, developed, and maintained 6-7 scalable web applications using PHP and Laravel framework, ensuring 100% alignment with client requirements and technical specifications. Led full-stack backend development efforts across multiple concurrent projects while maintaining strict code quality standards and documentation. Engineered and deployed RESTful APIs for seamless third-party service and payment gateway integrations, enhancing system interoperability. Conducted comprehensive code reviews and mentored junior developers on Laravel best practices, design patterns, and system architecture. Implemented coding standards and best practices across team, resulting in improved code maintainability and reduced technical debt. Identified and executed process improvements that increased team productivity by optimizing development workflows and CI/CD practices.',
                'start_date'  => 'Jan 2024',
                'end_date'    => 'Mar 2025',
                'is_current'  => false,
                'technologies' => ['PHP', 'Laravel', 'MySQL', 'RESTful APIs', 'Payment Gateway', 'CI/CD'],
            ],
            [
                'position'    => 'Senior Software Engineer',
                'company'     => 'SimplifyVMS, Noida',
                'description' => 'Served as key backend engineer for large-scale Vendor Management System (VMS) handling complex business logic and high transaction volumes. Engineered optimized backend services emphasizing high performance, scalability, security, and fault tolerance for enterprise-level operations. Architected database schemas and optimized queries to improve system performance by 30%, supporting millions of vendor records. Collaborated with cross-functional teams (frontend, QA, DevOps) to integrate backend systems with user-facing applications and ensure seamless functionality. Provided technical guidance, code reviews, and mentorship to development team members on architecture and implementation strategies. Managed multiple projects simultaneously while maintaining strict deadlines and delivering consistently high-quality code. Conducted comprehensive testing, debugging, and troubleshooting across production systems, ensuring 99.5% uptime.',
                'start_date'  => 'Jun 2022',
                'end_date'    => 'Dec 2023',
                'is_current'  => false,
                'technologies' => ['PHP', 'Laravel', 'MySQL', 'RESTful APIs', 'Agile', 'DevOps'],
            ],
            [
                'position'    => 'Software Engineer III',
                'company'     => 'Matellio Inc., Jaipur',
                'description' => 'Functioned as key backend developer contributing to development and maintenance of mission-critical client projects using PHP and related technologies. Developed and integrated RESTful APIs for seamless data exchange between client systems and third-party platforms. Actively participated in code reviews, technical design discussions, and agile ceremonies while adhering to strict development methodologies. Consistently met aggressive project deadlines through effective time management, prioritization, and proactive communication. Analyzed complex technical requirements and proposed optimized solutions aligned with business objectives and technical constraints.',
                'start_date'  => 'Nov 2021',
                'end_date'    => 'Jun 2022',
                'is_current'  => false,
                'technologies' => ['PHP', 'Laravel', 'MySQL', 'RESTful APIs', 'Agile'],
            ],
            [
                'position'    => 'Sr. Web Developer',
                'company'     => 'Appinop Technologies, Jaipur',
                'description' => 'Developed custom modules, features, and extensions for diverse web applications utilizing PHP frameworks across multiple industry verticals. Contributed to database design and optimization initiatives resulting in improved application performance and reduced load times. Enhanced website security by identifying and addressing vulnerabilities, implementing encryption protocols, and following secure coding practices. Collaborated with project managers and clients to understand requirements and translate them into scalable technical solutions.',
                'start_date'  => 'Apr 2021',
                'end_date'    => 'Nov 2021',
                'is_current'  => false,
                'technologies' => ['PHP', 'MySQL', 'Security', 'Database Optimization'],
            ],
            [
                'position'    => 'PHP Developer',
                'company'     => 'The NineHertz, Jaipur',
                'description' => 'Developed responsive web applications primarily using Yii 1 framework with practical exposure to CakePHP, MongoDB, WordPress, and Lumen. Contributed to both frontend and backend development across diverse projects, demonstrating full-stack capabilities. Implemented responsive web design and optimization techniques, improving user experience metrics and page load performance. Coded using HTML5, CSS3, JavaScript, jQuery, and Bootstrap to create dynamic, user-friendly interfaces.',
                'start_date'  => 'May 2019',
                'end_date'    => 'Nov 2020',
                'is_current'  => false,
                'technologies' => ['PHP', 'Yii', 'CakePHP', 'MongoDB', 'WordPress', 'Lumen', 'JavaScript', 'Bootstrap'],
            ],
            [
                'position'    => 'PHP Developer',
                'company'     => 'Yellow Objects Solutions Pvt. Ltd., Jaipur',
                'description' => 'Developed and maintained multiple PHP-based web applications according to project requirements and client specifications. Optimized server-side code and database queries to enhance application performance and system efficiency. Wrote clean, well-documented server-side and client-side code using PHP, HTML5, CSS3, and JavaScript.',
                'start_date'  => 'Feb 2018',
                'end_date'    => 'Mar 2019',
                'is_current'  => false,
                'technologies' => ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
            ],
            [
                'position'    => 'Associate Web Developer',
                'company'     => 'Blueberry Softech Private Limited, Ajmer',
                'description' => 'Developed web-based applications using PHP, MySQL, AJAX, and CodeIgniter framework. Created intuitive user interfaces using HTML5, CSS3, and Bootstrap framework. Assisted senior developers in development tasks, debugging, and testing, gaining experience across full development lifecycle. Mentored junior developers, fostering collaborative learning environment and knowledge sharing within the development team.',
                'start_date'  => 'Sep 2015',
                'end_date'    => 'Sep 2017',
                'is_current'  => false,
                'technologies' => ['PHP', 'MySQL', 'CodeIgniter', 'AJAX', 'HTML5', 'CSS3', 'Bootstrap'],
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
        $csvPath = public_path('assets/docs/projects.csv');
        if (file_exists($csvPath)) {
            $handle = fopen($csvPath, 'r');
            $header = fgetcsv($handle); // Skip header

            $i = 1;
            while (($row = fgetcsv($handle)) !== false) {
                $data = array_combine($header, $row);

                // Skip entries with "test" or empty names if any
                if (empty($data['Name']) || str_contains(strtolower($data['Name']), 'test')) {
                    continue;
                }

                $title = str_replace('-', ' ', ucwords($data['Name'], '-'));
                $description = !empty($data['Description']) ? $data['Description'] : $title;

                // Build conventional image URL
                $imageUrl = "https://raw.githubusercontent.com/aadhar41/{$data['Name']}/master/public/{$data['Name']}.png";

                Project::create([
                    'title'            => $title,
                    'description'      => $description,
                    'long_description' => $description,
                    'image'            => $imageUrl,
                    'live_url'         => !empty($data['Website']) ? $data['Website'] : null,
                    'github_url'       => $data['URL'],
                    'technologies'     => [$data['Language']],
                    'category'         => (str_contains(strtolower($data['Name']), 'api') || str_contains(strtolower($description), 'api')) ? 'api' : 'web',
                    'featured'        => (int)$data['Stars'] >= 2,
                    'sort_order'       => $i++,
                ]);
            }
            fclose($handle);
        } else {
            // Fallback to minimal static content if CSV is missing
            Project::create([
                'title'        => 'Portfolio Project',
                'description'  => 'Automated import failed. CSV not found.',
                'technologies' => ['PHP', 'Laravel'],
                'category'     => 'web',
                'featured'     => true,
            ]);
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
