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
        $icons = [
            'php'         => 'fab fa-php',
            'laravel'     => 'fab fa-laravel',
            'yii'         => 'fas fa-layer-group',
            'codeigniter' => 'fas fa-fire',
            'lumen'       => 'fas fa-bolt',
            'cakephp'     => 'fas fa-birthday-cake',
            'wordpress'   => 'fab fa-wordpress',
            'mysql'       => 'fas fa-database',
            'mongodb'     => 'fas fa-leaf',
            'restful'     => 'fas fa-server',
            'api'         => 'fas fa-server',
            'git'         => 'fab fa-git-alt',
            'github'      => 'fab fa-github',
            'docker'      => 'fab fa-docker',
            'linux'       => 'fab fa-linux',
            'html5'       => 'fab fa-html5',
            'css3'        => 'fab fa-css3-alt',
            'javascript'  => 'fab fa-js-square',
            'jquery'      => 'fab fa-js',
            'bootstrap'   => 'fab fa-bootstrap',
            'react'       => 'fab fa-react',
            'node'        => 'fab fa-node-js',
            'python'      => 'fab fa-python',
            'aws'         => 'fab fa-aws',
            'figma'       => 'fab fa-figma',
            'vue'         => 'fab fa-vuejs',
            'angular'     => 'fab fa-angular',
            'security'    => 'fas fa-shield-alt',
            'agile'       => 'fas fa-running',
            'team'        => 'fas fa-users',
        ];

        $skills = Skill::all();

        foreach ($skills as $skill) {
            $key = strtolower(explode(' ', explode('/', $skill->name)[0])[0]);
            if (isset($icons[$key])) {
                $skill->update(['icon' => $icons[$key]]);
            } else {
                $skill->update(['icon' => 'fas fa-code']);
            }
        }
    }
}
