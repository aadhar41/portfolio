<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $table = 'projects';

    protected $fillable = [
        'is_active',
        'title',
        'description',
        'long_description',
        'image',
        'live_url',
        'github_url',
        'technologies',
        'category',
        'featured',
        'sort_order',
    ];

    protected $casts = [
        'technologies' => 'array',
        'featured'     => 'boolean',
        'sort_order'   => 'integer',
    ];
}
