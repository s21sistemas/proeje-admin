import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { useModal } from '../hooks/useModal'
import { useBitacoras } from '../hooks/useBitacoras'
import { FormBitacoras } from '../components/modals/FormBitacoras'

const columns = [
  { key: 'guardia', name: 'Supervisor' },
  { key: 'inicio_format', name: 'Inicio recorrdio' },
  { key: 'fin_format', name: 'Fin recorrido' },
  { key: 'patrulla', name: 'Patrulla' },
  { key: 'servicio', name: 'Servicio' },
  { key: 'zona', name: 'Zona' }
]

export default function BitacorasPage() {
  const { modalType } = useModal()

  const { data, isLoading, isError, error } = useBitacoras()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Bitácoras de guardias'
        loading={isLoading}
      />

      {modalType === 'view' && <BaseForm Inputs={<FormBitacoras />} />}
    </div>
  )
}
