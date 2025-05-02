<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Mail\RegistroMailable;
use Illuminate\Support\Facades\Mail;

class UsuarioController extends Controller
{
    //  * Mostrar todos los usuarios con sus roles.
    public function index()
    {
        $usuarios = Usuario::with('rol')->get();
        return response()->json($usuarios);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $request->validate([
            'nombre_completo' => 'required|string|max:100',
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required|string|min:6',
            'rol_id' => 'required|exists:roles,id',
        ]);

        Usuario::create([
            'nombre_completo' => $request->nombre_completo,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'rol_id' => $request->rol_id,
        ]);

        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $usuario = Usuario::with('rol')->find($id);

        if (!$usuario) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($usuario);
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $request->validate([
            'nombre_completo' => 'sometimes|string|max:100',
            'email' => 'sometimes|email|unique:usuarios,email,' . $id,
            'password' => 'nullable|string|min:6',
            'rol_id' => 'sometimes|exists:roles,id',
        ]);

        $data = $request->only('nombre_completo', 'email', 'rol_id');
        if ($request->filled('password')) {
            $data['password'] = bcrypt($request->password);
        }

        $usuario->update($data);

        return response()->json(['message' => 'Registro actualizado'], 201);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $usuario->delete();

        return response()->json(['message' => 'Registro eliminado']);
    }
}
