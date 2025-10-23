<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\ChapterLecture;
use App\Models\StudentLectureProgress;

class StudentLectureProgressSeeder extends Seeder
{
    public function run(): void
    {
        // Get all students
        $students = User::all();


        // Get all chapter lectures
        $lectures = ChapterLecture::all();

        foreach ($students as $student) {
            foreach ($lectures as $lecture) {
                // Create progress if it doesn't exist
                StudentLectureProgress::firstOrCreate([
                    'student_id' => $student->id,
                    'subject' => $lecture->subject ?? 'default', // if subject column exists
                    'chapter' => $lecture->chapter,
                    'lecture_number' => $lecture->lecture_number,
                ], [
                    'status_of_completion' => false,
                ]);
            }
        }
    }
}
