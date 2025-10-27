<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
{
    User::create([
        'name' => 'Intiak Ahmed',
        'email' => 'intiakahmed@gmail.com',
        'password' => bcrypt('hello'),
    ]);

    User::create([
        'name' => 'Admin',
        'email' => 'admin@example.com',
        'password' => bcrypt('hello'),
    ]);
}

}
