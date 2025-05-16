export const formOptions = {
  generalFields: [
    {
      required: false,
      type: 'text',
      label: 'Orden de servicio',
      name: 'idServicio'
    },
    { required: false, type: 'text', label: 'Guardia', name: 'nombre' },
    {
      required: false,
      type: 'text',
      label: 'No. empleado',
      name: 'numeroEmpleado'
    },
    {
      required: false,
      type: 'datetime-local',
      label: 'Fecha y hora de check',
      name: 'fecha'
    },
    {
      required: false,
      type: 'text',
      label: 'Tipo de check',
      name: 'tipo'
    },
    {
      required: false,
      type: 'textarea',
      label: 'Ubicación',
      name: 'ubicacion'
    },
    {
      required: false,
      type: 'textarea',
      label: 'Comentarios',
      name: 'comentarios'
    }
  ]
}
