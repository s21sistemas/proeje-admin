<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guardia extends Model
{
    use HasFactory;

    protected $table = 'guardias';

    protected $fillable = ['nombre', 'apellido_p', 'apellido_m', 'correo', 'codigo_acceso', 'calle', 'numero', 'colonia', 'cp', 'municipio', 'estado', 'pais', 'telefono', 'enfermedades', 'alergias', 'edad', 'telefono_emergencia', 'contacto_emergencia', 'foto', 'curp', 'ine', 'acta_nacimiento', 'comprobante_domicilio', 'constancia_situacion_fiscal', 'comprobante_estudios', 'carta_recomendacion', 'antecedentes_no_penales', 'otro_archivo', 'antidoping', 'rango', 'estatus'];

    protected $hidden = ['foto', 'curp', 'ine', 'acta_nacimiento', 'comprobante_domicilio'];

    public function recursos_humanos()
    {
        return $this->hasMany(RecursosHumanos::class, 'guardia_id');
    }

    public function getFotoUrlAttribute()
    {
        if (!$this->foto) {
            return;
        }

        return asset("storage/fotos_guardias/{$this->foto}");
    }

    public function getCurpUrlAttribute()
    {
        if (!$this->curp) {
            return;
        }

        return asset("storage/documentos_guardias/{$this->curp}");
    }
    public function getIneUrlAttribute()
    {
        if (!$this->ine) {
            return;
        }

        return asset("storage/documentos_guardias/{$this->ine}");
    }
    public function getActaNacimientoUrlAttribute()
    {
        if (!$this->acta_nacimiento) {
            return;
        }

        return asset("storage/documentos_guardias/{$this->acta_nacimiento}");
    }
    public function getComprobanteDomicilioUrlAttribute()
    {
        if (!$this->comprobante_domicilio) {
            return;
        }

        return asset("storage/documentos_guardias/{$this->comprobante_domicilio}");
    }
    public function getConstanciaSituacionFiscalUrlAttribute()
    {
        if (!$this->constancia_situacion_fiscal) {
            return;
        }

        return asset("storage/documentos_guardias/{$this->constancia_situacion_fiscal}");
    }
    public function getComprobanteEstudiosUrlAttribute()
    {
        if (!$this->comprobante_estudios) {
            return;
        }

        return asset("storage/documentos_guardias/{$this->comprobante_estudios}");
    }
    public function getCartaRecomendacionUrlAttribute()
    {
        if (!$this->carta_recomendacion) {
            return;
        }

        return asset("storage/documentos_guardias/{$this->carta_recomendacion}");
    }
    public function getAntecedentesNoPenalesUrlAttribute()
    {
        if (!$this->antecedentes_no_penales) {
            return;
        }

        return asset("storage/documentos_guardias/{$this->antecedentes_no_penales}");
    }
    public function getOtroArchivoUrlAttribute()
    {
        if (!$this->otro_archivo) {
            return;
        }

        return asset("storage/documentos_guardias/{$this->otro_archivo}");
    }
    public function getAntidopingUrlAttribute()
    {
        if (!$this->antidoping) {
            return;
        }

        return asset("storage/documentos_guardias/{$this->antidoping}");
    }
}
