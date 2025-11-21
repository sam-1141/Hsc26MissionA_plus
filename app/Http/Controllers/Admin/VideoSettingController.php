<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VideoSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth; 

class VideoSettingController extends Controller
{
    public function edit()
    {
        if (!Auth::check()) {
            return back()->with('error', 'You must be logged in.');
        }
        $user = auth()->user();
        if ($user->role == 'admin') {
            
            $setting = VideoSetting::latest('updated_at')->first();

            return Inertia::render('Admin/VideoSettingEdit', [
                'setting' => $setting
            ]);
        } else {
            return redirect()->route('auth.login');

        }
    }

    public function update(Request $request)
    {
        $user = auth()->user();
        if ($user->role == 'admin'){
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'video_url' => 'required|url',
            'message' => 'nullable|string',
            'purchase_link' => 'nullable|url',
            'deadline' => 'nullable|date',
            'exam_description_bn' => 'nullable|string',
            'exam_url' => 'nullable|url',
        ]);

        $setting = VideoSetting::latest('updated_at')->first();


        if ($setting) {
            $setting->update($validated);
        } else {
            VideoSetting::create($validated);
        }

        return back()->with('success', 'Video settings updated successfully!');
    }
    else{
        return redirect()->route('auth.login');

    }
    }
}
