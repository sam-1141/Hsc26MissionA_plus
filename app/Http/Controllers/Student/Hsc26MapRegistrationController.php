<?php

namespace App\Http\Controllers\Student;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Hsc26MapRegistration;
use Inertia\Inertia;

class Hsc26MapRegistrationController extends Controller
{
    public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'mobile' => 'required|string|max:20',
        'fb_id' => 'nullable|string|max:255',
        'college' => 'required|string|max:255',
        'eiin' => 'nullable|string|max:50',
        'course' => 'required|string|max:255',
        'email' => 'nullable|email|max:255',
        'feedback' => 'nullable|string',
        'hsc26Mission' => 'required|boolean',
        'achieved_mark' => 'nullable|integer',
    ]);

    $baseString = $validated['mobile'] . '|' . ($validated['email'] ?? Str::random(6));

    $hash = substr(md5($baseString), 0, 6); 

    $validated['unique_key_hscmap26'] = 'FT_' . strtoupper($hash); // e.g. FT_A9C4F2

    $registration =Hsc26MapRegistration::create($validated);

    return redirect()->back()
        ->with('success', 'Registration successful!')
        ->with('data', $registration);
}
}
