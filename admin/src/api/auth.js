import { apiClient } from './configAxios'

// Iniciar sesión
export const loginRequest = async (credentials) => {
  try {
    const response = await apiClient.post('login', credentials)
    return response.data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Cerrar sesión
export const logoutRequest = async () => {
  try {
    const response = await apiClient.post('logout')
    return response.data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Obtener perfil del usuario autenticado
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('perfil')
    return response.data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}
