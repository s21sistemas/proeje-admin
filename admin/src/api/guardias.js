import { generarCodigoAcceso } from '../utils/generarCodigoAcceso'
import { apiClient, apiClientForm } from './configAxios'

// Crear un registro
export const createGuardia = async (data) => {
  try {
    const passwordSegura = generarCodigoAcceso()

    const formData = new FormData()
    formData.append('nombre', data.nombre)
    formData.append('apellido_p', data.apellido_p)
    formData.append('apellido_m', data.apellido_m)
    formData.append('correo', data.correo)
    formData.append('calle', data.calle)
    formData.append('numero', data.numero)
    formData.append('colonia', data.colonia)
    formData.append('cp', data.cp)
    formData.append('municipio', data.municipio)
    formData.append('estado', data.estado)
    formData.append('pais', data.pais)
    formData.append('telefono', data.telefono)
    formData.append('enfermedades', data.enfermedades)
    formData.append('alergias', data.alergias)
    formData.append('edad', data.edad)
    formData.append('telefono_emergencia', data.telefono_emergencia)
    formData.append('contacto_emergencia', data.contacto_emergencia)
    formData.append('codigo_acceso', passwordSegura)
    formData.append('foto', data.foto)
    formData.append('curp', data.curp)
    formData.append('ine', data.ine)
    formData.append('estatus', data.estatus)
    formData.append('rango', data.rango)
    formData.append('acta_nacimiento', data.acta_nacimiento)
    formData.append('comprobante_domicilio', data.comprobante_domicilio)
    formData.append(
      'constancia_situacion_fiscal',
      data.constancia_situacion_fiscal
    )

    if (data?.comprobante_estudios) {
      formData.append('comprobante_estudios', data.comprobante_estudios)
    }
    if (data?.carta_recomendacion) {
      formData.append('carta_recomendacion', data.carta_recomendacion)
    }
    if (data?.antecedentes_no_penales) {
      formData.append('antecedentes_no_penales', data.antecedentes_no_penales)
    }
    if (data?.otro_archivo) {
      formData.append('otro_archivo', data.otro_archivo)
    }
    if (data?.fecha_antidoping) {
      formData.append('fecha_antidoping', data.fecha_antidoping)
    }
    if (data?.antidoping) {
      formData.append('antidoping', data.antidoping)
    }

    const response = await apiClientForm.post('guardias', formData)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getGuardias = async () => {
  try {
    const response = await apiClient.get('guardias')
    const { data } = response

    const newData = Array.isArray(data)
      ? data.map((guardia) => ({
          ...guardia,
          nombre_completo: `${guardia.nombre} ${guardia.apellido_p} ${guardia.apellido_m}`,
          direccion_completa: `${guardia.calle} ${guardia.numero} ${guardia.colonia} ${guardia.cp}`
        }))
      : []

    return newData
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros de guardias
export const getGuardiasRango = async () => {
  try {
    const response = await apiClient.get('guardias-rango')
    const { data } = response

    const newData = Array.isArray(data)
      ? data.map((guardia) => ({
          ...guardia,
          nombre_completo: `${guardia.nombre} ${guardia.apellido_p} ${guardia.apellido_m}`
        }))
      : []

    return newData
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros supervisores
export const getSupervisores = async () => {
  try {
    const response = await apiClient.get('guardias-supervisor')
    const { data } = response

    const newData = Array.isArray(data)
      ? data.map((guardia) => ({
          ...guardia,
          nombre_completo: `${guardia.nombre} ${guardia.apellido_p} ${guardia.apellido_m}`
        }))
      : []

    return newData
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros jefes de grupo
export const getJefeGrupo = async () => {
  try {
    const response = await apiClient.get('guardias-jefegrupo')
    const { data } = response

    const newData = Array.isArray(data)
      ? data.map((guardia) => ({
          ...guardia,
          nombre_completo: `${guardia.nombre} ${guardia.apellido_p} ${guardia.apellido_m}`
        }))
      : []

    return newData
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateGuardia = async (data) => {
  try {
    const { id } = data

    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('nombre', data.nombre)
    formData.append('apellido_p', data.apellido_p)
    formData.append('apellido_m', data.apellido_m)
    formData.append('correo', data.correo)
    formData.append('calle', data.calle)
    formData.append('numero', data.numero)
    formData.append('colonia', data.colonia)
    formData.append('cp', data.cp)
    formData.append('municipio', data.municipio)
    formData.append('estado', data.estado)
    formData.append('pais', data.pais)
    formData.append('telefono', data.telefono)
    formData.append('enfermedades', data.enfermedades)
    formData.append('alergias', data.alergias)
    formData.append('edad', data.edad)
    formData.append('telefono_emergencia', data.telefono_emergencia)
    formData.append('contacto_emergencia', data.contacto_emergencia)
    formData.append('estatus', data.estatus)
    formData.append('rango', data.rango)

    if (data.foto instanceof File) {
      formData.append('foto', data.foto)
    }
    if (data.curp instanceof File) {
      formData.append('curp', data.curp)
    }
    if (data.ine instanceof File) {
      formData.append('ine', data.ine)
    }
    if (data.acta_nacimiento instanceof File) {
      formData.append('acta_nacimiento', data.acta_nacimiento)
    }
    if (data.comprobante_domicilio instanceof File) {
      formData.append('comprobante_domicilio', data.comprobante_domicilio)
    }
    if (data.constancia_situacion_fiscal instanceof File) {
      formData.append(
        'constancia_situacion_fiscal',
        data.constancia_situacion_fiscal
      )
    }
    if (data.comprobante_estudios instanceof File) {
      formData.append('comprobante_estudios', data.comprobante_estudios)
    }
    if (data.carta_recomendacion instanceof File) {
      formData.append('carta_recomendacion', data.carta_recomendacion)
    }
    if (data.antecedentes_no_penales instanceof File) {
      formData.append('antecedentes_no_penales', data.antecedentes_no_penales)
    }
    if (data.otro_archivo instanceof File) {
      formData.append('otro_archivo', data.otro_archivo)
    }
    if (data?.fecha_antidoping) {
      formData.append('fecha_antidoping', data.fecha_antidoping)
    }
    if (data.antidoping instanceof File) {
      formData.append('antidoping', data.antidoping)
    }

    const response = await apiClientForm.post(`guardias/${id}`, formData)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeGuardia = async (id) => {
  try {
    const response = await apiClient.delete(`guardias/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
