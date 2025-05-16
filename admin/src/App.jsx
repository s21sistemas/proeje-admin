import { Toaster } from 'sonner'
import { lazy, Suspense, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { Sidebar } from './components/Sidebar'
import { Navbar } from './components/Navbar'
import Loading from './components/Loading'
import { useAuth } from './context/AuthContext'
import { PrivateRoute } from './components/PrivateRoute'

const AdminPage = lazy(() => import('./pages/AdminPage'))
const SucursalesEmpresaPage = lazy(() =>
  import('./pages/SucursalesEmpresaPage')
)
const GuardiasPage = lazy(() => import('./pages/GuardiasPage'))
const EquipamientoPage = lazy(() => import('./pages/EquipamientoPage'))
const BlackListPage = lazy(() => import('./pages/BlackListPage'))
const ClientesPage = lazy(() => import('./pages/ClientesPage'))
const SucursalesPage = lazy(() => import('./pages/SucursalesPage'))
const ProveedoresPage = lazy(() => import('./pages/ProveedoresPage'))
const CotizacionesPage = lazy(() => import('./pages/CotizacionesPage'))
const VentasPage = lazy(() => import('./pages/VentasPage'))
const OrdenesServiciosPage = lazy(() => import('./pages/OrdenesServiciosPage'))
const GenerarQRSPage = lazy(() => import('./pages/GenerarQRSPage'))
const RecorridosGuardiaPage = lazy(() =>
  import('./pages/RecorridosGuardiaPage')
)
const ArticulosPage = lazy(() => import('./pages/ArticulosPage'))
const VehiculosPage = lazy(() => import('./pages/VehiculosPage'))
const BoletasGasolinaPage = lazy(() => import('./pages/BoletasGasolinaPage'))
const AlmacenPage = lazy(() => import('./pages/AlmacenPage'))
const AlmacenEntradasPage = lazy(() => import('./pages/AlmacenEntradasPage'))
const AlmacenSalidasPage = lazy(() => import('./pages/AlmacenSalidasPage'))
const BancosPage = lazy(() => import('./pages/BancosPage'))
const MovimientosBancariosPage = lazy(() =>
  import('./pages/MovimientosBancariosPage')
)
const OrdenesComprasPage = lazy(() => import('./pages/OrdenesComprasPage'))
const ComprasPage = lazy(() => import('./pages/ComprasPage'))
const GastosPage = lazy(() => import('./pages/GastosPage'))
const ReportesPage = lazy(() => import('./pages/ReportesPage'))
const ReporteCarteraVencidaPage = lazy(() =>
  import('./pages/ReporteCarteraVencidaPage')
)
const UsuariosPage = lazy(() => import('./pages/UsuariosPage'))
const RolesPage = lazy(() => import('./pages/RolesPage'))
const ModulosPage = lazy(() => import('./pages/ModulosPage'))
const LogsPage = lazy(() => import('./pages/LogsPage'))
const VentasHistorialPage = lazy(() => import('./pages/VentasHistorialPage'))

const IncapacidadesPage = lazy(() => import('./pages/IncapacidadesPage'))
const TiempoExtraPage = lazy(() => import('./pages/TiempoExtraPage'))
const FaltasPage = lazy(() => import('./pages/FaltasPage'))
const DescuentosPage = lazy(() => import('./pages/DescuentosPage'))
const VacacionesPage = lazy(() => import('./pages/VacacionesPage'))
const PrestamosPage = lazy(() => import('./pages/PrestamosPage'))
const AbonosPrestamosPage = lazy(() => import('./pages/AbonosPrestamosPage'))
const PagosEmpleadosPage = lazy(() => import('./pages/PagosEmpleadosPage'))

const ModuloPrestamosPage = lazy(() => import('./pages/ModuloPrestamosPage'))
const ModuloDescuentosPage = lazy(() => import('./pages/ModuloDescuentosPage'))

const GuardiasCheckPage = lazy(() => import('./pages/GuardiasCheckPage'))
const BitacorasPage = lazy(() => import('./pages/BitacorasPage'))
const ReporteIncidentesPage = lazy(() =>
  import('./pages/ReporteIncidentesPage')
)
const ReporteGuardiasPage = lazy(() => import('./pages/ReporteGuardiasPage'))
const ReporteSupervisoresPage = lazy(() =>
  import('./pages/ReporteSupervisoresPage')
)

const EstadoCuentaGuardiaPage = lazy(() =>
  import('./pages/EstadoCuentaGuardiaPage')
)
const EstadoCuentaClientePage = lazy(() =>
  import('./pages/EstadoCuentaClientePage')
)
const EstadoCuentaProveedorPage = lazy(() =>
  import('./pages/EstadoCuentaProveedorPage')
)
const EstadoCuentaBancoPage = lazy(() =>
  import('./pages/EstadoCuentaBancoPage')
)
const ReportesRHPage = lazy(() => import('./pages/ReportesRHPage'))

const PerfilPage = lazy(() => import('./pages/PerfilPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))

export default function App() {
  const { isAuthenticated, loading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  if (loading) return <Loading />
  if (isAuthenticated === null) return <Loading />

  return (
    <Suspense fallback={<Loading />}>
      {isAuthenticated ? (
        <div className='flex h-screen bg-gray-100'>
          <Toaster richColors position='bottom-right' />
          <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <div className='flex-1 flex flex-col overflow-hidden'>
            <Navbar toggleSidebar={toggleSidebar} />
            <main className='flex-1 overflow-auto p-4'>
              <Routes>
                <Route
                  index
                  path='/'
                  element={
                    <PrivateRoute>
                      <AdminPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/sucursales-empresa'
                  element={<SucursalesEmpresaPage />}
                />
                <Route path='/guardias' element={<GuardiasPage />} />
                <Route path='/equipo' element={<EquipamientoPage />} />
                <Route path='/blacklist' element={<BlackListPage />} />
                <Route path='/incapacidades' element={<IncapacidadesPage />} />
                <Route path='/tiempo-extra' element={<TiempoExtraPage />} />
                <Route path='/faltas' element={<FaltasPage />} />
                <Route path='/descuentos' element={<DescuentosPage />} />
                <Route path='/vacaciones' element={<VacacionesPage />} />
                <Route path='/prestamos' element={<PrestamosPage />} />
                <Route
                  path='/abonos-prestamo'
                  element={<AbonosPrestamosPage />}
                />
                <Route
                  path='/pagos-empleados'
                  element={<PagosEmpleadosPage />}
                />
                <Route
                  path='/estadocuenta-guardias'
                  element={<EstadoCuentaGuardiaPage />}
                />
                <Route path='/reportes-guardias' element={<ReportesRHPage />} />
                <Route
                  path='/modulo-prestamos'
                  element={<ModuloPrestamosPage />}
                />
                <Route
                  path='/modulo-descuentos'
                  element={<ModuloDescuentosPage />}
                />
                <Route path='/clientes' element={<ClientesPage />} />
                <Route
                  path='/estadocuenta-clientes'
                  element={<EstadoCuentaClientePage />}
                />
                <Route path='/sucursales' element={<SucursalesPage />} />
                <Route path='/proveedores' element={<ProveedoresPage />} />
                <Route path='/guardias-check' element={<GuardiasCheckPage />} />
                <Route path='/bitacoras-guardia' element={<BitacorasPage />} />
                <Route
                  path='/reporte-incidentes'
                  element={<ReporteIncidentesPage />}
                />
                <Route
                  path='/reporte-guardias'
                  element={<ReporteGuardiasPage />}
                />
                <Route
                  path='/reporte-supervisores'
                  element={<ReporteSupervisoresPage />}
                />
                <Route
                  path='/estadocuenta-proveedores'
                  element={<EstadoCuentaProveedorPage />}
                />
                <Route path='/cotizaciones' element={<CotizacionesPage />} />
                <Route path='/ventas' element={<VentasPage />} />
                <Route
                  path='/orden-servicio'
                  element={<OrdenesServiciosPage />}
                />
                <Route path='/generar-qr' element={<GenerarQRSPage />} />
                <Route
                  path='/recorridos-guardia'
                  element={<RecorridosGuardiaPage />}
                />
                <Route path='/vehiculos' element={<VehiculosPage />} />
                <Route
                  path='/boletas-gasolina'
                  element={<BoletasGasolinaPage />}
                />
                <Route path='/articulos' element={<ArticulosPage />} />
                <Route path='/almacen' element={<AlmacenPage />} />
                <Route
                  path='/almacen-entradas'
                  element={<AlmacenEntradasPage />}
                />
                <Route
                  path='/almacen-salidas'
                  element={<AlmacenSalidasPage />}
                />
                <Route path='/bancos' element={<BancosPage />} />
                <Route
                  path='/movimientos-bancarios'
                  element={<MovimientosBancariosPage />}
                />
                <Route
                  path='/estadocuenta-bancos'
                  element={<EstadoCuentaBancoPage />}
                />
                <Route
                  path='/ordenes-compra'
                  element={<OrdenesComprasPage />}
                />
                <Route path='/compras' element={<ComprasPage />} />
                <Route path='/gastos' element={<GastosPage />} />
                <Route path='/generador-reportes' element={<ReportesPage />} />
                <Route
                  path='/cartera-vencida'
                  element={<ReporteCarteraVencidaPage />}
                />
                <Route path='/usuarios' element={<UsuariosPage />} />
                <Route path='/roles' element={<RolesPage />} />
                <Route path='/modulos' element={<ModulosPage />} />
                <Route path='/logs' element={<LogsPage />} />
                <Route
                  path='/ventas-historial'
                  element={<VentasHistorialPage />}
                />

                <Route path='/perfil' element={<PerfilPage />} />
                <Route path='/login' element={<Navigate to='/' />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      )}
    </Suspense>
  )
}
