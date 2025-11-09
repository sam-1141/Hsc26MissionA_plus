<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\CalculatorController;
use App\Http\Controllers\AdminLectureController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Student\Hsc26MapRegistrationController;
use App\Http\Controllers\Student\VideoController;



// 🏠 Root route — redirect to login if unauthenticated, otherwise dashboard
Route::get('/', function () {
    return auth()->check()
        ? redirect()->route('dashboard')
        : redirect()->route('auth.registration.form');
})->name('root');



// 📊 Progress tracking

Route::post('/progress/start', [ProgressController::class, 'apiStartProgress'])
    ->name('progress.apiStart')
    ->middleware('auth'); 



Route::post('/api/toggle-lecture', [ProgressController::class, 'apiToggleLecture'])
    ->name('toggleLecture')
    ->middleware('auth');


Route::middleware(['auth'])->group(function () {
    Route::get('/progress', [ProgressController::class, 'getStudentProgress'])->name('student.progress');
});


Route::middleware('auth')->post('/api/toggle-lecture', [ProgressController::class, 'apiToggleLecture'])->name('toggle.lecture');

// 🧮 Calculator routes (for students)


Route::middleware('auth')->group(function () {
    Route::get('/calculator', [CalculatorController::class, 'show'])->name('calculator.show');
    Route::post('/calculator', [CalculatorController::class, 'calculate'])->name('calculator.calculate');
});



Route::middleware(['auth'])->group(function () {
    Route::post('/fresh-start', [CalculatorController::class, 'freshStart'])
        ->name('fresh-start');
});
// 🧭 Dashboard


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard'); 
})->name('dashboard')->middleware('auth');

// 🔐 Authentication


Route::controller(AuthController::class)->group(function () {
    // route for load login form
    Route::get("/HscMisssionA+/login", "loadLoginForm")->name("auth.login");
    Route::get('/logout', 'logout')->name('auth.logout');
    // route for load forgot passwordForm
    Route::get("/auth/forgot-password", "loadForgotPasswordForm")->name('auth.forgot.password');
    // route for load registration form
    Route::get("/HscMisssionA+/registration", "loadRegistrationForm")->name("auth.registration.form");
Route::post('/register', [Hsc26MapRegistrationController::class, 'store'])
     ->name('execute.auth.hsc26mapregistration');
Route::get('/admit-card/{key}', [Hsc26MapRegistrationController::class, 'admitCard'])->name('admit.card');
Route::get('/student/video', [VideoController::class, 'show'])->name('student.video');


   
});
// 🚫 Error pages

Route::get('/forbidden', function () {
    abort(403);
})->name('error.forbidden');

// 🧑‍🏫 Admin: Manage lectures

Route::middleware(['auth'])->group(function () {
    Route::get('/admin/lectures', [AdminLectureController::class, 'index'])->name('admin.lectures');
    Route::post('/admin/lectures', [AdminLectureController::class, 'store'])->name('admin.lectures.store');
});

// Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
//     Route::get('video-settings', [\App\Http\Controllers\Admin\VideoSettingController::class, 'edit']);
//     Route::post('video-settings', [\App\Http\Controllers\Admin\VideoSettingController::class, 'update']);
// });
// Route::middleware('auth')->group(function () {
//     Route::get('/video-settings', [\App\Http\Controllers\Admin\VideoSettingController::class, 'edit']);
//     Route::post('/video-settings', [\App\Http\Controllers\Admin\VideoSettingController::class, 'update']);
// });

Route::get('/video-settings', [\App\Http\Controllers\Admin\VideoSettingController::class, 'edit']);
Route::post('/video-settings', [\App\Http\Controllers\Admin\VideoSettingController::class, 'update']);
