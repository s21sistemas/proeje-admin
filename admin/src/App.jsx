import { Toaster } from 'sonner'
import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { Sidebar } from './components/Sidebar'
import { Navbar } from './components/Navbar'
import Loading from './components/Loading'
import { useAuth } from './hooks/useAuth'
import { ModuloConstruccion } from './components/ModuloConstruccion'

const AdminPage = lazy(() => import('./pages/AdminPage'))
const GuardiasPage = lazy(() => import('./pages/GuardiasPage'))
const RecursosHumanosPage = lazy(() => import('./pages/RecursosHumanosPage'))
const EquipamientoPage = lazy(() => import('./pages/EquipamientoPage'))
const ClientesPage = lazy(() => import('./pages/ClientesPage'))
const SucursalesPage = lazy(() => import('./pages/SucursalesPage'))
const ProveedoresPage = lazy(() => import('./pages/ProveedoresPage'))
const CotizacionesPage = lazy(() => import('./pages/CotizacionesPage'))
const VentasPage = lazy(() => import('./pages/VentasPage'))
const OrdenesServiciosPage = lazy(() => import('./pages/OrdenesServiciosPage'))
const ArticulosPage = lazy(() => import('./pages/ArticulosPage'))
const VehiculosPage = lazy(() => import('./pages/VehiculosPage'))
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
// const LogsPage = lazy(() => import('./pages/LogsPage'))
const VentasHistorialPage = lazy(() => import('./pages/VentasHistorialPage'))

const PerfilPage = lazy(() => import('./pages/PerfilPage'))
// const LoginPage = lazy(() => import('./pages/LoginPage'))

export default function App() {
  const { isAuthenticated } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  if (isAuthenticated === null) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <div className='flex h-screen bg-gray-100'>
          <Toaster richColors position='bottom-right' />
          <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <div className='flex-1 flex flex-col overflow-hidden'>
            <Navbar toggleSidebar={toggleSidebar} />
            <main className='flex-1 overflow-auto p-4'>
              <Routes>
                <Route index path='/' element={<AdminPage />} />

                <Route path='/guardias' element={<GuardiasPage />} />
                <Route
                  path='/recursos-humanos'
                  element={<RecursosHumanosPage />}
                />
                <Route path='/equipo' element={<EquipamientoPage />} />
                <Route path='/clientes' element={<ClientesPage />} />
                <Route path='/sucursales' element={<SucursalesPage />} />
                <Route path='/proveedores' element={<ProveedoresPage />} />
                <Route path='/cotizaciones' element={<CotizacionesPage />} />
                <Route path='/ventas' element={<VentasPage />} />
                <Route
                  path='/orden-servicio'
                  element={<OrdenesServiciosPage />}
                />
                <Route path='/articulos' element={<ArticulosPage />} />
                <Route path='/vehiculos' element={<VehiculosPage />} />
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
                  path='/movimientos'
                  element={<MovimientosBancariosPage />}
                />
                <Route
                  path='/ordenes-compra'
                  element={<OrdenesComprasPage />}
                />
                <Route path='/compras' element={<ComprasPage />} />
                <Route path='/gastos' element={<GastosPage />} />
                <Route path='/reportes' element={<ReportesPage />} />
                <Route
                  path='/reporte-cartera-vencida'
                  element={<ReporteCarteraVencidaPage />}
                />
                <Route path='/usuarios' element={<UsuariosPage />} />
                <Route path='/roles' element={<RolesPage />} />
                <Route path='/modulos' element={<ModulosPage />} />
                <Route path='/logs' element={<ModuloConstruccion />} />
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
      </Suspense>
    </BrowserRouter>
  )
}
