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
        Schema::create('educations', function (Blueprint $table) {
            Schema::create('educations', function (Blueprint $table) {
                $table->id();
                $table->string('institution');
                $table->string('degree');
                $table->string('field_of_study');
                $table->string('start_year');
                $table->string('end_year')->nullable();
                $table->string('grade')->nullable();
                $table->timestamps();
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('educations');
    }
};
