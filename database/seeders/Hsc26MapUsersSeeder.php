<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Hsc26MapUsersSeeder extends Seeder
{
    public function run()
    {
        // Fetch all registrations
        $registrations = DB::table('hsc26_map_registrations')->get();

        foreach ($registrations as $registration) {
            // Check if user with the same phone already exists
            $existingUser = DB::table('users')->where('phone', $registration->mobile)->first();
            if ($existingUser) {
                // Skip existing user
                continue;
            }

            // Insert new user
            DB::table('users')->insert([
                'name' => $registration->name,
                'phone' => $registration->mobile,
                'email' => $registration->email,
                'password' => Hash::make($registration->unique_key_hscmap26),
                'role' => 'student',
                'status' => 1, // active
                'logged_in' => 0,
                'submitted_exam' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('HSC26 users have been seeded successfully.');
    }
}
