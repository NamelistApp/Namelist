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
        Schema::create('object_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('crm_objects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('object_type_id')->constrained()->onDelete('restrict');
            $table->foreignId('portal_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('property_definitions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('object_type_id')->constrained()->onDelete('restrict');
            $table->string('name')->index();
            $table->string('type');
            $table->text('validations')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('object_properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('crm_object_id')
                ->constrained()
                ->onDelete('cascade');
            $table->foreignId('property_definition_id')
                ->constrained()
                ->onDelete('restrict');
            $table->string('name')->index();
            $table->integer('version')->default(1);
            $table->jsonb('value');
            $table->timestamps();
            $table->softDeletes();

            $table->primary(['property_definition_id', 'crm_object_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('object_properties');
        Schema::dropIfExists('property_definitions');
        Schema::dropIfExists('object_types');
        Schema::dropIfExists('objects');
    }
};
