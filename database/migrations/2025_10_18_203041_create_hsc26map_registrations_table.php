<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hsc26_map_registrations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('mobile');
            $table->string('fb_id')->nullable();
            $table->string('college');
            $table->string('eiin');
            $table->string('course');
            $table->string('email');
            $table->text('feedback')->nullable();
            $table->boolean('hsc26Mission');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hsc26map_registrations');
    }
};
