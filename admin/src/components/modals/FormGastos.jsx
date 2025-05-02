import { useModal } from '../../hooks/useModal'
import { formOptions } from '../../utils/formGastosOptions'
import { AlertaCard } from '../AlertaCard'
import { InputField } from '../InputField'
import { SwitchInput } from '../SwitchInput'
import { ButtonsModal } from './ButtonsModal'
import { CancelButtonModal } from './CancelButtonModal'

export const FormGastos = () => {
  const { view, formData, handleInputChange, loadOptionsBancos } = useModal()

  return (
    <>
      <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
        <SwitchInput value='impuesto' card='Impuesto' text='¿Pago + IVA?' />

        <div className='sm:col-span-6 md:col-span-2'>
          <AlertaCard text='Datos de gastos' />
        </div>

        {formOptions.generalFields.map(
          ({ type, label, name, required, step, opcSelect }) => (
            <InputField
              key={name}
              type={type}
              label={label}
              name={name}
              step={step}
              required={required}
              value={formData[name] || ''}
              opcSelect={opcSelect}
              loadOptions={loadOptionsBancos}
              onChange={handleInputChange}
              disabled={view}
              classInput='md:col-span-1'
            />
          )
        )}
      </div>
      <hr className='text-gray-300' />
      {view ? <CancelButtonModal /> : <ButtonsModal />}
    </>
  )
}
