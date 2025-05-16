import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { useModal } from '../hooks/useModal'
import { useReportesGuardia } from '../hooks/useReportesGuardia'
import { FormReporteGuardia } from '../components/modals/FormReporteGuardia'

const columns = [
  { key: 'servicioId', name: 'Orden' },
  { key: 'guardia', name: 'Nombre' },
  { key: 'supervisor', name: 'Supervisor' },
  { key: 'puntoVigilancia', name: 'Punto de vigilancia' },
  { key: 'turno', name: 'Turno' },
  { key: 'fecha_format', name: 'Fecha' }
]

export default function ReporteGuardiasPage() {
  const { modalType } = useModal()

  const { data, isLoading, isError, error } = useReportesGuardia()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Reporte de guardias'
        loading={isLoading}
      />

      {modalType === 'view' && <BaseForm Inputs={<FormReporteGuardia />} />}
    </div>
  )
}
