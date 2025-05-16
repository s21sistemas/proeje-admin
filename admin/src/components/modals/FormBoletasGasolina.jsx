import { useModal } from '../../hooks/useModal'
import { formOptions } from '../../utils/formBoletasGasolinaOptions'
import { InputField } from '../InputField'
import { ButtonsModal } from './ButtonsModal'
import { CancelButtonModal } from './CancelButtonModal'

export const FormBoletasGasolina = () => {
  const { view, edit, formData, handleInputChange, loadOptionsVehiculos } =
    useModal()

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
              step={step}
              value={formData[name] || ''}
              onChange={handleInputChange}
              loadOptions={loadOptionsVehiculos}
              disabled={
                name === 'costo_total'
                  ? true
                  : edit && name === 'vehiculo_id'
                  ? true
                  : view
              }
              classInput='md:col-span-2'
            />
          )
        )}

        <InputField
          type='textarea'
          label='Observaciones'
          name='observaciones'
          required={false}
          value={formData.observaciones || ''}
          onChange={handleInputChange}
          loadOptions={loadOptionsVehiculos}
          disabled={view}
          classInput='md:col-span-2'
        />
      </div>
      <hr className='text-gray-300' />
      {view ? <CancelButtonModal /> : <ButtonsModal />}
    </>
  )
}
