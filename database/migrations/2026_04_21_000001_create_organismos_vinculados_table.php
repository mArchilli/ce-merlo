<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('organismos_vinculados', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('responsable');
            $table->string('cargo');
            $table->string('direccion')->nullable();
            $table->unsignedSmallInteger('orden')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('organismos_vinculados');
    }
};
