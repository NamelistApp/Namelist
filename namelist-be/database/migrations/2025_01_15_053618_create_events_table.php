<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('app_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('portal_id')->constrained()->cascadeOnDelete();
            $table->jsonb('properties')->default('{}');
            $table->boolean('is_identified')->default(false);
            $table->timestamps();
        });

        Schema::create('app_user_distinct_id', function (Blueprint $table) {
            $table->id();
            $table->string('distinct_id');
            $table->foreignId('app_user_id')->constrained(
                table: 'app_users', indexName: 'app_user_distinct_id_app_user_id'
            )->cascadeOnDelete();
            $table->foreignId('portal_id')->constrained()->cascadeOnDelete();

            $table->index('app_user_id');
            $table->index('distinct_id');
            $table->unique(['distinct_id', 'portal_id']);
        });

        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->uuid('uuid');
            $table->string('distinct_id');
            $table->foreignId('portal_id')->constrained()->cascadeOnDelete();
            $table->dateTime('timestamp'); // when the event happened in real life
            $table->jsonb('properties')->default('{}');
            $table->timestamps();

            $table->index('distinct_id');
            $table->index('name');
        });

        DB::statement('CREATE INDEX events_properties ON events USING gin (properties);');
        DB::statement('CREATE INDEX app_user_properties ON app_users USING gin (properties);');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop('app_user_distinct_id');
        Schema::drop('app_users');
        Schema::drop('events');
    }
};
