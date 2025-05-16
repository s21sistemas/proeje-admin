<?php

namespace App\Http\Controllers;

use App\Models\PagoEmpleado;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\View;

class PagoEmpleadoController extends Controller
{
     public function index()
    {
        return PagoEmpleado::with('guardia')->latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'guardia_id' => 'required|exists:guardias,id',
            'sueldo_base' => 'required|numeric',
            'periodo_inicio' => 'required|date',
            'periodo_fin' => 'required|date|after_or_equal:periodo_inicio',
            'dias_trabajados' => 'required|numeric',
            'tiempo_extra' => 'required|numeric',
            'prima_vacacional' => 'required|numeric',
            'incapacidades_pagadas' => 'required|numeric',
            'descuentos' => 'required|numeric',
            'faltas' => 'required|numeric',
            'incapacidades_no_pagadas' => 'required|numeric',
            'imss' => 'required|numeric',
            'infonavit' => 'required|numeric',
            'fonacot' => 'required|numeric',
            'retencion_isr' => 'required|numeric',
            'total_ingresos' => 'required|numeric',
            'total_egresos' => 'required|numeric',
            'total_retenciones' => 'required|numeric',
            'pago_bruto' => 'required|numeric',
            'pago_final' => 'required|numeric',
            'observaciones' => 'nullable|string',
        ]);

        return PagoEmpleado::create($data);
    }

    public function show($id)
    {
        return PagoEmpleado::with('guardia')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $registro = PagoEmpleado::findOrFail($id);

        $data = $request->validate([
            'sueldo_base' => 'sometimes|numeric',
            'periodo_inicio' => 'sometimes|date',
            'periodo_fin' => 'sometimes|date|after_or_equal:periodo_inicio',
            'imss' => 'sometimes|numeric',
            'infonavit' => 'sometimes|numeric',
            'fonacot' => 'sometimes|numeric',
            'retencion_isr' => 'sometimes|numeric',
            'total_retenciones' => 'sometimes|numeric',
            'pago_final' => 'sometimes|numeric',
            'observaciones' => 'nullable|string',
        ]);

        if($request->paga_prestamo){

        }

        $registro->update($data);
        return $registro;
    }

    public function destroy($id)
    {
        $registro = PagoEmpleado::findOrFail($id);
        $registro->delete();

        return response()->json(['message' => 'Registro eliminado']);
    }

    public function generarPdf($id)
    {
        $pago = PagoEmpleado::with('guardia')->findOrFail($id);

        $pdf = Pdf::loadView('pdf.pago_empleado', compact('pago'))
            ->setPaper('letter', 'portrait');

        return $pdf->stream("pago_empleado_{$pago->guardia->nombre}_{$pago->guardia->apellido_p}_{$pago->guardia->apellido_m}_({$pago->guardia->numero_empleado}).pdf");
    }
}
