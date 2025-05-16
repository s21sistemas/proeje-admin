import { useModal } from '../../hooks/useModal'
import { formOptions } from '../../utils/formReporteSupervisorOptions'
import { AlertaCard } from '../AlertaCard'
import { InputField } from '../InputField'
import { ButtonsModal } from './ButtonsModal'
import { CancelButtonModal } from './CancelButtonModal'

export const FormReporteSupervisor = () => {
  const { view, formData, handleInputChange } = useModal()

  return (
    <>
      <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
        {formOptions.generalFields.map(({ type, label, name, required }) => (
          <InputField
            key={name}
            type={type}
            label={label}
            name={name}
            required={required}
            value={formData[name] || ''}
            onChange={handleInputChange}
            disabled={view}
            classInput='md:col-span-3'
          />
        ))}

        {formData?.proyeccion?.length > 0 && (
          <>
            <div className='sm:col-span-6 md:col-span-2'>
              <AlertaCard text='Proyecciones' />
            </div>

            {formData?.proyeccion?.map((proyec, index) => (
              <div
                key={`proyeccion-${index}`}
                className='md:col-span-3 border border-gray-300 p-4 rounded-lg shadow-sm bg-white'
              >
                <ul className='list-disc pl-5 text-sm text-gray-800'>
                  <li>
                    <strong>¿Quién cubre?</strong> {proyec.cubre}
                  </li>
                  <li>
                    <strong>¿Quién falta?</strong> {proyec.faltas}
                  </li>
                  <li>
                    <strong>Servicio</strong> {proyec.servicio}
                  </li>
                </ul>
              </div>
            ))}
          </>
        )}

        {formData?.consignas?.length > 0 && (
          <>
            <div className='sm:col-span-6 md:col-span-2'>
              <AlertaCard text='Consignas' />
            </div>

            {formData?.consignas?.map((consigna, index) => (
              <div
                key={`consignas-${index}`}
                className='md:col-span-3 border border-gray-300 p-4 rounded-lg shadow-sm bg-white'
              >
                <ul className='list-disc pl-5 text-sm text-gray-800'>
                  <li>
                    <strong>Consigna {index + 1}:</strong>{' '}
                    {consigna?.texto ? consigna.texto : consigna}
                  </li>
                </ul>
              </div>
            ))}
          </>
        )}

        {formData?.observaciones?.length > 0 && (
          <>
            <div className='sm:col-span-6 md:col-span-2'>
              <AlertaCard text='Observaciones' />
            </div>

            {formData?.observaciones?.map((observacion, index) => (
              <div
                key={`observaciones-${index}`}
                className='md:col-span-3 border border-gray-300 p-4 rounded-lg shadow-sm bg-white'
              >
                <ul className='list-disc pl-5 text-sm text-gray-800'>
                  <li>
                    <strong>Observación {index + 1}:</strong>{' '}
                    {observacion?.texto ? observacion.texto : observacion}
                  </li>
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
      <hr className='text-gray-300' />
      {view ? <CancelButtonModal /> : <ButtonsModal />}
    </>
  )
}
