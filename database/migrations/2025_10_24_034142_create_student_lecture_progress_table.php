<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_lecture_progress', function (Blueprint $table) {
            $table->id();

            $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
            $table->string('subject');
            $table->string('chapter');
            $table->unsignedInteger('lecture_number');
            $table->boolean('status_of_completion')->default(false);

            $table->timestamps();

            // Unique constraint to prevent duplicate entries for the same student and lecture
            $table->unique(['student_id', 'subject', 'chapter', 'lecture_number'], 'student_lecture_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_lecture_progress');
    }
};
