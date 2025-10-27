<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ChapterLecture;

class ChapterLecturesSeeder extends Seeder
{
    public function run()
    {
        // Load subjects from config
        $subjects = config('student_subjects');

        foreach ($subjects as $chapters) {
            foreach ($chapters as $chapterName => $chapterInfo) {
                for ($i = 1; $i <= $chapterInfo['lectures']; $i++) {
                    ChapterLecture::create([
                        'chapter' => $chapterName,
                        'lecture_number' => $i,
                        'lecture_link' => "$chapterName Lecture $i",
                    ]);
                }
            }
        }
    }
}
