import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { useModal } from '../hooks/useModal'
import { useReportesSupervisor } from '../hooks/useReportesSupervisor'
import { FormReporteSupervisor } from '../components/modals/FormReporteSupervisor'

const columns = [
  { key: 'servicioId', name: 'Orden' },
  { key: 'supervisorId', name: 'Supervisor' },
  { key: 'tipo', name: 'Tipo' },
  { key: 'zona', name: 'Zona' },
  { key: 'turno', name: 'Turno' },
  { key: 'fecha', name: 'Fecha' }
]

export default function ReporteSupervisoresPage() {
  const { modalType } = useModal()

  const { data, isLoading, isError, error } = useReportesSupervisor()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Reporte de supervisores'
        loading={isLoading}
      />

      {modalType === 'view' && <BaseForm Inputs={<FormReporteSupervisor />} />}
    </div>
  )
}
