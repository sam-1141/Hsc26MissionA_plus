<?php

namespace App\Http\Controllers;

use App\Models\StudentLectureProgress;
use App\Models\Progresses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CalculatorController extends Controller
{
    public function show()
    {
        // The syllabus data (can come from DB later)
        $subjects = [
            'Chemistry | Restart - HSC 2026' => [
                'অধ্যায় ২ : জৈব রসায়ন' => ['lectures' => 22, 'duration_days' => 30],
                'অধ্যায় ৪ : তড়িৎ রসায়ন' => ['lectures' => 8, 'duration_days' => 12],
            ],
            'Physics | Restart - HSC 2026' => [
                'অধ্যায় ২ : স্থির তড়িৎ' => ['lectures' => 7, 'duration_days' => 10],
                'অধ্যায় ৩ : চলতড়িৎ' => ['lectures' => 8, 'duration_days' => 14],
                'অধ্যায় ৪ : তড়িৎ চুম্বকত্ব' => ['lectures' => 8, 'duration_days' => 14], // not in your list, so left descriptive
                'অধ্যায় ৭  : ভৌত আলোকবিজ্ঞান' => ['lectures' => 6, 'duration_days' => 10],
                'অধ্যায় ৮ : আধুনিক পদার্থবিজ্ঞানের সূচনা' => ['lectures' => 5, 'duration_days' => 7],
            ],
            'Higher Math | Restart - HSC 2026' => [

                'অধ্যায় ৩ : জটিল সংখ্যা' => ['lectures' => 4, 'duration_days' => 6],
                'অধ্যায় ৪ : বহুপদী ও বহুপদী সমীকরণ' => ['lectures' => 4, 'duration_days' => 7],
                'অধ্যায় ৫ : দ্বিপদী বিস্তৃতি' => ['lectures' => 7, 'duration_days' => 8],
                'অধ্যায় ৬ : কণিক' => ['lectures' => 8, 'duration_days' => 12],
                'অধ্যায় ৭ : বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ' => ['lectures' => 3, 'duration_days' => 5],
            ],
            'Biology | Restart - HSC 2026' => [
                'অধ্যায় ৫ : শ্বাসক্রিয়া ও শ্বসন' => ['lectures' => 4, 'duration_days' => 5],
                'অধ্যায় ৬ : বর্জ্য ও নিষ্কাশন' => ['lectures' => 3, 'duration_days' => 6],
                'অধ্যায় ৭ : চলন ও অঙ্গচালনা' => ['lectures' => 5, 'duration_days' => 10],
                'অধ্যায় ৮ : সমন্বয় ও নিয়ন্ত্রণ' => ['lectures' => 7, 'duration_days' => 16],
                'অধ্যায় ৯ : মানব জীবনের ধারাবাহিকতা' => ['lectures' => 7, 'duration_days' => 12],
                'অধ্যায় ১০ : মানবদেহের প্রতিরক্ষা' => ['lectures' => 4, 'duration_days' => 9],
                'অধ্যায় ১১ : জীনতত্ত্ব ও বিবর্তন' => ['lectures' => 6, 'duration_days' => 10],
            ],
        ];

        return Inertia::render('Calculator', [
            'subjects' => $subjects,
        ]);
    }

    public function calculate(Request $request)
    {
        $selected = $request->input('selected', []); // nested object

        \Log::info('Selected payload', ['selected' => $selected]);

        $studentId = Auth::id();

        foreach ($selected as $subject => $chapters) {
            foreach ($chapters as $chapterName => $info) {
                Progresses::where([
                    'student_id' => $studentId,
                    'subject' => $subject,
                    'chapter' => $chapterName,
                ])->delete();

                Progresses::create([
                    'student_id' => $studentId,
                    'subject' => $subject,
                    'chapter' => $chapterName,
                    'lectures' => $info['lectures'] ?? 0,
                    'duration_days' => $info['duration_days'] ?? 0,
                ]);

            }
        }

        // calculate totals
        // $totalLectures = 0;
        // $totalDays = 0;
        // foreach ($selected as $chapters) {
        //     foreach ($chapters as $info) {
        //         $totalLectures += $info['lectures'] ?? 0;
        //         $totalDays += $info['duration_days'] ?? 0;
        //     }
        // }

        return redirect()->route('student.progress');
    }

    public function freshStart()
{
    $studentId = Auth::id();

    if (! $studentId) {
        return back()->with([
            'type' => 'error',
            'message' => 'Unauthorized access. Please log in first.',
        ]);
    }

    // Delete from Progresses
    $existingProgresses = Progresses::where('student_id', $studentId)->count();
    if ($existingProgresses > 0) {
        $deletedProgresses = Progresses::where('student_id', $studentId)->delete();
        \Log::info('Fresh start: deleted progress', [
            'student_id' => $studentId,
            'deleted_records' => $deletedProgresses,
        ]);
    } else {
        \Log::info('Fresh start: no progress records found', ['student_id' => $studentId]);
    }

    // Delete from StudentLectureProgress
    $existingLectures = StudentLectureProgress::where('student_id', $studentId)->count();
    if ($existingLectures > 0) {
        $deletedLectures = StudentLectureProgress::where('student_id', $studentId)->delete();
        \Log::info('Fresh start: deleted student lecture progress', [
            'student_id' => $studentId,
            'deleted_records' => $deletedLectures,
        ]);
    } else {
        \Log::info('Fresh start: no lecture progress records found', ['student_id' => $studentId]);
    }

    // Redirect back with success flash message
    return back();
}
}
