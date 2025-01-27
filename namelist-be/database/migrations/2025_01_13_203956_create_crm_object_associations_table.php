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
        Schema::create('crm_object_association', function (Blueprint $table) {
            $table->id();
            $table->foreignId('crm_object_id')->constrained()->cascadeOnDelete();
            $table->foreignId('associated_crm_object_id')->references('id')->on('crm_objects')->cascadeOnDelete();
            $table->string('crm_object_type_id')->index();
            $table->string('associated_crm_object_type_id')->index();
            $table->string('label')->nullable();
            $table->timestamps();

            $table->foreign('associated_crm_object_type_id')->references('id')->on('crm_object_types')->restrictOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop('crm_object_associations');
    }
};
