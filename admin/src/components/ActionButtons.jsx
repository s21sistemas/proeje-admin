import {
  Ban,
  Edit,
  Eye,
  Image,
  LockOpen,
  Printer,
  ShieldOff,
  Trash2
} from 'lucide-react'
import { useModal } from '../hooks/useModal'
import { useLocation } from 'react-router'
import { API_HOST } from '../config'

export const ActionButtons = ({ data }) => {
  const { pathname } = useLocation()
  const { openModal } = useModal()

  return (
    <div className='flex justify-center space-x-2'>
      {pathname !== '/recorridos' && (
        <button
          title='Ver registro'
          onClick={() => openModal('view', data)}
          className='text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 cursor-pointer transition-all'
        >
          <Eye className='h-5 w-5' />
        </button>
      )}
      {pathname !== '/ventas-historial' &&
        pathname !== '/asignamiento-historial' &&
        pathname !== '/reporte-cartera-vencida' &&
        pathname !== '/logs' &&
        pathname !== '/recorridos' &&
        pathname !== '/guardias-check' &&
        pathname !== '/bitacoras-guardia' &&
        pathname !== '/reporte-incidentes' &&
        pathname !== '/reporte-guardias' &&
        pathname !== '/reporte-supervisores' && (
          <>
            <button
              title='Editar registro'
              onClick={() => openModal('edit', data)}
              className='text-green-600 hover:text-green-900 p-1 rounded-md hover:bg-green-50 cursor-pointer transition-all'
            >
              <Edit className='h-5 w-5' />
            </button>
            {pathname !== '/almacen-salidas' &&
              pathname !== '/almacen-entradas' &&
              pathname !== '/blacklist-guardias' && (
                <button
                  title='Eliminar registro'
                  onClick={() => openModal('delete', data)}
                  className='text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 cursor-pointer transition-all'
                >
                  <Trash2 className='h-5 w-5' />
                </button>
              )}
          </>
        )}

      {pathname === '/ventas' && (
        <button
          title='Cancelar venta'
          onClick={() => openModal('cancelar', data)}
          className='text-orange-600 hover:text-orange-900 p-1 rounded-md hover:bg-red-50 cursor-pointer transition-all'
        >
          <Ban className='h-5 w-5' />
        </button>
      )}
      {pathname === '/guardias' && (
        <button
          title='Mandar a lista negra'
          onClick={() => openModal('blacklist', data)}
          className='text-orange-600 hover:text-orange-900 p-1 rounded-md hover:bg-orange-50 cursor-pointer transition-all'
        >
          <ShieldOff className='h-5 w-5' />
        </button>
      )}
      {pathname === '/blacklist-guardias' && (
        <button
          title='Quitar de la lista negra'
          onClick={() => openModal('whitelist', data)}
          className='text-yellow-600 hover:text-yellow-900 p-1 rounded-md hover:bg-yellow-50 cursor-pointer transition-all'
        >
          <LockOpen className='h-5 w-5' />
        </button>
      )}
      {pathname === '/cotizaciones' && (
        <a
          title='Imprimir cotización'
          href={`${API_HOST}/api/pdf/cotizacion/${data.id}`}
          target='_blank'
          className='text-yellow-600 hover:text-yellow-900 p-1 rounded-md hover:bg-red-50 cursor-pointer transition-all'
        >
          <Printer className='h-5 w-5' />
        </a>
      )}
      {pathname === '/generar-qrs' && (
        <a
          title='Imprimir QRs'
          href={`${API_HOST}/ordenes-servicio/${data.orden_servicio.id}/pdf-qrs`}
          target='_blank'
          className='text-yellow-600 hover:text-yellow-900 p-1 rounded-md hover:bg-red-50 cursor-pointer transition-all'
        >
          <Printer className='h-5 w-5' />
        </a>
      )}
      {pathname === '/recorridos' &&
        (data.foto ? (
          <a
            title='Ver foto'
            href={data.foto}
            target='_blank'
            className='text-yellow-600 hover:text-yellow-900 p-1 rounded-md hover:bg-red-50 cursor-pointer transition-all'
          >
            <Image className='h-5 w-5' />
          </a>
        ) : (
          <p className='text-xs text-primary font-semibold'>
            No hay foto disponible
          </p>
        ))}
      {pathname === '/pagos-empleados' && (
        <a
          title='Imprimir comprobante de pago'
          href={`${API_HOST}/api/pdf/pagos-empleados/${data.id}`}
          target='_blank'
          className='text-yellow-600 hover:text-yellow-900 p-1 rounded-md hover:bg-red-50 cursor-pointer transition-all'
        >
          <Printer className='h-5 w-5' />
        </a>
      )}
    </div>
  )
}
