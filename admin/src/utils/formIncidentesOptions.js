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
      label: 'Folio de incidente',
      name: 'folio'
    },
    {
      required: false,
      type: 'text',
      label: 'Incidente',
      name: 'incidente'
    },
    {
      required: false,
      type: 'text',
      label: 'Causa del incidente',
      name: 'causa'
    },
    {
      required: false,
      type: 'text',
      label: 'Turno del incidente',
      name: 'turno'
    },
    {
      required: false,
      type: 'text',
      label: 'Persona que reporta',
      name: 'personaReporta'
    },
    {
      required: false,
      type: 'text',
      label: 'Punto de vigilancia',
      name: 'puntoVigilancia'
    },
    {
      required: false,
      type: 'textarea',
      label: 'Ubicación',
      name: 'ubicacionIncidente'
    },
    {
      required: false,
      type: 'textarea',
      label: 'Acciones que se tomaron',
      name: 'accionesTomadas'
    },
    {
      required: false,
      type: 'textarea',
      label: 'Descripción',
      name: 'descripcion'
    },
    {
      required: false,
      type: 'textarea',
      label: 'Recomendaciones',
      name: 'recomendaciones'
    }
  ]
}
