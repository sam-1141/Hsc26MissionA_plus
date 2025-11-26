<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
class AdminSeeder extends Seeder
{
    

public function run(): void
{
    DB::table('users')->truncate(); // Delete all existing users

    // Admin user
    User::updateOrCreate(
        ['email' => 'admin@ft.com'],
        [
            'name' => 'Super Admin',
            'password' => Hash::make('21141!'),
            'role' => 'admin',
            'status' => 1,
        ]
    );

    // Student user
    User::updateOrCreate(
        ['email' => 'student@ft.com'],
        [
            'name' => 'Student',
            'password' => Hash::make('21141!'),
            'role' => 'student',
            'status' => 1,
        ]
    );
}

}
