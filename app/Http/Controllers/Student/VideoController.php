<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class VideoController extends Controller
{
    public function show()
    {
        $videoUrl = 'https://www.youtube.com/watch?v=dyyjWrCKyWY';
        return Inertia::render('Student/Hsc26Video', ['videoUrl' => $videoUrl]);
    }
}
