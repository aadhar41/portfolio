<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Project;

class AdminApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test successful login.
     */
    public function test_user_can_login()
    {
        $this->withoutExceptionHandling();
        $user = User::factory()->create([
            'email'    => 'test@example.com',
            'password' => 'password123',
            'role'     => 'admin',
        ]);

        $response = $this->postJson('/api/v1/login', [
            'email'    => 'test@example.com',
            'password' => 'password123',
        ]);

        if ($response->status() !== 200) {
            fwrite(STDERR, $response->getContent());
        }

        $response->assertStatus(200)
            ->assertJsonStructure(['token', 'user']);
    }

    /**
     * Test multi-user role access (Admin vs Guest).
     */
    public function test_unauthorized_users_cannot_access_admin_endpoints()
    {
        $response = $this->putJson('/api/v1/admin/profile/1', ['name' => 'New Name']);
        $response->assertStatus(401);
    }

    /**
     * Test CRUD operations for Projects.
     */
    public function test_admin_can_create_project()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user, 'sanctum');

        $projectData = [
            'title'        => 'New Project',
            'description'  => 'A test project',
            'category'     => 'web',
            'technologies' => ['PHP', 'Laravel'],
        ];

        $response = $this->postJson('/api/v1/admin/projects', $projectData);

        $response->assertStatus(201)
            ->assertJsonPath('title', 'New Project');

        $this->assertDatabaseHas('projects', ['title' => 'New Project']);
    }

    /**
     * Test Admin can delete a project.
     */
    public function test_admin_can_delete_project()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user, 'sanctum');

        $project = Project::create([
            'title'        => 'Delete Me',
            'description'  => 'I am a goner',
            'category'     => 'web',
            'technologies' => ['React'],
        ]);

        $response = $this->deleteJson("/api/v1/admin/projects/{$project->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    }
}
