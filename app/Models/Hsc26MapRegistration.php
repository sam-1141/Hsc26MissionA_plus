<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hsc26MapRegistration extends Model
{
    
    use HasFactory;

    protected $fillable = [
    'unique_key_hscmap26',
    'name',
    'mobile',
    'fb_id',
    'college',
    'eiin',
    'course',
    'email',
    'feedback',
    'achieved_mark',
    'hsc26Mission',
];

}
