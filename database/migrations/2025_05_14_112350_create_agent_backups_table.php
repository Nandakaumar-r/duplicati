<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('agent_backups', function (Blueprint $table) {
            $table->id();
            $table->string('hostname')->nullable();
            $table->string('ip')->nullable();
            $table->string('username')->nullable();
            $table->string('status')->default('failed');
            $table->string('server_time_zone')->nullable();
            $table->string('os_type')->nullable();
            $table->string('os_version', 255)->nullable();
            $table->string('backup_name', 255)->nullable();
            $table->json('system_info')->nullable();
            $table->string('type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agent_backups');
    }
};
