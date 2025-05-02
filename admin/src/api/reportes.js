import { apiClient } from './configAxios'

export const getReporte = async (info) => {
  try {
    const response = await apiClient.post('generador-reportes', info)
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obtener el registro', error)
    throw new Error(error.response.data.message)
  }
}
