import { FileDown, Plus, Search } from 'lucide-react'
import { useModal } from '../hooks/useModal'
import { useTable } from '../hooks/useTable'
import { useLocation } from 'react-router'
import { useEffect } from 'react'
import { useReportes } from '../hooks/useReportes'
import { useAuth } from '../context/AuthContext'
import { hasPermission } from '../helpers/permissions'
import { EXCLUDE_CREATE } from '../routes/exclusiones'
import { isExcluded } from '../utils/routeUtils'

export const SearchBar = ({ title, data }) => {
  const { user } = useAuth()
  const { generateReportCartera } = useReportes()
  const { search, pathname } = useLocation()
  const { openModal } = useModal()
  const { searchTerm, setSearchTerm, setCurrentPage } = useTable()

  const searchValue = () => {
    if (search !== '') {
      const nombre = search.split('=')[1]

      setSearchTerm(nombre?.replaceAll('%20', ' '))
    } else {
      setSearchTerm('')
    }

    return
  }

  useEffect(() => {
    searchValue()
  }, [])

  return (
    <div className='mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
      <h1 className='text-2xl font-semibold text-gray-900 mb-4 sm:mb-0'>
        {title}
      </h1>
      <div className='flex flex-col sm:flex-row gap-3'>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Search className='h-5 w-5 text-gray-400' />
          </div>
          <input
            type='text'
            placeholder='Buscar...'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          />
        </div>
        {hasPermission(user, pathname, 'crear') &&
          !isExcluded(pathname, EXCLUDE_CREATE) && (
            <button
              onClick={() => openModal('add')}
              className='cursor-pointer flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              <Plus className='h-5 w-5 mr-2' />
              Agregar
            </button>
          )}

        {pathname === '/reporte-cartera-vencida' && (
          <button
            onClick={() => generateReportCartera(data)}
            className='cursor-pointer flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3674B5] hover:bg-[#285381] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#285381]'
          >
            <FileDown className='h-5 w-5 mr-2' />
            Exportar datos
          </button>
        )}
      </div>
    </div>
  )
}
