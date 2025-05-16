import { useModal } from '../../hooks/useModal'
import { formOptions } from '../../utils/formPrestamosOptions'
import { InputField } from '../InputField'
import { ButtonsModal } from './ButtonsModal'
import { CancelButtonModal } from './CancelButtonModal'

export const FormPrestamos = () => {
  const {
    view,
    document,
    formData,
    handleInputChange,
    loadOptionsTodosGuardias,
    loadOptionsModuloPrestamo
  } = useModal()

  return (
    <>
      <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
        {formOptions.generalFields.map(
          ({ type, label, name, required, step }) => (
            <InputField
              key={name}
              type={type}
              label={label}
              name={name}
              required={required}
              value={formData[name] || ''}
              step={step}
              onChange={handleInputChange}
              loadOptions={
                name === 'guardia_id'
                  ? loadOptionsTodosGuardias
                  : loadOptionsModuloPrestamo
              }
              disabled={
                [
                  'monto_total',
                  'guardia_id',
                  'numero_pagos',
                  'fecha_prestamo'
                ].includes(name) && document
                  ? true
                  : view
              }
              classInput='md:col-span-2'
            />
          )
        )}

        {document &&
          formOptions.editFields.map(
            ({ type, label, name, required, opcSelect }) => (
              <InputField
                key={name}
                type={type}
                label={label}
                name={name}
                required={required}
                value={formData[name] || ''}
                opcSelect={opcSelect}
                onChange={handleInputChange}
                disabled={true}
              />
            )
          )}
      </div>
      <hr className='text-gray-300' />
      {view ? <CancelButtonModal /> : <ButtonsModal />}
    </>
  )
}
