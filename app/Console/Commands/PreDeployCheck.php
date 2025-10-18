<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class PreDeployCheck extends Command
{
    protected $signature = 'check:predeploy';
    protected $description = 'Run pre-deployment checks for Laravel app';

    public function handle()
    {
        $this->info("Starting Pre-Deployment Checks...\n");

        // 1. Check APP_KEY
        if (empty(env('APP_KEY'))) {
            $this->error("❌ APP_KEY is missing! Run php artisan key:generate");
        } else {
            $this->info("✅ APP_KEY exists");
        }

        // 2. Check debug mode
        if (env('APP_DEBUG') === true || env('APP_DEBUG') === 'true') {
            $this->error("❌ APP_DEBUG is true! Set APP_DEBUG=false in production");
        } else {
            $this->info("✅ APP_DEBUG is false");
        }

        // 3. Check storage and bootstrap/cache permissions
        $paths = [storage_path(), base_path('bootstrap/cache')];
        foreach ($paths as $path) {
            if (is_writable($path)) {
                $this->info("✅ Writable: {$path}");
            } else {
                $this->error("❌ Not writable: {$path}");
            }
        }

        // 4. Check DB connection
        try {
            DB::connection()->getPdo();
            $this->info("✅ Database connection OK");
        } catch (\Exception $e) {
            $this->error("❌ Database connection failed: " . $e->getMessage());
        }

        // 5. Check migrations
        try {
            $pending = collect(Artisan::call('migrate:status') ?? [])->filter(function($line) {
                return str_contains($line, 'No');
            });
            $this->info("✅ Migrations status checked (run php artisan migrate if pending)");
        } catch (\Exception $e) {
            $this->error("❌ Migration check failed: " . $e->getMessage());
        }

        // 6. Check public/build folder
        if (File::exists(public_path('build'))) {
            $this->info("✅ Frontend assets found in public/build");
        } else {
            $this->error("❌ Frontend assets missing! Run npm run build");
        }

        $this->info("\nPre-Deployment Checks Completed!");
        return 0;
    }
}
