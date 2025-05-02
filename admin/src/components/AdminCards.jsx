import { ShieldUser, UserRoundPen, UsersRound, Shirt } from 'lucide-react'
import { useCountPage } from '../hooks/useCountPage'

export const AdminCards = () => {
  const { isError, data, isLoading } = useCountPage()
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
      <div className='bg-white rounded-lg shadow p-4'>
        <div className='flex items-center'>
          <div className='p-3 rounded-full bg-blue-100 text-blue-500'>
            <UserRoundPen className='h-6 w-6' />
          </div>
          <div className='ml-4'>
            <p className='text-sm font-medium text-gray-500'>Clientes</p>
            <p className='text-2xl font-semibold text-gray-900'>
              {isError || isLoading ? 0 : data.clientes}
            </p>
          </div>
        </div>
      </div>
      <div className='bg-white rounded-lg shadow p-4'>
        <div className='flex items-center'>
          <div className='p-3 rounded-full bg-green-100 text-green-500'>
            <UsersRound className='h-6 w-6' />
          </div>
          <div className='ml-4'>
            <p className='text-sm font-medium text-gray-500'>Proveedores</p>
            <p className='text-2xl font-semibold text-gray-900'>
              {isError || isLoading ? 0 : data.proveedores}
            </p>
          </div>
        </div>
      </div>
      <div className='bg-white rounded-lg shadow p-4'>
        <div className='flex items-center'>
          <div className='p-3 rounded-full bg-yellow-100 text-yellow-500'>
            <ShieldUser className='h-6 w-6' />
          </div>
          <div className='ml-4'>
            <p className='text-sm font-medium text-gray-500'>Guardias</p>
            <p className='text-2xl font-semibold text-gray-900'>
              {isError || isLoading ? 0 : data.guardias}
            </p>
          </div>
        </div>
      </div>
      <div className='bg-white rounded-lg shadow p-4'>
        <div className='flex items-center'>
          <div className='p-3 rounded-full bg-purple-100 text-purple-500'>
            <Shirt className='h-6 w-6' />
          </div>
          <div className='ml-4'>
            <p className='text-sm font-medium text-gray-500'>Articulos</p>
            <p className='text-2xl font-semibold text-gray-900'>
              {isError || isLoading ? 0 : data.articulos}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
