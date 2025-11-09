<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VideoSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VideoSettingController extends Controller
{
    public function edit()
    {
        $setting = VideoSetting::first();
        return Inertia::render('Admin/VideoSettingEdit', [
            'setting' => $setting
        ]);
    }

    public function update(Request $request)
{
    $validated = $request->validate([
        'title' => 'nullable|string|max:255',
        'video_url' => 'required|url',
        'message' => 'nullable|string',
        'purchase_link' => 'nullable|url',
    ]);

    $setting = VideoSetting::first();
    if ($setting) {
        $setting->update($validated);
    } else {
        VideoSetting::create($validated);
    }

    return back()->with('success', 'Video settings updated successfully!');
}

}
