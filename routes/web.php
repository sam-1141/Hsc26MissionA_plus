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
use App\Http\Controllers\Admin\LiveExamController;
use \App\Http\Controllers\Admin\VideoSettingController;



##############################################################################################################################################################


Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->controller(VideoSettingController::class)
    ->group(function () {

        Route::controller(LiveExamController::class)->group(function () {
            Route::post('/admin/live-exam/store', 'store')->name('execute.store.exam');
            Route::get('/admin/live-exam/list', 'showAllExam')->name('show.exam.list');
            Route::get('/admin/live-exams/{slug}', 'getSingleExam')->name('get.single.exam');
            Route::put('/admin/live-exams/{slug}', 'updateExam')->name('update.single.exam');
            Route::post('/admin/live-exams/questions', 'storeExamQuestion')->name('admin.exam.questions.store');
            Route::put('/admin/live-exams/questions/{id}/update', 'updateExamQuestion')->name('admin.exam.questions.update');
            Route::delete('/admin/live-exam/questions/{id}', 'destroyExamQuestion')->name('admin.exam.questions.destroy');
            Route::put('/exams/{id}/toggle-status', 'toggleExamStatus')->name('exams.status.toggle');
            Route::put('/exams/{id}/toggle-exam-type', 'toggleExamType')->name('exams.type.toggle');
            Route::get('/add-exam', 'loadAddExamPage')->name('admin.add.exam');
            Route::get('/add-exam/live-exam', 'loadAddLiveExamPage')->name('admin.add.live.exam');
//            Route::post('/add-exam/live-exam', 'loadAddLiveExamPage')->name('admin.add.live.exam');
            Route::get('/exams', 'loadViewExamDetails')->name('admin.exam.details');
            Route::post('/live-exam/reorder-questions', 'reorderQuestions')->name('live.exam.reorder.questions');
        });
        

    });
        







##############################################################################################################################################################








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

