<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Progresses;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ProgressController extends Controller
{
    public function getStudentProgress($student_id)
    {
        // Fetch all progress entries for this student
        $progresses = Progresses::where('student_id', $student_id)->get();

        // Group by subject
        $grouped = $progresses->groupBy('subject')->map(function ($subjectGroup) {
            return $subjectGroup->map(function ($item) {
                $created = Carbon::parse($item->created_at);
                $today = Carbon::today();
                $daysPassed = $created->diffInDays($today);

                $remainingDays = max($item->duration_days - $daysPassed, 0); // Never negative

                return [
                    'chapter' => $item->chapter,
                    'lectures' => $item->lectures,
                    'duration_days' => $item->duration_days,
                    'remaining_days' => $remainingDays,
                ];
            });
        });
        \Log::info('Progress response:', $grouped);
        return response()->json([
            'student_id' => $student_id,
            'subjects' => $grouped,
        ]);
    }
}

