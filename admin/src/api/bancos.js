import { apiClient } from './configAxios'

// Crear un registro
export const createBanco = async (data) => {
  try {
    const response = await apiClient.post('bancos', data)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getBanco = async () => {
  try {
    const response = await apiClient.get('bancos')
    return response.data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateBanco = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`bancos/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeBanco = async (id) => {
  try {
    const response = await apiClient.delete(`bancos/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
