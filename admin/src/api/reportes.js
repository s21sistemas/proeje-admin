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

export const getReportRH = async (info) => {
  try {
    const response = await apiClient.post('reporte-rh', info)
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obtener el registro', error)
    throw new Error(error.response.data.message)
  }
}

export const getEstadoCuentaGuardia = async (info) => {
  try {
    const response = await apiClient.get('generar-estadocuenta-guardia', {
      params: {
        guardia_id: info.guardia_id,
        fecha_inicio: info.fecha_inicio,
        fecha_fin: info.fecha_fin
      }
    })
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obtener el registro', error)
    throw new Error(error.response.data.message)
  }
}

export const getEstadoCuentaCliente = async (info) => {
  try {
    const response = await apiClient.get('generar-estadocuenta-cliente', {
      params: {
        cliente_id: info.cliente_id,
        fecha_inicio: info.fecha_inicio,
        fecha_fin: info.fecha_fin
      }
    })
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obtener el registro', error)
    throw new Error(error.response.data.message)
  }
}

export const getEstadoCuentaProveedor = async (info) => {
  try {
    const response = await apiClient.get('generar-estadocuenta-proveedor', {
      params: {
        proveedor_id: info.proveedor_id,
        fecha_inicio: info.fecha_inicio,
        fecha_fin: info.fecha_fin
      }
    })
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obtener el registro', error)
    throw new Error(error.response.data.message)
  }
}

export const getEstadoCuentaBanco = async (info) => {
  try {
    const response = await apiClient.get('generar-estadocuenta-banco', {
      params: {
        banco_id: info.banco_id,
        fecha_inicio: info.fecha_inicio,
        fecha_fin: info.fecha_fin
      }
    })
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obtener el registro', error)
    throw new Error(error.response.data.message)
  }
}

export const getHorasTrabajadasGuardia = async (info) => {
  try {
    const response = await apiClient.get('generar-horastrabajadas-guardia', {
      params: {
        guardia_id: info.guardia_id,
        fecha_inicio: info.fecha_inicio,
        fecha_fin: info.fecha_fin
      }
    })
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obtener el registro', error)
    throw new Error(error.response.data.message)
  }
}
