<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    protected $table = 'skills';

    protected $fillable = [
        'is_active',
        'name',
        'category',
        'level',
        'sort_order',
    ];

    protected $casts = [
        'level'      => 'integer',
        'is_active'  => 'boolean',
        'sort_order' => 'integer',
    ];
}
