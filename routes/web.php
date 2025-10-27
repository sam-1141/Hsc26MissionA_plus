<?php

use App\Http\Controllers\Admin\AdminLeaderboardController;
use App\Http\Controllers\Admin\LiveExamController;
use App\Http\Controllers\Admin\ResultController;
use App\Http\Controllers\Admin\PractiseExamController;
use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\ProgressReportController;
use App\Http\Controllers\Student\PracticeExamController;
use App\Http\Controllers\Student\StudentLeaderboardController;
use App\Http\Controllers\Student\StudentLiveExamController;
use App\Http\Controllers\TrialExamController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HardnessController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\MaterialsController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\Student\Hsc26MapRegistrationController;
use Inertia\Inertia;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\CalculatorController;

Route::post('/progress/start', [ProgressController::class, 'apiStartProgress'])
    ->name('progress.apiStart')
    ->middleware('auth'); // ensure user is logged in



Route::post('/api/toggle-lecture', [ProgressController::class, 'apiToggleLecture'])
    ->name('toggleLecture')
    ->middleware('auth');


Route::middleware(['auth'])->group(function () {
    Route::post('/fresh-start', [CalculatorController::class, 'freshStart'])
        ->name('fresh-start');
});

use App\Http\Controllers\AdminLectureController;

Route::middleware(['auth'])->group(function () {
    Route::get('/admin/lectures', [AdminLectureController::class, 'index'])->name('admin.lectures');
    Route::post('/admin/lectures', [AdminLectureController::class, 'store'])->name('admin.lectures.store');
});



Route::middleware(['auth'])->group(function () {
    Route::get('/progress', [ProgressController::class, 'getStudentProgress'])->name('student.progress');
});


Route::middleware(['auth'])->get('/check-auth', function () {
    return response()->json(auth()->user(), 200, [
        'Cache-Control' => 'no-cache, no-store, must-revalidate',
        'Pragma' => 'no-cache',
        'Expires' => '0',
    ]);
});

Route::middleware('auth')->post('/api/toggle-lecture', [ProgressController::class, 'apiToggleLecture'])->name('toggle.lecture');



Route::get('/lectures/{chapter}', [App\Http\Controllers\ChapterLectureController::class, 'getLectures']);

Route::get('/forbidden', function () {
    abort(403);
})->name('error.forbidden');




Route::get('/check-auth', function () {
    return auth()->user();
});



Route::middleware('auth')->group(function () {
    Route::get('/calculator', [CalculatorController::class, 'show'])->name('calculator.show');
    Route::post('/calculator', [CalculatorController::class, 'calculate'])->name('calculator.calculate');
});


Route::get('/test-progress', [ProgressController::class, 'getStudentProgress'])->middleware('auth');



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard'); 
})->name('dashboard')->middleware('auth');



Route::controller(AuthController::class)->group(function () {

    Route::get("/login", "loadLoginForm")->name("auth.login");
    Route::post("/login", "login")->name("execute.auth.login");
    Route::get('/logout', 'logout')->name('auth.logout');
    
    
   
});
