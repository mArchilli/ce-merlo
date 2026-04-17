<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('infraestructura_documentos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->text('descripcion')->nullable();
            $table->string('archivo_pdf');
            $table->boolean('activa')->default(true);
            $table->unsignedSmallInteger('anio')->nullable();
            $table->unsignedTinyInteger('mes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('infraestructura_documentos');
    }
};
