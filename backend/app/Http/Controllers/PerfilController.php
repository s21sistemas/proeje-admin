<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PerfilController extends Controller
{
    public function index(Request $request)
    {
        $usuario = $request->user()->load([
            'rol.permisos.modulo'
        ]);

        return response()->json($usuario);
    }
}
