import { useModal } from '../../hooks/useModal'
import { formOptions } from '../../utils/formPagoEmpleadoOptions'
import { AlertaCard } from '../AlertaCard'
import { InputField } from '../InputField'
import { ButtonsModal } from './ButtonsModal'
import { CancelButtonModal } from './CancelButtonModal'

export const FormPagosEmpleado = () => {
  const { view, edit, formData, handleInputChange, loadOptionsTodosGuardias } =
    useModal()

  return (
    <>
      <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
        <div className='sm:col-span-6 md:col-span-2'>
          <AlertaCard text='Datos del pago' />
        </div>
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
              loadOptions={loadOptionsTodosGuardias}
              disabled={name === 'guardia_id' && edit ? true : view}
              classInput='md:col-span-1'
            />
          )
        )}

        <div className='sm:col-span-6 md:col-span-2'>
          <AlertaCard text='Ingresos' />
        </div>
        {formOptions.ingresosFields.map(
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
              disabled={true}
              classInput='md:col-span-1'
            />
          )
        )}

        <div className='sm:col-span-6 md:col-span-2'>
          <AlertaCard text='Egresos' />
        </div>
        {formOptions.egresosFields.map(
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
              disabled={true}
              classInput='md:col-span-2'
            />
          )
        )}

        <div className='sm:col-span-6 md:col-span-2'>
          <AlertaCard text='Retenciones legales' />
        </div>
        {formOptions.retencionesFields.map(
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
              disabled={view}
              classInput='md:col-span-1'
            />
          )
        )}

        <div className='sm:col-span-6 md:col-span-2'>
          <AlertaCard text='Totales' />
        </div>
        {formOptions.totalesFields.map(
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
              disabled={true}
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
          disabled={view}
          classInput='md:col-span-2'
        />
      </div>
      <hr className='text-gray-300' />
      {view ? <CancelButtonModal /> : <ButtonsModal />}
    </>
  )
}
