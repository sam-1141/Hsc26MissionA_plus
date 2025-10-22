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
// Route::middleware(['auth'])->get('/progress-json', [ProgressController::class, 'getStudentProgress']);

// Route::post('/register', [Hsc26MapRegistrationController::class, 'store'])
//      ->name('execute.auth.hsc26mapregistration');
Route::get('/', function () {
    return redirect()->route('auth.login');
});



// Route::get('/progress/{student_id}', [ProgressController::class, 'getStudentProgress']);

Route::middleware(['auth'])->group(function () {
    Route::get('/progress', [ProgressController::class, 'getStudentProgress'])->name('student.progress');
});


// Route::middleware(['auth'])->get('/progress', [ProgressController::class, 'getStudentProgress'])
//     ->name('progress.dashboard');
Route::get('/lectures/{chapter}', [App\Http\Controllers\ChapterLectureController::class, 'getLectures']);

Route::get('/forbidden', function () {
    abort(403);
})->name('error.forbidden');


use App\Http\Controllers\CalculatorController;

Route::get('/check-auth', function () {
    return auth()->user();
});



Route::middleware('auth')->group(function () {
    Route::get('/calculator', [CalculatorController::class, 'show'])->name('calculator.show');
    Route::post('/calculator', [CalculatorController::class, 'calculate'])->name('calculator.calculate');
});


Route::middleware(['web'])->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::get("/login", "loadLoginForm")->name("auth.login");
        Route::get('/logout', 'logout')->name('auth.logout');
        Route::post('/login', [AuthController::class, 'login'])->name('auth.login.post');

    });
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard'); // assumes you have a React/Vue component at resources/js/Pages/Dashboard.jsx
})->name('dashboard')->middleware('auth');


// Route::controller(AuthController::class)->group(function () {
//     // route for load login form
//     Route::get("auth/login", "loadLoginForm")->name("auth.login");
//     Route::get('/logout', 'logout')->name('auth.logout');


//     // #=== Post Routes ===#
//     // // route for login
//     Route::post("/auth/login", "login")->name("auth.login");

// });
