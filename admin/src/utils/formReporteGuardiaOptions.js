export const formOptions = {
  generalFields: [
    {
      required: false,
      type: 'text',
      label: 'Orden de servicio',
      name: 'idServicio'
    },
    { required: false, type: 'text', label: 'Guardia', name: 'nombreEmpleado' },
    {
      required: false,
      type: 'text',
      label: 'No. empleado',
      name: 'empleadoId'
    },
    {
      required: false,
      type: 'text',
      label: 'Supervisor',
      name: 'supervisor'
    },
    {
      required: false,
      type: 'text',
      label: 'Elemento que recibe el uniforme',
      name: 'elementoRecibe'
    },
    {
      required: false,
      type: 'text',
      label: 'Elemento que entrega el uniforme',
      name: 'elementoEntrega'
    },
    {
      required: false,
      type: 'date',
      label: 'Fecha',
      name: 'fecha'
    },
    {
      required: false,
      type: 'textarea',
      label: 'Equipo',
      name: 'equipo'
    },
    {
      required: false,
      type: 'text',
      label: 'Turno',
      name: 'turno'
    },
    {
      required: false,
      type: 'text',
      label: 'Punto de vigilancia',
      name: 'puntoVigilancia'
    }
  ]
}
