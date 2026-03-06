<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $table = 'experiences';

    protected $fillable = [
        'is_active',
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
        'is_active'    => 'boolean',
        'technologies' => 'array',
    ];
}
