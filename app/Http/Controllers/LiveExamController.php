<?php

namespace App\Http\Controllers;

use App\Models\LiveExam;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class LiveExamController extends Controller
{
    public function create()
{
    $latestExam = LiveExam::latest()->first();

    return Inertia::render('Admin/LiveExams/Create', [
        'exam' => $latestExam
    ]);
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'total_questions' => ['required', 'integer', 'min:1'],
            'has_negative_marks' => ['required', 'boolean'],
            'negative_marks_value' => ['nullable', 'numeric', 'min:0'],
            'total_marks' => ['nullable', 'integer', 'min:0'],
            'duration' => ['nullable', 'integer', 'min:1'],
            'start_time' => ['nullable', 'date'],
            'end_time' => ['nullable', 'date', 'after_or_equal:start_time'],
            'result_publish_time' => ['nullable', 'date'],
        ]);

        $validated['has_negative_marks'] = filter_var($validated['has_negative_marks'], FILTER_VALIDATE_BOOLEAN);


        LiveExam::create($validated);

        return redirect()
            ->route('live-exams.create')
            ->with('success', 'Live exam created successfully.');
    }

    public function loadViewExamDetails()
    {
        $exam = LiveExam::latest()->first();

        // $courseExam = DB::table('course_exam')
        //     ->where('exam_id', $exam->id)
        //     ->pluck('course_id')
        //     ->toArray();

        // $courseInfo = DB::connection('Webapp')
        //     ->table('courses')
        //     ->whereIn('id', $courseExam)
        //     ->get(['id','course_name']);

        // $examSubject = DB::table('exam_subject')
        //     ->where('exam_id', $exam->id)
        //     ->pluck('subject_id')
        //     ->toArray();

        // $subjectInfo = DB::connection('CoreDB')
        //     ->table('subjects')
        //     ->whereIn('id', $examSubject)
        //     ->get(['id', 'name']);

        $questions = DB::table('questions')
            ->select('questions.*')
            ->get();

    

        return Inertia::render('Admin/Exam/ViewDetails', [
            'exam' => [
                'id' => $exam->id,
                'name' => $exam->name,
                // 'courseInfo' => $courseInfo,//
                // 'subjectInfo' => $subjectInfo,//
                'slug' => $exam->slug,//
                'description' => $exam->description,
                'totalQuestions' => $exam->total_questions,
                'hasNegativeMarks' => $exam->has_negative_marks,
                'negativeMarksValue' => $exam->negative_marks_value,
                'totalMarks' => $exam->total_marks,
                'duration' => $exam->duration,
                // 'questionType' => $exam->question_type,//
                // 'privacy' => $exam->privacy,//
                // 'publishInstant' => $exam->publish,//
                'startTime' => optional($exam->start_time)->format('Y-m-d H:i'),
                'endTime' => optional($exam->end_time)->format('Y-m-d H:i'),
                'resultPublishTime' => optional($exam->result_publish_time)->format('Y-m-d H:i'),
                // 'examUrl' => $exam->exam_url,//
                // 'exam_type' => $exam->exam_type,//
            ],
            'examType' => "live",
            'questions' => $questions,
        ]);
    }
}
