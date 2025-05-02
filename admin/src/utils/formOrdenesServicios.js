export const formOptions = {
  generalFields: [
    // {
    //   required: true,
    //   type: 'async',
    //   label: 'Selecciona al proveedor *',
    //   name: 'proveedor_id'
    // },
    // {
    //   required: true,
    //   type: 'async',
    //   label: 'Selecciona el banco *',
    //   name: 'banco_id'
    // },
    // {
    //   required: true,
    //   type: 'async',
    //   label: 'Selecciona el articulo *',
    //   name: 'articulo_id'
    // },
    {
      required: true,
      type: 'async',
      label: 'Selecciona la empresa (cotización aceptada) *',
      name: 'venta_id'
    },
    {
      required: true,
      type: 'textarea',
      label: 'Domicilio del servicio *',
      name: 'domicilio_servicio'
    },
    {
      required: true,
      type: 'datetime-local',
      label: 'Fecha de inicio del servicio *',
      name: 'fecha_inicio'
    },
    {
      required: true,
      type: 'datetime-local',
      label: 'Fecha del fin del servicio *',
      name: 'fecha_fin'
    },
    {
      required: true,
      type: 'text',
      label: 'Nombre de la persona responsable en sitio *',
      name: 'nombre_responsable_sitio'
    },
    {
      required: true,
      type: 'number',
      label: 'Teléfono de la persona responsable en sitio *',
      name: 'telefono_responsable_sitio'
    },
    {
      required: false,
      type: 'textarea',
      label: 'Observaciones',
      name: 'observaciones'
    }
  ],

  rfcFields: [
    {
      required: false,
      type: 'text',
      label: 'RFC *',
      name: 'rfc'
    },
    {
      required: false,
      type: 'text',
      label: 'Razón social *',
      name: 'razon_social'
    },
    {
      required: false,
      type: 'text',
      label: 'Uso de CFDI *',
      name: 'uso_cfdi'
    },
    {
      required: false,
      type: 'text',
      label: 'Regimen fiscal *',
      name: 'regimen_fiscal'
    }
  ]
}
