export const formOptions = {
  personalFields: [
    { required: true, type: 'text', label: 'Nombre *', name: 'nombre' },
    {
      required: true,
      type: 'text',
      label: 'Apellido paterno *',
      name: 'apellido_p'
    },
    {
      required: true,
      type: 'text',
      label: 'Apellido materno *',
      name: 'apellido_m'
    },
    { required: true, type: 'number', label: 'Edad *', name: 'edad' },
    { required: true, type: 'number', label: 'Teléfono *', name: 'telefono' },
    { required: true, type: 'email', label: 'Correo *', name: 'correo' },
    {
      required: true,
      type: 'text',
      label: 'Enfermedades *',
      name: 'enfermedades'
    },
    { required: true, type: 'text', label: 'Alergias *', name: 'alergias' }
  ],

  direccionFields: [
    { required: true, type: 'text', label: 'Calle *', name: 'calle' },
    { required: true, type: 'text', label: 'Número *', name: 'numero' },
    { required: true, type: 'text', label: 'Colonia *', name: 'colonia' },
    { required: true, type: 'number', label: 'Código postal *', name: 'cp' }
  ],

  otrosFields: [
    {
      required: true,
      type: 'number',
      label: 'Teléfono de emergencia *',
      name: 'telefono_emergencia'
    },
    {
      required: true,
      type: 'text',
      label: 'Contacto de emergencia *',
      name: 'contacto_emergencia'
    }
  ],

  documentFields: [
    {
      required: true,
      type: 'file',
      label: 'CURP (PDF) *',
      name: 'curp',
      accept: 'application/pdf'
    },
    {
      required: true,
      type: 'file',
      label: 'INE (PDF) *',
      name: 'ine',
      accept: 'application/pdf'
    },
    {
      required: true,
      type: 'file',
      label: 'Acta de nacimiento (PDF) *',
      name: 'acta_nacimiento',
      accept: 'application/pdf'
    },
    {
      required: true,
      type: 'file',
      label: 'Comprobante de domicilio (PDF) *',
      name: 'comprobante_domicilio',
      accept: 'application/pdf'
    },

    {
      required: true,
      type: 'file',
      label: 'Constancia de situación fiscal (PDF) *',
      name: 'constancia_situacion_fiscal',
      accept: 'application/pdf'
    },
    {
      required: false,
      type: 'file',
      label: 'Comprobante de estudios (PDF)',
      name: 'comprobante_estudios',
      accept: 'application/pdf'
    },
    {
      required: false,
      type: 'file',
      label: 'Carta de recomendación (PDF)',
      name: 'carta_recomendacion',
      accept: 'application/pdf'
    },
    {
      required: false,
      type: 'file',
      label: 'Carta de antecedentes no penales (PDF)',
      name: 'antecedentes_no_penales',
      accept: 'application/pdf'
    },
    {
      required: false,
      type: 'file',
      label: 'Otro archivo (PDF)',
      name: 'otro_archivo',
      accept: 'application/pdf'
    }
  ],

  antodopingFields: [
    {
      required: false,
      type: 'file',
      label: 'Antidoping (PDF)',
      name: 'antidoping',
      accept: 'application/pdf'
    },
    {
      required: false,
      type: 'date',
      label: 'Fecha del último antidoping',
      name: 'fecha_antidoping'
    }
  ]
}
