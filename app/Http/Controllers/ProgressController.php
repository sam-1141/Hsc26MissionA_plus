<?php

namespace App\Http\Controllers;

use App\Models\ChapterLecture; // ✅ correct
use App\Models\Progresses;
use App\Models\StudentLectureProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProgressController extends Controller
{
    
    protected function getStudentLectureProgressMap($studentId)
    {


        // Fetch all lecture progress for the student
        $progressRecords = StudentLectureProgress::where('student_id', $studentId)->get();

        // Map as 'chapter_lectureNumber' => status
        $map = [];
        foreach ($progressRecords as $record) {
            $key = $record->chapter.'_'.$record->lecture_number;
            $map[$key] = $record->status_of_completion;
        }

        return $map;
    }

    /**
     * Fetch student progress grouped by subject with lecture links & completion status
     */
    public function getStudentProgress()
    {
        $student_id = Auth::id();

        // Fetch all progress entries for this student
        $progresses = Progresses::where('student_id', $student_id)->get();

        // Pre-fetch lecture completion statuses (optimization)
        $lectureStatusMap = $this->getStudentLectureProgressMap($student_id);

        // Group progresses by subject
        $grouped = $progresses->groupBy('subject')->map(function ($subjectProgresses) use ($lectureStatusMap) {
            return $subjectProgresses->map(function ($progress) use ($lectureStatusMap) {
                $chapterName = $progress->chapter;

                // Get all lecture links for this chapter
                $lectureRows = ChapterLecture::where('chapter', $chapterName)->get();

                $lecturesList = $lectureRows->groupBy('lecture_number')->map(function ($lectures, $num) use ($chapterName, $lectureStatusMap) {
                    $key = $chapterName.'_'.$num;
                    $status = $lectureStatusMap[$key] ?? false;

                    return [
                        'lecture_number' => $num,
                        'links' => $lectures->pluck('lecture_link')->toArray(),
                        'status_of_completion' => $status,
                    ];
                })->values()->toArray();
                // Assume $progress->created_at comes from DB
                $createdAt = $progress->created_at;

                // 1️⃣ Ensure both timestamps are in the same timezone
                $appTimezone = config('app.timezone', 'UTC');
                $createdAt = $createdAt->copy()->timezone($appTimezone);
                $now = now()->timezone($appTimezone);

                // 2️⃣ Calculate the end time
                $endTime = $createdAt->copy()->addDays($progress->duration_days);

               // 3️⃣ Calculate remaining seconds
                $remainingSeconds = max(0, $endTime->diffInSeconds($now, false));

                // 4️⃣ Convert to D:HH:MM:SS
                $days = floor($remainingSeconds / 86400);
                $hours = floor(($remainingSeconds % 86400) / 3600);
                $minutes = floor(($remainingSeconds % 3600) / 60);
                $seconds = $remainingSeconds % 60;

                $remainingTime = sprintf("%d:%02d:%02d:%02d", $days, $hours, $minutes, $seconds);

                return [
                    'chapter' => $chapterName,
                    'lectures' => $progress->lectures,
                    'duration_days' => $progress->duration_days,
                    'remaining_days' => $remainingTime,
                    'lectures_list' => $lecturesList,
                ];
            })->values()->toArray();
        })->toArray();
        // dump($grouped);

        // Return via Inertia
        return Inertia::render('ProgressDashboard', [
            'progressData' => [
                'student_id' => $student_id,
                'subjects' => $grouped,
            ],
        ]);
    }

    /**
     * Toggle lecture completion status for the logged-in student
     */
    public function apiToggleLecture(Request $request)
    {
        $request->validate([
            'subject' => 'required|string',
            'chapter' => 'required|string',
            'lecture_number' => 'required|integer',
        ]);

        $student_id = Auth::id();

        $progress = StudentLectureProgress::where('student_id', $student_id)
            ->where('subject', $request->subject)
            ->where('chapter', $request->chapter)
            ->where('lecture_number', $request->lecture_number)
            ->first();

        if (! $progress) {
            return response()->json(['success' => false, 'message' => 'Lecture not found'], 404);
        }

        $progress->status_of_completion = ! $progress->status_of_completion;
        $progress->save();

        return back();
    }
}
