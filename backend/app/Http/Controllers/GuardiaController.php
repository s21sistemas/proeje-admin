<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Guardia;

class GuardiaController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $guardias = Guardia::get();
        return response()->json($guardias->append(['curp_url', 'ine_url', 'acta_nacimiento_url', 'comprobante_domicilio_url', 'constancia_situacion_fiscal_url', 'comprobante_estudios_url', 'carta_recomendacion_url', 'antecedentes_no_penales_url', 'otro_archivo_url', 'antidoping_url', 'foto_url']));
    }

    //  * Mostrar todos los registros.
    public function guardiaAsignado()
    {
        $guardias = Guardia::where('estatus', 'Asignado')->get();
        return response()->json($guardias->append(['curp_url', 'ine_url', 'acta_nacimiento_url', 'comprobante_domicilio_url', 'constancia_situacion_fiscal_url', 'comprobante_estudios_url', 'carta_recomendacion_url', 'antecedentes_no_penales_url', 'otro_archivo_url', 'antidoping_url', 'foto_url']));
    }

    //  * Mostrar todos los registros.
    public function guardiaRango()
    {
        $guardias = Guardia::where('estatus', 'Disponible')->where('rango', 'Guardia')->get();
        return response()->json($guardias->append(['curp_url', 'ine_url', 'acta_nacimiento_url', 'comprobante_domicilio_url', 'constancia_situacion_fiscal_url', 'comprobante_estudios_url', 'carta_recomendacion_url', 'antecedentes_no_penales_url', 'otro_archivo_url', 'antidoping_url', 'foto_url']));
    }

    //  * Mostrar todos los registros.
    public function guardiaSupervisor()
    {
        $guardias = Guardia::where('estatus', 'Disponible')->where('rango', 'Supervisor')->get();
        return response()->json($guardias->append(['curp_url', 'ine_url', 'acta_nacimiento_url', 'comprobante_domicilio_url', 'constancia_situacion_fiscal_url', 'comprobante_estudios_url', 'carta_recomendacion_url', 'antecedentes_no_penales_url', 'otro_archivo_url', 'antidoping_url', 'foto_url']));
    }

    //  * Mostrar todos los registros.
    public function guardiaJefeGrupo()
    {
        $guardias = Guardia::where('estatus', 'Disponible')->where('rango', 'Jefe de grupo')->get();
        return response()->json($guardias->append(['curp_url', 'ine_url', 'acta_nacimiento_url', 'comprobante_domicilio_url', 'constancia_situacion_fiscal_url', 'comprobante_estudios_url', 'carta_recomendacion_url', 'antecedentes_no_penales_url', 'otro_archivo_url', 'antidoping_url', 'foto_url']));
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:100',
            'apellido_p' => 'required|string|max:100',
            'apellido_m' => 'required|string|max:100',
            'correo' => 'required|email|unique:guardias,correo',
            'codigo_acceso' => 'required|string',
            'calle' => 'required|string|max:100',
            'numero' => 'required|string|max:20',
            'colonia' => 'required|string|max:50',
            'cp' => 'required|numeric|min:1',
            'municipio' => 'required|string|max:100',
            'estado' => 'required|string|max:100',
            'pais' => 'required|string|max:100',
            'telefono' => 'required|string|max:15',
            'enfermedades' => 'required|string|max:100',
            'alergias' => 'required|string|max:100',
            'edad' => 'required|numeric|min:1|max:100',
            'telefono_emergencia' => 'required|string|max:15',
            'contacto_emergencia' => 'required|string|max:100',
            'foto' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'curp' => 'required|file|mimes:pdf|max:2048',
            'ine' => 'required|file|mimes:pdf|max:2048',
            'acta_nacimiento' => 'required|file|mimes:pdf|max:2048',
            'comprobante_domicilio' => 'required|file|mimes:pdf|max:2048',
            'constancia_situacion_fiscal' => 'required|file|mimes:pdf|max:2048',

            'comprobante_estudios' => 'nullable|file|mimes:pdf|max:2048',
            'carta_recomendacion' => 'nullable|file|mimes:pdf|max:2048',
            'antecedentes_no_penales' => 'nullable|file|mimes:pdf|max:2048',
            'otro_archivo' => 'nullable|file|mimes:pdf|max:2048',

            'fecha_antidoping' => 'nullable|date',
            'antidoping' => 'nullable|file|mimes:pdf|max:2048',

            'rango' => 'required|in:Guardia,Supervisor,Jefe de grupo',

        ]);

        if ($request->hasFile('foto')) {
            $data['foto'] = $this->subirFoto($request->file('foto'));
        }
        if ($request->hasFile('curp')) {
            $data['curp'] = $this->subirDocumento($request->file('curp'));
        }
        if ($request->hasFile('ine')) {
            $data['ine'] = $this->subirDocumento($request->file('ine'));
        }
        if ($request->hasFile('acta_nacimiento')) {
            $data['acta_nacimiento'] = $this->subirDocumento($request->file('acta_nacimiento'));
        }
        if ($request->hasFile('comprobante_domicilio')) {
            $data['comprobante_domicilio'] = $this->subirDocumento($request->file('comprobante_domicilio'));
        }
        if ($request->hasFile('constancia_situacion_fiscal')) {
            $data['constancia_situacion_fiscal'] = $this->subirDocumento($request->file('constancia_situacion_fiscal'));
        }
        if ($request->hasFile('comprobante_estudios')) {
            $data['comprobante_estudios'] = $this->subirDocumento($request->file('comprobante_estudios'));
        }
        if ($request->hasFile('carta_recomendacion')) {
            $data['carta_recomendacion'] = $this->subirDocumento($request->file('carta_recomendacion'));
        }
        if ($request->hasFile('antecedentes_no_penales')) {
            $data['antecedentes_no_penales'] = $this->subirDocumento($request->file('antecedentes_no_penales'));
        }
        if ($request->hasFile('otro_archivo')) {
            $data['otro_archivo'] = $this->subirDocumento($request->file('otro_archivo'));
        }
        if ($request->hasFile('antidoping')) {
            $data['antidoping'] = $this->subirDocumento($request->file('antidoping'));
        }

        $registro = Guardia::create($data);
        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = Guardia::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro->append(['curp_url', 'ine_url', 'acta_nacimiento_url', 'comprobante_domicilio_url', 'constancia_situacion_fiscal', 'comprobante_estudios', 'carta_recomendacion', 'antecedentes_no_penales', 'otro_archivo', 'antidoping', 'foto_url']));
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $registro = Guardia::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'nombre' => 'sometimes|string|max:100',
            'apellido_p' => 'sometimes|string|max:100',
            'apellido_m' => 'sometimes|string|max:100',
            'correo' => 'sometimes|email|unique:guardias,correo,' . $id,
            'calle' => 'sometimes|string|max:100',
            'numero' => 'sometimes|string|max:20',
            'colonia' => 'sometimes|string|max:50',
            'cp' => 'sometimes|numeric|min:1',
            'municipio' => 'sometimes|string|max:100',
            'estado' => 'sometimes|string|max:100',
            'pais' => 'sometimes|string|max:100',
            'telefono' => 'sometimes|string|max:15',
            'enfermedades' => 'sometimes|string|max:100',
            'alergias' => 'sometimes|string|max:100',
            'edad' => 'sometimes|numeric|min:1|max:100',
            'telefono_emergencia' => 'sometimes|string|max:15',
            'contacto_emergencia' => 'sometimes|string|max:100',
            'foto' => 'sometimes|image|mimes:jpg,jpeg,png|max:2048',
            'curp' => 'sometimes|file|mimes:pdf|max:2048',
            'ine' => 'sometimes|file|mimes:pdf|max:2048',
            'acta_nacimiento' => 'sometimes|file|mimes:pdf|max:2048',
            'comprobante_domicilio' => 'sometimes|file|mimes:pdf|max:2048',
            'constancia_situacion_fiscal' => 'sometimes|file|mimes:pdf|max:2048',

            'comprobante_estudios' => 'nullable|file|mimes:pdf|max:2048',
            'carta_recomendacion' => 'nullable|file|mimes:pdf|max:2048',
            'antecedentes_no_penales' => 'nullable|file|mimes:pdf|max:2048',
            'otro_archivo' => 'nullable|file|mimes:pdf|max:2048',

            'fecha_antidoping' => 'nullable|date',
            'antidoping' => 'nullable|file|mimes:pdf|max:2048',

            'estatus' => 'sometimes|in:Disponible,Descansado,Dado de baja,Asignado',
            'rango' => 'sometimes|in:Guardia,Supervisor,Jefe de grupo',
        ]);

        if ($request->hasFile('foto')) {
            if ($registro->foto) {
                $this->eliminarFoto($registro->foto);
            }
            $data['foto'] = $this->subirFoto($request->file('foto'));
        }
        if ($request->hasFile('curp')) {
            if ($registro->curp) {
                $this->eliminarDocumento($registro->curp);
            }
            $data['curp'] = $this->subirDocumento($request->file('curp'));
        }
        if ($request->hasFile('ine')) {
            if ($registro->ine) {
                $this->eliminarDocumento($registro->ine);
            }
            $data['ine'] = $this->subirDocumento($request->file('ine'));
        }
        if ($request->hasFile('acta_nacimiento')) {
            if ($registro->acta_nacimiento) {
                $this->eliminarDocumento($registro->acta_nacimiento);
            }
            $data['acta_nacimiento'] = $this->subirDocumento($request->file('acta_nacimiento'));
        }
        if ($request->hasFile('comprobante_domicilio')) {
            if ($registro->comprobante_domicilio) {
                $this->eliminarDocumento($registro->comprobante_domicilio);
            }
            $data['comprobante_domicilio'] = $this->subirDocumento($request->file('comprobante_domicilio'));
        }
        if ($request->hasFile('constancia_situacion_fiscal')) {
            if ($registro->constancia_situacion_fiscal) {
                $this->eliminarDocumento($registro->constancia_situacion_fiscal);
            }
            $data['constancia_situacion_fiscal'] = $this->subirDocumento($request->file('constancia_situacion_fiscal'));
        }
        if ($request->hasFile('comprobante_estudios')) {
            if ($registro->comprobante_estudios) {
                $this->eliminarDocumento($registro->comprobante_estudios);
            }
            $data['comprobante_estudios'] = $this->subirDocumento($request->file('comprobante_estudios'));
        }
        if ($request->hasFile('carta_recomendacion')) {
            if ($registro->carta_recomendacion) {
                $this->eliminarDocumento($registro->carta_recomendacion);
            }
            $data['carta_recomendacion'] = $this->subirDocumento($request->file('carta_recomendacion'));
        }
        if ($request->hasFile('antecedentes_no_penales')) {
            if ($registro->antecedentes_no_penales) {
                $this->eliminarDocumento($registro->antecedentes_no_penales);
            }
            $data['antecedentes_no_penales'] = $this->subirDocumento($request->file('antecedentes_no_penales'));
        }
        if ($request->hasFile('otro_archivo')) {
            if ($registro->otro_archivo) {
                $this->eliminarDocumento($registro->otro_archivo);
            }
            $data['otro_archivo'] = $this->subirDocumento($request->file('otro_archivo'));
        }
        if ($request->hasFile('antidoping')) {
            if ($registro->antidoping) {
                $this->eliminarDocumento($registro->antidoping);
            }
            $data['antidoping'] = $this->subirDocumento($request->file('antidoping'));
        }

        $registro->update($data);

        return response()->json(['message' => 'Registro actualizado'], 201);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = Guardia::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        // Guardamos el nombre de la carpeta antes de eliminar el registro
        $carpeta = 'public/fotos_guardias/';
        $carpeta_doc = 'public/documentos_guardias/';

        // Si tiene una foto, eliminamos el archivo de almacenamiento
        if ($registro->foto) {
            Storage::delete("{$carpeta}/{$registro->foto}");
        }

        // Si tiene documentos, eliminamos los archivos de almacenamiento
        if ($registro->curp) {
            Storage::delete("{$carpeta_doc}/{$registro->curp}");
        }
        if ($registro->ine) {
            Storage::delete("{$carpeta_doc}/{$registro->ine}");
        }
        if ($registro->acta_nacimiento) {
            Storage::delete("{$carpeta_doc}/{$registro->acta_nacimiento}");
        }
        if ($registro->comprobante_domicilio) {
            Storage::delete("{$carpeta_doc}/{$registro->comprobante_domicilio}");
        }

        // Eliminamos el registro de la base de datos
        $registro->delete();

        // Si la carpeta está vacía, la eliminamos para evitar directorios innecesarios
        if (empty(Storage::files($carpeta))) {
            Storage::deleteDirectory($carpeta);
        }

        if (empty(Storage::files($carpeta_doc))) {
            Storage::deleteDirectory($carpeta_doc);
        }

        return response()->json(['message' => 'Registro eliminado con éxito']);
    }

    // * Función para subir una foto
    private function subirFoto($archivo)
    {
        $nombre = time() . '_' . uniqid() . '.' . $archivo->extension();
        $archivo->storeAs("public/fotos_guardias", $nombre);

        return $nombre;
    }

    // * Función para eliminar una foto
    private function eliminarFoto($nombreArchivo)
    {
        $ruta = storage_path("app/public/fotos_guardias/{$nombreArchivo}");

        if (file_exists($ruta)) {
            unlink($ruta);
        }
    }

    // * Función para subir un documento
    private function subirDocumento($archivo)
    {
        $nombre = time() . '_' . uniqid() . '.' . $archivo->extension();
        $archivo->storeAs("public/documentos_guardias", $nombre);

        return $nombre;
    }

    // * Función para eliminar un documento
    private function eliminarDocumento($nombreArchivo)
    {
        $ruta = storage_path("app/public/documentos_guardias/{$nombreArchivo}");

        if (file_exists($ruta)) {
            unlink($ruta);
        }
    }
}
