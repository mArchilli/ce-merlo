<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('novedades', function (Blueprint $table) {
            $table->unsignedSmallInteger('anio')->nullable()->after('destacada');
            $table->unsignedTinyInteger('mes')->nullable()->after('anio');
            $table->unsignedTinyInteger('dia')->nullable()->after('mes');
        });
    }

    public function down(): void
    {
        Schema::table('novedades', function (Blueprint $table) {
            $table->dropColumn(['anio', 'mes', 'dia']);
        });
    }
};
