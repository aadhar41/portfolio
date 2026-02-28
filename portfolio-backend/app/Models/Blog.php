<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Blog extends Model
{
    use HasFactory;

    protected $table = 'blogs';

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'cover_image',
        'tags',
        'status',
        'published_at',
        'read_time',
    ];

    protected $casts = [
        'tags'         => 'array',
        'published_at' => 'datetime',
        'read_time'    => 'integer',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($blog) {
            if (!$blog->slug) {
                $blog->slug = Str::slug($blog->title);
            }
        });
    }
}
