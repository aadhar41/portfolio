<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Setting extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'settings';

    protected $fillable = [
        'key',
        'value',
        'type',
        'section',
        'group',
        'label',
        'placeholder',
        'icon',
        'class',
        'options',
        'default',
        'required',
        'visible',
        'editable',
        'deletable',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected $casts = [
        'deleted_at' => 'datetime',
    ];
}
