<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Hsc26MapRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
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
            'Hsc_Batch' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'hsc26Mission' => 'required|string',
            'achieved_mark' => 'nullable|integer',
        ]);

        $baseString = $validated['mobile'].'|'.($validated['email'] ?? Str::random(6));

        $hash = substr(md5($baseString), 0, 6);

        $validated['unique_key_hscmap26'] = 'FT_'.strtoupper($hash); // e.g. FT_A9C4F2

        $registration = Hsc26MapRegistration::create($validated);

        return Inertia::render('Student/RegistrationSuccess', [
            'registration' => $registration,
        ]);
    }

    public function admitCard($key)
    {
        $registration = Hsc26MapRegistration::where('unique_key_hscmap26', $key)->firstOrFail();

        return Inertia::render('Student/AdmitCard', [
            'registration' => $registration,
        ]);
    }
}
