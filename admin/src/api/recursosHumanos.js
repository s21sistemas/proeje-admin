import { apiClient } from './configAxios'

// Crear un registro
export const createRH = async (data) => {
  try {
    const response = await apiClient.post('recursos-humanos', data)
    return response.data
  } catch (error) {
    console.error('Error al crear el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getRH = async () => {
  try {
    const response = await apiClient.get('recursos-humanos')
    const { data } = response

    const newData = Array.isArray(data)
      ? data.map((rh) => ({
          ...rh,
          nombre_guardia: `${rh.guardia.nombre} ${rh.guardia.apellido_p} ${rh.guardia.apellido_m}`,
          guardia_id: {
            label: `${rh.guardia.nombre} ${rh.guardia.apellido_p} ${rh.guardia.apellido_m}`,
            value: rh.guardia.id
          },
          sueldo_format: `$${rh.sueldo}`
        }))
      : []

    return newData
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateRH = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`recursos-humanos/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeRH = async (id) => {
  try {
    const response = await apiClient.delete(`recursos-humanos/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
