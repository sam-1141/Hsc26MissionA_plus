<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('progresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
            $table->string('subject');
            $table->string('chapter');
            $table->unsignedInteger('lectures')->default(0);
            $table->unsignedInteger('duration_days')->default(0);
            $table->timestamps();

            // Unique constraint so (student_id, subject, chapter) is unique:
            $table->unique(['student_id', 'subject', 'chapter']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('progresses');
    }
};
