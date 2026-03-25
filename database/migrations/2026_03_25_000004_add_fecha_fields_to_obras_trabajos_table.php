<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('obras', function (Blueprint $table) {
            $table->unsignedSmallInteger('anio')->nullable()->after('destacada');
            $table->unsignedTinyInteger('mes')->nullable()->after('anio');
        });

        Schema::table('trabajos_menores', function (Blueprint $table) {
            $table->unsignedSmallInteger('anio')->nullable()->after('destacado');
            $table->unsignedTinyInteger('mes')->nullable()->after('anio');
        });
    }

    public function down(): void
    {
        Schema::table('obras', function (Blueprint $table) {
            $table->dropColumn(['anio', 'mes']);
        });

        Schema::table('trabajos_menores', function (Blueprint $table) {
            $table->dropColumn(['anio', 'mes']);
        });
    }
};
