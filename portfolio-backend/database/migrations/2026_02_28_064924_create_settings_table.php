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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('value');
            $table->string('type')->default('text');
            $table->string('section')->default('general');
            $table->string('group')->default('general');
            $table->string('label')->nullable();
            $table->string('placeholder')->nullable();
            $table->string('icon')->nullable();
            $table->string('class')->nullable();
            $table->string('options')->nullable();
            $table->string('default')->nullable();
            $table->string('required')->default('no');
            $table->string('visible')->default('yes');
            $table->string('editable')->default('yes');
            $table->string('deletable')->default('no');
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('deleted_by')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
