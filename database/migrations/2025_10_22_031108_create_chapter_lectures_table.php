<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('chapter_lectures', function (Blueprint $table) {
            $table->id();
            $table->string('chapter');
            $table->unsignedInteger('lecture_number');
            $table->string('lecture_link');
            $table->timestamps();

            $table->unique(['chapter', 'lecture_number', 'lecture_link']); // prevents duplicates
        });
    }

    public function down(): void {
        Schema::dropIfExists('chapter_lectures');
    }
};
