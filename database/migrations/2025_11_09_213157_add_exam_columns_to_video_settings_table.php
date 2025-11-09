<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('video_settings', function (Blueprint $table) {
            $table->timestamp('deadline')->nullable()->after('purchase_link');
            $table->text('exam_description_bn')->nullable()->after('deadline');
            $table->string('exam_url')->nullable()->after('exam_description_bn');
        });
    }

    public function down(): void
    {
        Schema::table('video_settings', function (Blueprint $table) {
            $table->dropColumn(['deadline', 'exam_description_bn', 'exam_url']);
        });
    }
};
