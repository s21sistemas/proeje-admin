export const formOptions = {
  generalFields: [
    {
      required: true,
      type: 'async',
      label: 'Selecciona al guardia *',
      name: 'guardia_id'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Monto del prestamo *',
      name: 'monto_total'
    },
    {
      required: true,
      type: 'number',
      label: 'Número de pagos acordados *',
      name: 'numero_pagos'
    },
    {
      required: true,
      type: 'date',
      label: 'Fecha del prestamo *',
      name: 'fecha_prestamo'
    },
    {
      required: true,
      type: 'async',
      label: 'Selecciona el motivo *',
      name: 'modulo_prestamo_id'
    },
    {
      required: false,
      type: 'textarea',
      label: 'Observaciones',
      name: 'observaciones'
    }
  ],

  editFields: [
    {
      required: false,
      type: 'date',
      label: 'Fecha del préstamo liquidado',
      name: 'fecha_pagado'
    },
    {
      required: true,
      type: 'select',
      label: 'Estatus',
      name: 'estatus',
      opcSelect: [
        { label: 'Pendiente', value: 'Pendiente' },
        { label: 'Pagado', value: 'Pagado' }
      ]
    }
  ]
}
