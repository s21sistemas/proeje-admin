import { Ban, Edit, Eye, Trash2 } from 'lucide-react'
import { useModal } from '../hooks/useModal'
import { useLocation } from 'react-router'

export const ActionButtons = ({ data }) => {
  const { pathname } = useLocation()
  const { openModal } = useModal()

  return (
    <div className='flex justify-center space-x-2'>
      <button
        title='Ver registro'
        onClick={() => openModal('view', data)}
        className='text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 cursor-pointer transition-all'
      >
        <Eye className='h-5 w-5' />
      </button>
      {pathname !== '/ventas-historial' &&
        pathname !== '/asignamiento-historial' &&
        pathname !== '/reporte-cartera-vencida' && (
          <>
            <button
              title='Editar registro'
              onClick={() => openModal('edit', data)}
              className='text-green-600 hover:text-green-900 p-1 rounded-md hover:bg-green-50 cursor-pointer transition-all'
            >
              <Edit className='h-5 w-5' />
            </button>
            {pathname !== '/almacen-salidas' &&
              pathname !== '/almacen-entradas' && (
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
    </div>
  )
}
