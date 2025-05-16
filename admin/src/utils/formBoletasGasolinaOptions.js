export const formOptions = {
  generalFields: [
    // {
    //   required: true,
    //   type: 'async',
    //   label: 'Selecciona el banco *',
    //   name: 'banco_id'
    // },
    {
      required: true,
      type: 'async',
      label: 'Selecciona el vehículo *',
      name: 'vehiculo_id'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Kilometraje *',
      name: 'kilometraje'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Litros de gasolina *',
      name: 'litros'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Costo por litro *',
      name: 'costo_litro'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Total *',
      name: 'costo_total'
    }
  ]
}
