<?php

namespace App\Http\Controllers;

use App\Models\ChapterLecture;
use App\Models\Progresses;
use App\Models\StudentLectureProgress;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProgressController extends Controller
{
    /**
     * Optimized: Fetch all lecture completion statuses in one query
     */
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

                return [
                    'chapter' => $chapterName,
                    'lectures' => $progress->lectures,
                    'duration_days' => $progress->duration_days,
                    'remaining_days' => max(0, $progress->duration_days - (now()->diffInHours($progress->created_at) / 24)),
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

    if (!$progress) {
        return response()->json([
            'success' => false,
            'message' => 'Lecture not found',
        ], 404);
    }

    // Toggle completion
    $progress->status_of_completion = $request->boolean('status_of_completion');
    $progress->save();


    return response()->json([
        'success' => true,
        'status_of_completion' => $progress->status_of_completion,
        'lecture' => $progress,
    ]);
}

}
