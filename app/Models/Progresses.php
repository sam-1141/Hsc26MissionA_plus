<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Progresses extends Model
{
    protected $fillable = [
        'student_id',
        'subject',
        'chapter',
        'lectures',
        'duration_days',
    ];
}
