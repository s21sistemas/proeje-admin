<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CountPageController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\GuardiaController;
use App\Http\Controllers\RecursosHumanosController;
use App\Http\Controllers\BancoController;
use App\Http\Controllers\MovimientoBancarioController;
use App\Http\Controllers\CotizacionController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\SucursalController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\ArticuloController;
use App\Http\Controllers\VehiculoController;
use App\Http\Controllers\OrdenCompraController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\GastoController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\VentaHistorialController;
use App\Http\Controllers\AlmacenController;
use App\Http\Controllers\AlmacenEntradaController;
use App\Http\Controllers\AlmacenSalidaController;
use App\Http\Controllers\EquipamientoController;
use App\Http\Controllers\OrdenServicioController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\ReporteCarteraVencidaController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\ModuloController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Login y pre-registro
Route::post('/login', [AuthController::class, 'login']);
Route::post('/registro', [UsuarioController::class, 'registro']);

// Route::middleware('auth:sanctum')->group(function () {

    // Modulos de la API (rutas protegidas)
    Route::apiResource('count-adminpage', CountPageController::class);

    Route::apiResource('roles', RolController::class);
    Route::apiResource('usuarios', UsuarioController::class);
    Route::apiResource('perfil', PerfilController::class);
    Route::apiResource('guardias', GuardiaController::class);
    Route::get('guardias-asignado', [GuardiaController::class, 'guardiaAsignado']);
    Route::get('guardias-rango', [GuardiaController::class, 'guardiaRango']);
    Route::get('guardias-supervisor', [GuardiaController::class, 'guardiaSupervisor']);
    Route::get('guardias-jefegrupo', [GuardiaController::class, 'guardiaJefeGrupo']);
    Route::apiResource('recursos-humanos', RecursosHumanosController::class);
    Route::apiResource('bancos', BancoController::class);
    Route::apiResource('movimientos-bancarios', MovimientoBancarioController::class);
    Route::apiResource('cotizaciones', CotizacionController::class);
    Route::apiResource('clientes', ClienteController::class);
    Route::apiResource('sucursales', SucursalController::class);
    Route::get('sucursales-cliente', [SucursalController::class, 'sucursalesCliente']);
    Route::apiResource('proveedores', ProveedorController::class);
    Route::apiResource('articulos', ArticuloController::class);
    Route::get('articulos-asignar', [ArticuloController::class, 'articulosAsignar']);
    Route::apiResource('vehiculos', VehiculoController::class);
    Route::get('vehiculos-disponibles', [VehiculoController::class, 'getVehiculosDisponibles']);
    Route::apiResource('ordenes-compra', OrdenCompraController::class);
    Route::apiResource('compras', CompraController::class);
    Route::apiResource('gastos', GastoController::class);
    Route::apiResource('ventas', VentaController::class);
    Route::get('ventas-orden-servicio', [VentaController::class, 'ventaOrdenServicio']);
    Route::put('cancelar-venta', [VentaController::class, 'cancelarVenta']);
    Route::apiResource('ventas-historial', VentaHistorialController::class);
    Route::apiResource('almacen', AlmacenController::class);
    Route::get('almacen-disponibles', [AlmacenController::class, 'disponibles']);
    Route::apiResource('almacen-entradas', AlmacenEntradaController::class);
    Route::apiResource('almacen-salidas', AlmacenSalidaController::class);
    Route::apiResource('equipo', EquipamientoController::class);
    Route::get('equipamiento-completo', [EquipamientoController::class, 'equipamientoCompleto']);
    Route::get('equipo-disponible/{articulo_id}', [AlmacenController::class, 'obtenerEquipoDisponible']);
    Route::apiResource('orden-servicio', OrdenServicioController::class);
    Route::post('generador-reportes', [ReporteController::class, 'getReport']);
    Route::apiResource('cartera-vencida', ReporteCarteraVencidaController::class);
    Route::apiResource('usuarios', UsuarioController::class);
    Route::apiResource('roles', RolController::class);
    Route::apiResource('modulos', ModuloController::class);

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);
// });
