<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Progresses;
use App\Models\ChapterLecture;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProgressController extends Controller
{
    public function getStudentProgress()
    {   

        $student_id = Auth()->id(); // 
       
      
      
        // Fetch all progress entries for this student
        $progresses = Progresses::where('student_id', $student_id)->get();
    
        // Group by subject
        $grouped = $progresses->groupBy('subject')->map(function ($subjectProgresses) {
            return $subjectProgresses->map(function ($progress) {
                return [
                    'chapter' => $progress->chapter,
                    'lectures' => $progress->lectures,
                    'duration_days' => $progress->duration_days,
                    'remaining_days' => max(0, $progress->duration_days - (now()->diffInHours($progress->created_at) / 24)),
                ];
            })->values()->toArray();
        })->toArray();
       
        // Add lecture links from chapter_lectures table
        foreach ($grouped as $subject => &$chapters) {
            foreach ($chapters as &$chapter) {
                $chapterName = $chapter['chapter'];
                $lectureRows = ChapterLecture::where('chapter', $chapterName)->get();

                $chapter['lectures_list'] = $lectureRows->groupBy('lecture_number')->map(function ($lectures, $num) {
                    return [
                        'lecture_number' => $num,
                        'links' => $lectures->pluck('lecture_link')->toArray(),
                    ];
                })->values()->toArray();
            }
        }
    
       

        // Return via Inertia
        return Inertia::render('ProgressDashboard', [
            'progressData' => [
                'student_id' => $student_id,
                'subjects' => $grouped,
            ],
        ]);
    }
}
