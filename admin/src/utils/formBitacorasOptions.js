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
      name: 'inicioRecorrido'
    },
    {
      required: false,
      type: 'datetime-local',
      label: 'Fecha y hora de check',
      name: 'finRecorrido'
    },
    {
      required: false,
      type: 'text',
      label: 'Kilometraje',
      name: 'kilometraje'
    },
    {
      required: false,
      type: 'text',
      label: 'Litros de carga',
      name: 'litrosCarga'
    },
    {
      required: false,
      type: 'text',
      label: 'Patrulla',
      name: 'patrulla'
    },
    {
      required: false,
      type: 'text',
      label: 'Servicio',
      name: 'servicio'
    },
    {
      required: false,
      type: 'text',
      label: 'Zona',
      name: 'zona'
    }
  ]
}
