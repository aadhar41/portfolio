<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class UploadTest extends TestCase
{
    use RefreshDatabase;

    public function test_upload_route_exists_and_works()
    {
        Storage::fake('public');

        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user, 'sanctum');

        $response = $this->postJson('/api/v1/admin/upload', [
            'file' => UploadedFile::fake()->image('test.jpg'),
            'folder' => 'test-uploads'
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('success', true);
    }
}
