<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hsc26_map_registrations', function (Blueprint $table) {
            $table->string('unique_key_hscmap26')->unique()->after('id'); // unique key
            $table->integer('achieved_mark')->nullable()->after('feedback'); // optional numeric field
        });
    }

    public function down(): void
    {
        Schema::table('hsc26_map_registrations', function (Blueprint $table) {
            $table->dropColumn(['unique_key_hscmap26', 'achieved_mark']);
        });
    }
};
