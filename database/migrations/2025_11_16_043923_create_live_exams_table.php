<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('live_exams', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->text('description')->nullable();
        $table->integer('total_questions');
        $table->boolean('has_negative_marks')->default(false);
        $table->float('negative_marks_value')->nullable();
        $table->integer('total_marks')->nullable();
        $table->integer('duration')->nullable();
        $table->dateTime('start_time')->nullable();
        $table->dateTime('end_time')->nullable();
        $table->dateTime('result_publish_time')->nullable();
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('live_exams');
    }
};
