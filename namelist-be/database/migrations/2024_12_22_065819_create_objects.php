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
        Schema::create('crm_object_types', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('crm_objects', function (Blueprint $table) {
            $table->id();
            $table->string('crm_object_type_id')->index();
            $table->foreignId('portal_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('crm_object_type_id')->references('id')->on('crm_object_types')->restrictOnDelete();
        });

        Schema::create('crm_property_definitions', function (Blueprint $table) {
            $table->id();
            $table->string('crm_object_type_id')->index();
            $table->foreignId('portal_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('key')->index();
            $table->string('name');
            $table->string('type');
            $table->jsonb('validations')->default('[]');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('crm_object_type_id')->references('id')->on('crm_object_types')->restrictOnDelete();
        });

        Schema::create('crm_object_properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('crm_object_id')
                ->constrained()
                ->onDelete('cascade');
            $table->foreignId('portal_id')
                ->constrained()
                ->onDelete('cascade');
            $table->string('crm_object_type_id')->index();
            $table->foreignId('crm_property_definition_id')
                ->constrained()
                ->onDelete('restrict');
            $table->string('key')->index();
            $table->string('name');
            $table->integer('version')->default(1);
            $table->text('value');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('crm_object_type_id')->references('id')->on('crm_object_types')->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::drop('crm_object_properties');
        Schema::drop('crm_property_definitions');
        Schema::drop('crm_object_types');
        Schema::drop('crm_objects');
    }
};
