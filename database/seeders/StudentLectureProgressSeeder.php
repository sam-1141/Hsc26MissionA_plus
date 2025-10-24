<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\StudentLectureProgress;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class StudentLectureProgressSeeder extends Seeder
{
    public function run(): void
    {
        // Clear the table first
        DB::table('student_lecture_progress')->truncate();

        $students = User::all();

        $subjects = [
            'Chemistry | Restart - HSC 2026' => [
                'অধ্যায় ২ : জৈব রসায়ন' => ['lectures' => 22, 'duration_days' => 30],
                'অধ্যায় ৪ : তড়িৎ রসায়ন' => ['lectures' => 8, 'duration_days' => 12],
            ],
            'Physics | Restart - HSC 2026' => [
                'অধ্যায় ২ : স্থির তড়িৎ' => ['lectures' => 7, 'duration_days' => 10],
                'অধ্যায় ৩ : চলতড়িৎ' => ['lectures' => 8, 'duration_days' => 14],
                'অধ্যায় ৪ : তড়িৎ চুম্বকত্ব' => ['lectures' => 8, 'duration_days' => 14],
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

        foreach ($students as $student) {
            foreach ($subjects as $subjectName => $chapters) {
                foreach ($chapters as $chapterName => $chapterInfo) {
                    for ($lectureNumber = 1; $lectureNumber <= $chapterInfo['lectures']; $lectureNumber++) {
                        StudentLectureProgress::create([
                            'student_id' => $student->id,
                            'subject' => $subjectName,
                            'chapter' => $chapterName,
                            'lecture_number' => $lectureNumber,
                            'status_of_completion' => 0,
                            'created_at' => Carbon::now(),
                            'updated_at' => Carbon::now(),
                        ]);
                    }
                }
            }
        }
    }
}
