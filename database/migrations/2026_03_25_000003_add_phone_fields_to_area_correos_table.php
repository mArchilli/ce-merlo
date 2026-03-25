<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('area_correos', function (Blueprint $table) {
            $table->string('correo')->nullable()->change();
            $table->string('telefono', 50)->nullable()->after('correo');
            $table->boolean('es_whatsapp')->default(false)->after('telefono');
        });
    }

    public function down(): void
    {
        Schema::table('area_correos', function (Blueprint $table) {
            $table->dropColumn(['telefono', 'es_whatsapp']);
            $table->string('correo')->nullable(false)->change();
        });
    }
};
