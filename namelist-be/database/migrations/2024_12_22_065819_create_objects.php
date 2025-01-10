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
        Schema::create('ObjectType', function (Blueprint $table) {});

        Schema::create('Contact', function (Blueprint $table) {});

        Schema::create('CustomField', function (Blueprint $table) {});

        Schema::create('CustomFieldEntry', function (Blueprint $table) {});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ObjectType');
        Schema::dropIfExists('Contact');
        Schema::dropIfExists('CustomField');
        Schema::dropIfExists('CustomFieldEntry');
    }
};
