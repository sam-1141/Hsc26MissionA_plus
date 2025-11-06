<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class VideoController extends Controller
{
    public function show()
    {
        $videoUrl = 'https://www.youtube.com/watch?v=Rb8KGmv7w1w&list=PLh2EsjwYJx7vCRPkMoHFF6NJrErWCN9hj';
        return Inertia::render('Student/Hsc26Video', ['videoUrl' => $videoUrl]);
    }
}
