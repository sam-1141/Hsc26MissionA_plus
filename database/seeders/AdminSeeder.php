<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@ft.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('Admin123!'),
                'role' => 'admin',
                'status' => 1,
            ]
        );
    }
}
