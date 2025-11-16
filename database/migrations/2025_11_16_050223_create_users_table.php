<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable()->unique();

            // authentication fields
            $table->string('password');

            // 0 = student, 1 = admin
            $table->enum('role', ['student', 'admin'])->default('student');

            // 1 = active, 0 = deactivated
            $table->tinyInteger('status')->default(1);

            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
