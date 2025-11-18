<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->integer('serial')->default(0);
            $table->unsignedBigInteger('class_id')->nullable();

            // Direct subject name
            $table->string('subject_name', 100)->default('Unknown');


            $table->unsignedBigInteger('chapter_id')->nullable();
            $table->unsignedBigInteger('topic_id')->nullable();
            $table->unsignedBigInteger('hardness_id')->nullable();

            $table->longText('question');   // Question text
            $table->longText('options');    // JSON array of options
            $table->longText('explanation')->nullable();

            $table->unsignedBigInteger('created_by');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
