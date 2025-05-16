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
      label: 'Sueldo base *',
      name: 'sueldo_base'
    },
    {
      required: true,
      type: 'date',
      label: 'Periodo de inicio del pago *',
      name: 'periodo_inicio'
    },
    {
      required: true,
      type: 'date',
      label: 'Periodo del fin del pago *',
      name: 'periodo_fin'
    }
  ],

  ingresosFields: [
    {
      required: true,
      step: '0.01',
      type: 'number',
      label: 'Total por días trabajados *',
      name: 'dias_trabajados'
    },
    {
      required: true,
      step: '0.01',
      type: 'number',
      label: 'Total por tiempo extra *',
      name: 'tiempo_extra'
    },
    {
      required: true,
      step: '0.01',
      type: 'number',
      label: 'Total de prima vacacional *',
      name: 'prima_vacacional'
    },
    {
      required: true,
      step: '0.01',
      type: 'number',
      label: 'Incapacidades pagadas *',
      name: 'incapacidades_pagadas'
    }
  ],

  egresosFields: [
    {
      required: true,
      step: '0.01',
      type: 'number',
      label: 'Descuentos *',
      name: 'descuentos'
    },
    {
      required: true,
      step: '0.01',
      type: 'number',
      label: 'Descuento por faltas *',
      name: 'faltas'
    },
    {
      required: true,
      step: '0.01',
      type: 'number',
      label: 'Incapacidades no pagadas *',
      name: 'incapacidades_no_pagadas'
    }
  ],

  retencionesFields: [
    {
      required: true,
      step: '0.01',
      type: 'number',
      label: 'IMSS *',
      name: 'imss'
    },
    {
      required: true,
      step: '0.01',
      type: 'number',
      label: 'INFONAVIT *',
      name: 'infonavit'
    },
    {
      required: true,
      step: '0.01',
      type: 'number',
      label: 'FONACOT *',
      name: 'fonacot'
    },
    {
      required: true,
      step: '0.01',
      type: 'number',
      label: 'Retención de impuestos *',
      name: 'retencion_isr'
    }
  ],

  totalesFields: [
    {
      required: true,
      step: '0.01',
      type: 'number',
      label: 'Total de ingresos *',
      name: 'total_ingresos'
    },
    {
      required: true,
      step: '0.01',
      type: 'number',
      label: 'Total de egresos *',
      name: 'total_egresos'
    },
    {
      required: true,
      step: '0.01',
      type: 'number',
      label: 'Total de retenciones *',
      name: 'total_retenciones'
    },
    {
      required: true,
      step: '0.01',
      type: 'number',
      label: 'Pago bruto (ingresos - egresos) *',
      name: 'pago_bruto'
    },
    {
      required: true,
      step: '0.01',
      type: 'number',
      label: 'Pago final (bruto - retenciones) *',
      name: 'pago_final'
    }
  ]
}
