<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Hsc26MapRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\VideoSetting;
use Illuminate\Support\Facades\Config;

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

        // Get the latest exam info
        $exam = VideoSetting::select('exam_description_bn', 'exam_url','title','video_url')
            ->latest('updated_at')
            ->first();

        // App base URL (works in dev and production)
        $appUrl = rtrim(config('app.url'), '/');

        // Generate full exam info URL
        $examInfoUrl = $appUrl . route('exam.info', [], false);
        $reg_link = $appUrl . route('auth.registration.form', [], false);
        $promo_page = $appUrl . route('student.video', [], false);

        return Inertia::render('Student/AdmitCard', [
            'registration' => $registration,
            'exam' => $exam,
            'examInfoUrl' => $examInfoUrl,
            'reg_link' =>$reg_link,
            'promo_page' =>$promo_page,
        ]);
    }
}
