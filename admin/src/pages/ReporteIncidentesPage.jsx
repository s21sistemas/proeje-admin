import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { useModal } from '../hooks/useModal'
import { useIncidentes } from '../hooks/useIncidentes'
import { FormIncidentes } from '../components/modals/FormIncidentes'

const columns = [
  { key: 'servicioId', name: 'Orden' },
  { key: 'guardia', name: 'Nombre' },
  { key: 'fecha_format', name: 'Fecha' },
  { key: 'incidente', name: 'Incidente' },
  { key: 'causa', name: 'Causa' },
  { key: 'turno', name: 'Turno' }
]

export default function ReporteIncidentesPage() {
  const { modalType } = useModal()

  const { data, isLoading, isError, error } = useIncidentes()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Reporte de incidentes de guardias'
        loading={isLoading}
      />

      {modalType === 'view' && <BaseForm Inputs={<FormIncidentes />} />}
    </div>
  )
}
