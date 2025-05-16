import { useModal } from '../../hooks/useModal'
import { formOptions } from '../../utils/formIncidentesOptions'
import { AlertaCard } from '../AlertaCard'
import { InputField } from '../InputField'
import { ButtonsModal } from './ButtonsModal'
import { CancelButtonModal } from './CancelButtonModal'

export const FormIncidentes = () => {
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
            classInput='md:col-span-1'
          />
        ))}

        {formData?.fotos?.length > 0 && (
          <>
            <div className='sm:col-span-6 md:col-span-2'>
              <AlertaCard text='Fotos del incidente' />
            </div>

            {formData.fotos?.map((foto, index) => (
              <div
                className='sm:col-span-6 md:col-span-1 w-96 mx-auto'
                key={foto + index}
              >
                <div className='border-2 rounded-lg p-4 transition-all border-blue-500 flex flex-col items-center justify-center'>
                  <div className='w-full'>
                    <img
                      src={foto}
                      alt={`Foto ${index + 1} del incidente`}
                      className='max-h-60 mx-auto rounded-md object-contain'
                    />
                  </div>
                </div>
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
