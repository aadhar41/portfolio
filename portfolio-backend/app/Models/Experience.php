<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'company',
        'position',
        'description',
        'start_date',
        'end_date',
        'is_current',
        'technologies',
    ];

    protected $casts = [
        'is_current'   => 'boolean',
        'technologies' => 'array',
    ];
}
