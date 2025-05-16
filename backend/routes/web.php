<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use App\Http\Controllers\EstadoCuentaController;
use App\Http\Controllers\CotizacionController;
use App\Http\Controllers\QRGeneradoController;
use App\Http\Controllers\PagoEmpleadoController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/api/pdf/pagos-empleados/{id}', [PagoEmpleadoController::class, 'generarPdf']);
Route::get('/api/pdf/estado-cuenta-guardias', [EstadoCuentaController::class, 'generarPdfEstadoCuentaGuardia']);
Route::get('/api/pdf/estado-cuenta-clientes', [EstadoCuentaController::class, 'generarPdfEstadoCuentaCliente']);
Route::get('/api/pdf/estado-cuenta-proveedores', [EstadoCuentaController::class, 'generarPdfEstadoCuentaProveedor']);
Route::get('/api/pdf/estado-cuenta-bancos', [EstadoCuentaController::class, 'generarPdfEstadoCuentaBanco']);
Route::get('/api/pdf/cotizacion/{id}', [CotizacionController::class, 'generarPDF']);
Route::get('/ordenes-servicio/{id}/pdf-qrs', [QRGeneradoController::class, 'generarPdf'])->name('pdf.qrs_recorrido');

Route::get('/{any}', function () {
    return File::get(public_path('index.html'));
})->where('any', '.*');
