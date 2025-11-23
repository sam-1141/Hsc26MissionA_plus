<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\CalculatorController;
use App\Http\Controllers\AdminLectureController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Student\Hsc26MapRegistrationController;
use App\Http\Controllers\Student\VideoController;
use App\Http\Controllers\Admin\ExamInfoController;
use App\Http\Controllers\LiveExamController;
use \App\Http\Controllers\Admin\VideoSettingController;

// Admin panel
Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->controller(VideoSettingController::class)
    ->group(function () {

        Route::get('/video-settings', 'edit')->name('show.video.settings');
        Route::post('/video-settings', 'update')->name('store.video.settings');
        Route::get('/dashboard', 'showStudentDashboard')->name('student.dashboard');

    });





Route::get('/', function () {
    return redirect()->route('auth.registration.form');
})->name('root');



Route::controller(AuthController::class)->group(function () {
    Route::get("/HscMisssionA+/registration", "loadRegistrationForm")
        ->name("auth.registration.form");

    Route::get('/login', 'loadLoginForm')
        ->name('auth.login');

    Route::post('/login', 'login')
        ->name('auth.login.post');

    Route::post('/logout', 'logout')
        ->name('auth.logout');
});


Route::controller(Hsc26MapRegistrationController::class)->group(function () {

    Route::post('/register', 'store')
        ->name('execute.auth.hsc26mapregistration');

    Route::get('/registration-success', 'showSuccess')
        ->name('registration.success');

    Route::get('/admit-card', 'admitCard')
        ->name('admit.card');
});

Route::get('/student/video', [VideoController::class, 'show'])->name('student.video');


Route::get('/exam-info', [ExamInfoController::class, 'show'])->name('exam.info');
   





// 🚫 Error pages

Route::get('/forbidden', function () {
    abort(403);
})->name('error.forbidden');

