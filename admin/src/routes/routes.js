import {
  Archive,
  BarChart3,
  BookOpenText,
  Landmark,
  ShieldUser,
  ShoppingBasket,
  UserRoundPen,
  UsersRound,
  ArrowRightLeft,
  FolderClock,
  DollarSign,
  Handshake,
  Settings,
  FileText,
  Wallet
} from 'lucide-react'

export const routes = [
  { path: '/', label: 'Dashboard', Icon: BarChart3 },
  {
    label: 'Personal',
    Icon: ShieldUser,
    children: [
      { label: 'Guardias', path: '/guardias' },
      { label: 'Recursos Humanos', path: '/recursos-humanos' },
      { label: 'Equipo asignado', path: '/equipo' }
    ]
  },
  {
    label: 'Clientes',
    Icon: UserRoundPen,
    children: [
      { path: '/clientes', label: 'Clientes' },
      { path: '/sucursales', label: 'Sucursales' }
    ]
  },
  { path: '/proveedores', label: 'Proveedores', Icon: UsersRound },
  {
    label: 'Servicios',
    Icon: Handshake,
    children: [
      { path: '/cotizaciones', label: 'Cotizaciones' },
      { path: '/ventas', label: 'Ventas' },
      { path: '/orden-servicio', label: 'Orden de servicio' }
    ]
  },
  {
    label: 'Inventario',
    Icon: Archive,
    children: [
      { path: '/articulos', label: 'Artículos' },
      { path: '/vehiculos', label: 'Vehículos' },
      { path: '/almacen', label: 'Almacen' },
      { path: '/almacen-entradas', label: 'Entradas' },
      { path: '/almacen-salidas', label: 'Salidas' }
    ]
  },
  {
    label: 'Finanzas',
    Icon: Landmark,
    children: [
      { path: '/bancos', label: 'Bancos' },
      { path: '/movimientos', label: 'Movimientos' }
    ]
  },
  {
    label: 'Operaciones',
    Icon: ArrowRightLeft,
    children: [
      { path: '/ordenes-compra', label: 'Ordenes de compra' },
      { path: '/compras', label: 'Compras' },
      { path: '/gastos', label: 'Gastos' }
    ]
  },

  {
    label: 'Configuración',
    Icon: Settings,
    children: [
      { path: '/usuarios', label: 'Usuarios' },
      { path: '/roles', label: 'Roles' },
      { path: '/modulos', label: 'Módulos' },
      { path: '/logs', label: 'Movimientos' }
    ]
  },
  { path: '/reportes', label: 'Reportes', Icon: FileText },
  {
    path: '/reporte-cartera-vencida',
    label: 'Cartera vencida',
    Icon: Wallet
  },
  {
    path: '/ventas-historial',
    label: 'Historial de ventas',
    Icon: FolderClock
  }
]
