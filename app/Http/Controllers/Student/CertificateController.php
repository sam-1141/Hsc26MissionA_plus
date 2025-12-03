<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Hsc26MapRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\VideoSetting;
use Illuminate\Support\Facades\Config;

class CertificateController extends Controller
{
    public function show($mobile)
    {
        // Find the registration by mobile
        $reg = Hsc26MapRegistration::where('mobile', $mobile)->firstOrFail();

        // Generate random certificate ID based on mobile + timestamp
        $certId = 'FT-' . date('Y') . '-' . substr($reg->mobile, -4) . '-' . rand(100, 999);

        // Prepare data for Inertia
        $data = [
            'name' => $reg->name,
            'upazilla' => $reg->college,   // College as upazilla
            'cert_id' => $certId,
            'date' => now()->format('d F Y'),
        ];

        // Render the JSX page with Inertia
        return Inertia::render('Student/Exam/LiveExam/Certificate/Certificate', $data);
    }
}