import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import dayjs from 'dayjs'

import { useState } from 'react'
import { getBanco } from '../api/bancos'
import { getReporte } from '../api/reportes'
import { getProveedor } from '../api/proveedores'

export const useReportes = () => {
  const [formReport, setFormReport] = useState({})

  const exportToExcel = (data, columns, sheetName, fileName) => {
    if (!data || data.length === 0) {
      toast.warning('No hay datos para exportar.')
      return
    }

    // Definir encabezados de la tabla
    const headers = [columns]

    // Crear hoja de Excel
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Agregar los encabezados
    XLSX.utils.sheet_add_aoa(worksheet, headers, { origin: 'A1' })

    // 📌 Ajustar el ancho de las columnas al tamaño del texto
    worksheet['!cols'] = columns.map((col) => ({ wch: col.length + 5 })) // Ajusta el ancho sumando 5 caracteres extra

    // Crear libro de Excel y añadir la hoja
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

    // Generar el archivo Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    })

    // Guardar el archivo
    const dataBlob = new Blob([excelBuffer], {
      type: 'application/octet-stream'
    })
    saveAs(dataBlob, fileName)
  }

  const handleInputChange = async (e, actionMeta) => {
    let name, value

    if (e.target) {
      ;({ name, value } = e.target)
    } else {
      name = actionMeta.name
      value = e || []
    }

    setFormReport((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const loadOptionsBancos = async () => {
    try {
      const response = await getBanco()
      const data = response.map((info) => ({
        value: info.id,
        label: info.nombre
      }))

      if (data.length > 0) data.unshift({ label: 'Todos', value: 'todos' })

      return data
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const loadOptionsProveedores = async () => {
    try {
      const response = await getProveedor()
      const data = response.map((info) => ({
        value: info.id,
        label: info.nombre_empresa
      }))

      if (data.length > 0) data.unshift({ label: 'Todos', value: 'todos' })

      return data
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const generateReport = async (form) => {
    try {
      const response = await getReporte(form)

      // Mapeo de módulos a funciones de transformación
      const dataTransformers = {
        movimientos: transformMovimientData,
        'orden-compra': transformOrderData,
        compras: transformPurchaseData,
        gastos: transformExpenseData,
        ventas: transformSalesData,
        almacen: transformInventoryData,
        equipo: transformEquipmentData
      }

      // Configuraciones de reporte por módulo
      const reportConfigs = {
        movimientos: {
          filename: 'Reporte de movimientos de banco',
          headers: [
            'Banco',
            'Tipo de movimiento',
            'Concepto',
            'Fecha del movimiento',
            'Referencia',
            'Método de pago',
            'Monto'
          ]
        },
        'orden-compra': {
          filename: 'Reporte de órdenes de compra',
          headers: [
            'Banco',
            'Proveedor',
            'Artículo',
            'Cantidad de artículos',
            'Precio x artículo',
            'Número de OC',
            'Método de pago',
            'Total',
            'Estatus'
          ]
        },
        compras: {
          filename: 'Reporte de compras',
          headers: [
            'Banco',
            'Proveedor',
            'Artículo',
            'Cantidad de artículos',
            'Precio x artículo',
            'Número de OC',
            'Método de pago',
            'Total'
          ]
        },
        gastos: {
          filename: 'Reporte de gastos',
          headers: ['Banco', 'Concepto', 'Método de pago', 'Total']
        },
        ventas: {
          filename: 'Reporte de ventas',
          headers: [
            'Nombre de empresa',
            'Número de factura',
            'Tipo de pago',
            'Método de pago',
            'Nota de crédito',
            'Fecha de cotización aceptada',
            'Fecha de vencimiento',
            'Estatus',
            'Motivo de cancelación',
            'Total'
          ]
        },
        almacen: {
          filename: 'Reporte de almacén',
          headers: [
            'Artículo',
            'Número de serie',
            'Fecha de entrada',
            'Fecha de salida',
            'Estatus',
            'Otra información'
          ]
        },
        equipo: {
          filename: 'Reporte de equipamiento',
          headers: [
            'Guardia',
            'Fecha de entrega',
            'Fecha de devolución',
            '¿Ya se regresó el equipo?',
            'Equipo asignado',
            'Otro'
          ]
        }
      }

      // Transformar datos según el módulo
      const transformer = dataTransformers[form.modulo] || (() => [])
      const data = response.map(transformer)

      // Obtener configuración del reporte
      const config = reportConfigs[form.modulo] || {}

      // Generar nombre de archivo con fecha
      const filename = `${config.filename} ${dayjs().format('DD-MM-YYYY')}.xlsx`

      // Exportar a Excel
      exportToExcel(data, config.headers, config.filename, filename)
    } catch (error) {
      toast.warning(error.message)
      console.error('Error generating report:', error)
    }
  }

  const generateReportCartera = async (form) => {
    const data = form.map((info) => ({
      cliente: info.cliente,
      sucursal: info.sucursal,
      numero_factura: info.numero_factura,
      nota_credito: info.nota_credito,
      fecha_emision: dayjs(info.fecha_emision).format('DD/MM/YYYY'),
      fecha_vencimiento_format: info.fecha_vencimiento_format,
      atraso: info.atraso,
      total_format: info.total_format,
      estatus: info.estatus
    }))

    const headers = [
      'Cliente',
      'Sucursal',
      'Número de factura',
      'Nota de crédito',
      'Fecha de cotización aceptada',
      'Fecha de vencimiento',
      'Días de atraso',
      'Total',
      'Estatus'
    ]

    const filename = `Reporte de cartera vencida ${dayjs().format(
      'DD-MM-YYYY'
    )}.xlsx`
    exportToExcel(data, headers, 'Reporte de cartera vencida', filename)

    // const newData =
  }

  // Funciones de transformación específicas por módulo
  function transformMovimientData(res) {
    return {
      banco: res.banco.nombre,
      tipo_movimiento: res.tipo_movimiento,
      concepto: res.concepto,
      fecha: formatDate(res.fecha),
      referencia: res.referencia || 'N/A',
      metodo_pago: res.metodo_pago,
      monto: formatCurrency(res.monto)
    }
  }

  function transformOrderData(res) {
    return {
      banco: res.banco.nombre,
      proveedor: res.proveedor.nombre_empresa,
      articulo: res.articulo.nombre,
      cantidad_articulo: res.cantidad_articulo,
      precio_articulo: formatCurrency(res.precio_articulo),
      numero_oc: res.numero_oc,
      metodo_pago: res.metodo_pago,
      total: formatCurrency(res.total),
      estatus: res.estatus
    }
  }

  function transformPurchaseData(res) {
    const data = transformOrderData(res)
    delete data.estatus
    return data
  }

  function transformExpenseData(res) {
    return {
      banco: res.banco.nombre,
      concepto: res.concepto,
      metodo_pago: res.metodo_pago,
      total: formatCurrency(res.total)
    }
  }

  function transformSalesData(res) {
    const nombre_empresa =
      res?.cotizacion?.sucursal?.nombre_empresa ||
      res?.cotizacion?.nombre_empresa ||
      'N/A'

    const fecha_vencimiento =
      res.tipo_pago === 'Contado' ? 'N/A' : formatDate(res.fecha_vencimiento)

    return {
      nombre_empresa,
      numero_factura: res.numero_factura,
      tipo_pago: res.tipo_pago,
      metodo_pago: res.metodo_pago,
      nota_credito: res.nota_credito,
      fecha_emision: formatDate(res.fecha_emision),
      fecha_vencimiento,
      estatus: res.estatus,
      motivo_cancelada: res.motivo_cancelada || 'N/A',
      total: formatCurrency(res.total)
    }
  }

  function transformInventoryData(res) {
    return {
      articulo: res.articulo.nombre,
      numero_serie: res.numero_serie,
      fecha_entrada: formatDate(res.fecha_entrada, 'Sin entrada a almacén'),
      fecha_salida: formatDate(res.fecha_salida, 'Sin salida de almacén'),
      estado: res.estado,
      otra_informacion: res.otra_informacion || 'N/A'
    }
  }

  function transformEquipmentData(res) {
    return {
      guardia: formatGuardianName(res.guardia),
      fecha_entrega: formatDate(res.fecha_entrega),
      fecha_devuelto: formatDate(res.fecha_devuelto, 'Sin devolver'),
      devuelto: res.devuelto,
      equipo_asignado: formatAssignedEquipment(res.detalles),
      otro: res.otro || 'N/A'
    }
  }

  // Funciones utilitarias
  function formatCurrency(amount) {
    return `$${amount}`
  }

  function formatDate(date, fallback = 'N/A') {
    return date ? dayjs(date).format('DD/MM/YYYY') : fallback
  }

  function formatGuardianName(guardian) {
    if (!guardian) return 'N/A'
    return `${guardian.nombre} ${guardian.apellido_p} ${guardian.apellido_m}`.trim()
  }

  function formatAssignedEquipment(details) {
    if (!details || !details.length) return 'Ningún equipo asignado'
    return details
      .map((d) => `${d.articulo.nombre} (${d.numero_serie})`)
      .join(', ')
  }

  return {
    formReport,
    handleInputChange,
    loadOptionsBancos,
    loadOptionsProveedores,
    generateReport,
    generateReportCartera
  }
}
