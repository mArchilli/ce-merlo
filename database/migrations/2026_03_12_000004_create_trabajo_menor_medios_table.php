<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trabajo_menor_medios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trabajo_menor_id')->constrained('trabajos_menores')->cascadeOnDelete();
            $table->enum('tipo', ['imagen', 'video']);
            $table->string('ruta');
            $table->string('nombre_original')->nullable();
            $table->boolean('es_principal')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trabajo_menor_medios');
    }
};
