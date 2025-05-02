import { apiClient } from './configAxios'

// Crear un registro
export const createUsuario = async (data) => {
  try {
    const response = await apiClient.post('usuarios', data)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getUsuario = async () => {
  try {
    const response = await apiClient.get('usuarios')
    const { data } = response
    return data.map((user) => ({
      ...user,
      rol_id: { label: user.rol.nombre, value: user.rol.id },
      rol_asignado: user.rol.nombre
    }))
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateUsuario = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`usuarios/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeUsuario = async (id) => {
  try {
    const response = await apiClient.delete(`usuarios/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
