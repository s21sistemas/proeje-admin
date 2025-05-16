import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { useModal } from '../hooks/useModal'
import { useGuardiasCheck } from '../hooks/useGuardiasCheck'
import { FormGuardiasCheck } from '../components/modals/FormGuardiasCheck'

const columns = [
  { key: 'idServicio', name: 'Orden de servicio' },
  { key: 'guardia', name: 'Guardia' },
  { key: 'check', name: 'Fecha check' },
  { key: 'tipo', name: 'Tipo de check' }
]

export default function GuardiasCheckPage() {
  const { modalType } = useModal()

  const { data, isLoading, isError, error } = useGuardiasCheck()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Entrada y salida de guardias'
        loading={isLoading}
      />

      {modalType === 'view' && <BaseForm Inputs={<FormGuardiasCheck />} />}
    </div>
  )
}
