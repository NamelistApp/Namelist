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
        Schema::create('Organization', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('Team', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('organization_id')->constrained()->restrictOnDelete();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('User', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('emailAddress')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('googleId')->nullable()->unique();
            $table->string('appleId')->nullable()->unique();
            $table->foreignId('currentTeam')
                ->nullable()
                ->onDelete('set null');
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Team');
        Schema::dropIfExists('Organization');
        Schema::dropIfExists('User');
        Schema::dropIfExists('password_reset_tokens');
    }
};
