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
    $reg = Hsc26MapRegistration::where('mobile', $mobile)->firstOrFail();

    return Inertia::render('Student/Exam/LiveExam/Certificate/Certificate', [
        'name' => $reg->name,
        'college' => $reg->college,
        'date' => now()->format('d F Y'),
    ]);
}

}