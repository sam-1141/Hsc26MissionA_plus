<?php

namespace App\Http\Controllers;

use App\Models\LiveExam;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
}
