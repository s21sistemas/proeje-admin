import { useLocation } from 'react-router'
import { useState, useEffect } from 'react'
import { useModalStore } from '../store/useModalStore'
import estadosData from '../utils/estados.json'
import estadosMunicipiosData from '../utils/municipios.json'
import { getCliente } from '../api/clientes'
import { getBanco } from '../api/bancos'
import { getProveedor } from '../api/proveedores'
import { getArticulo, getArticuloById } from '../api/articulos'
import { getSucursalByCliente } from '../api/sucursales'
import { getCotizacion } from '../api/cotizaciones'
import { toast } from 'sonner'
import { getVentaOrdenServicio } from '../api/ventas'
import {
  getGuardiasRango,
  getJefeGrupo,
  getSupervisores
} from '../api/guardias'
import { getRol } from '../api/roles'
import { getModulo } from '../api/modulos'

export const useModal = () => {
  const { pathname } = useLocation()

  const [initialLoad, setInitialLoad] = useState(false)
  const [articulosDisponibles, setArticulosDisponibles] = useState({})
  const [estados, setEstados] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [estadosMunicipios, setEstadosMunicipios] = useState({})
  const [selectOptions, setSelectOptions] = useState([
    { label: 'Selecciona una opción', value: '' }
  ])

  const getArtDis = useModalStore((state) => state.getArtDis)
  const modalType = useModalStore((state) => state.modalType)
  const setFormData = useModalStore((state) => state.setFormData)
  const setNestedFormData = useModalStore((state) => state.setNestedFormData)
  const formData = useModalStore((state) => state.formData)
  const openModal = useModalStore((state) => state.openModal)
  const closeModal = useModalStore((state) => state.closeModal)
  const currentItem = useModalStore((state) => state.currentItem)

  const view = modalType === 'view'
  const add = modalType === 'add'
  const edit = modalType === 'edit'
  const deleteModal = modalType === 'delete'
  const document = view || edit

  const aplicarImpuesto = (totalBase, aplicar) => {
    return aplicar ? totalBase * 1.16 : totalBase
  }

  const actualizarTotal = (
    subtotal,
    descuentoPorcentaje = 0,
    costoExtra = 0
  ) => {
    const descuento = (subtotal * descuentoPorcentaje) / 100
    const totalBase = subtotal - descuento + costoExtra

    setFormData('total_base', totalBase)
    const total = aplicarImpuesto(totalBase, formData?.impuesto)
    setFormData('total', total)
  }

  const handleInputChange = async (e, actionMeta) => {
    let name, value

    if (e.target) {
      ;({ name, value } = e.target)
    } else {
      name = actionMeta.name
      value = e || []
    }

    setFormData(name, value)

    if (name === 'guardias_dia' || name === 'guardias_noche') {
      const valor = parseInt(value) || 0
      const guardias_dia =
        name === 'guardias_dia' ? valor : formData.guardias_dia || 0
      const guardias_noche =
        name === 'guardias_noche' ? valor : formData.guardias_noche || 0
      const total = parseInt(guardias_dia) + parseInt(guardias_noche)
      setFormData('cantidad_guardias', total)
    } else if (
      name === 'precio_guardias_dia' ||
      name === 'precio_guardias_noche' ||
      name === 'precio_jefe_grupo' ||
      name === 'precio_supervisor'
    ) {
      const precio_guardias_dia =
        name === 'precio_guardias_dia'
          ? parseFloat(value) || 0
          : parseFloat(formData.precio_guardias_dia) || 0
      const precio_guardias_noche =
        name === 'precio_guardias_noche'
          ? parseFloat(value) || 0
          : parseFloat(formData.precio_guardias_noche) || 0
      const precio_jefe_grupo =
        name === 'precio_jefe_grupo'
          ? parseFloat(value) || 0
          : parseFloat(formData.precio_jefe_grupo) || 0
      const precio_supervisor =
        name === 'precio_supervisor'
          ? parseFloat(value) || 0
          : parseFloat(formData.precio_supervisor) || 0

      const subtotal =
        precio_guardias_dia +
        precio_guardias_noche +
        precio_jefe_grupo +
        precio_supervisor

      setFormData('subtotal', subtotal)
      actualizarTotal(
        subtotal,
        parseFloat(formData.descuento_porcentaje) || 0,
        parseFloat(formData.costo_extra) || 0
      )
    } else if (name === 'descuento_porcentaje') {
      const descuentoPorcentaje = parseFloat(value) || 0
      setFormData('descuento_porcentaje', descuentoPorcentaje)
      actualizarTotal(
        parseFloat(formData.subtotal) || 0,
        descuentoPorcentaje,
        parseFloat(formData.costo_extra) || 0
      )
    } else if (name === 'costo_extra') {
      const costoExtra = parseFloat(value) || 0
      setFormData('costo_extra', costoExtra)
      actualizarTotal(
        parseFloat(formData.subtotal) || 0,
        parseFloat(formData.descuento_porcentaje) || 0,
        costoExtra
      )
    } else if (name === 'articulo_id') {
      if (pathname === '/almacen-salidas') {
        setFormData('numero_serie', value.numero_serie)
      } else {
        const data = await getArticuloById(value.value)
        const precio = parseFloat(data.precio_compra) || 0
        setFormData('precio_articulo', precio)
      }
    } else if (name === 'cantidad_articulo') {
      const precio = formData?.precio_articulo || 0
      const cantidad = parseInt(value) || 0
      const subtotal = precio * cantidad

      setFormData('subtotal', subtotal)
      actualizarTotal(
        subtotal,
        parseFloat(formData.descuento_porcentaje) || 0,
        parseFloat(formData.costo_extra) || 0
      )
    } else if (name === 'subtotal') {
      const subtotal = parseFloat(value) || 0
      setFormData('subtotal', subtotal)
      actualizarTotal(
        subtotal,
        parseFloat(formData.descuento_porcentaje) || 0,
        parseFloat(formData.costo_extra) || 0
      )
    } else if (name === 'cliente_id') {
      await updateSucursalesByCliente(value.value)
    }

    if (name === 'venta_id') {
      setFormData('domicilio_servicio', value.direccion)
      setFormData('supervisor', value.supervisor)
      setFormData('jefe_grupo', value.jefe_grupo)
      setFormData('fecha_inicio', `${value.fecha_servicio}T00:00:00`)
    }
  }

  const handleCheckboxChange = async (e) => {
    const { name, checked, value } = e.target
    setFormData(name, checked)

    if (pathname === '/equipo') {
      const [nombreArticulo, id] = value.split('-')
      const key = `articulo-${nombreArticulo}-${id}`
      const serieKey = `seleccionado-numero_serie-${id}`

      if (!checked) {
        setArticulosDisponibles((prev) => {
          const updated = { ...prev }
          delete updated[key]
          return updated
        })

        setFormData(serieKey, '')
        return
      }

      try {
        const disponibles = await getArtDis(id)
        if (disponibles.length === 0) {
          toast.warning('Artículo no disponible en almacén')
          setFormData(name, false)
          return
        }

        setArticulosDisponibles((prev) => ({
          ...prev,
          [key]: disponibles
        }))
      } catch (err) {
        console.error('Error al cargar artículos disponibles:', err)
        setFormData(name, false)
      }
    }
  }

  useEffect(() => {
    if ((edit || view) && currentItem && pathname === '/equipo') {
      // Campos generales
      setFormData('guardia_id', currentItem.guardia_id)
      setFormData('vehiculo_id', currentItem.vehiculo_id)
      setFormData('fecha_entrega', currentItem.fecha_entrega)
      setFormData('devuelto', currentItem.devuelto)
      setFormData('fecha_devuelto', currentItem.fecha_devuelto)
      setFormData('otro', currentItem.otro)

      // Equipamiento básico (checkboxes)
      setFormData('fornitura', currentItem.fornitura === 1)
      setFormData('celular', currentItem.celular === 1)
      setFormData('radio', currentItem.radio === 1)
      setFormData('garret', currentItem.garret === 1)
      setFormData('impermeable', currentItem.impermeable === 1)
      setFormData('botas', currentItem.botas === 1)
      setFormData('plumas', currentItem.plumas === 1)
      setFormData('caparas', currentItem.caparas === 1)
      setFormData('equipo_cpat', currentItem.equipo_cpat === 1)

      setInitialLoad(true)
    }
  }, [currentItem, edit, view])

  useEffect(() => {
    if (initialLoad && currentItem && pathname === '/equipo') {
      const loadInitialData = async () => {
        const nuevosDisponibles = {}

        for (const detalle of currentItem.detalles) {
          const checkboxKey = `articulo-${detalle.articulo.nombre}-${detalle.articulo.id}`
          const selectKey = `seleccionado-numero_serie-${detalle.articulo.id}`

          // 1. Primero establecer el seleccionado
          setFormData(checkboxKey, true)
          setFormData(selectKey, detalle.numero_serie)

          // 2. Cargar todos los disponibles (incluyendo el seleccionado)
          try {
            const disponibles = await getArtDis(detalle.articulo.id)

            // Asegurarnos que el seleccionado está incluido
            const seleccionadoExiste = disponibles.some(
              (item) => item.numero_serie === detalle.numero_serie
            )

            if (!seleccionadoExiste) {
              disponibles.push({ numero_serie: detalle.numero_serie })
            }

            nuevosDisponibles[checkboxKey] = disponibles
          } catch (err) {
            console.error(`Error al cargar artículos disponibles:`, err)
            nuevosDisponibles[checkboxKey] = [
              { numero_serie: detalle.numero_serie }
            ]
          }
        }

        setArticulosDisponibles((prev) => ({
          ...prev,
          ...nuevosDisponibles
        }))
      }

      loadInitialData()
      setInitialLoad(false)
    }
  }, [initialLoad])

  const handleNestedInputChange = (e) => {
    const { name, value } = e.target
    setNestedFormData(name, value)
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (!files.length) return

    const file = files[0]
    setFormData(name, file)

    const previewURL = URL.createObjectURL(file)
    setFormData('preview', previewURL)
  }

  const handleMultipleFilesChange = (e) => {
    const { name, files } = e.target
    if (!files.length) return

    const fileArray = Array.from(files)

    // Guardamos los archivos en el estado
    setFormData(name, fileArray)
  }

  useEffect(() => {
    setEstados(estadosData)
    setEstadosMunicipios(estadosMunicipiosData)
  }, [])

  useEffect(() => {
    const estadoSeleccionado = formData.estado
    if (!estadoSeleccionado) {
      setMunicipios([])
      return
    }

    const municipiosEstado = estadosMunicipios[estadoSeleccionado]
    setMunicipios(
      municipiosEstado
        ? municipiosEstado.map((m) => ({ value: m, label: m }))
        : []
    )
  }, [formData.estado, estadosMunicipios])

  const opcionesEstados = [
    { value: '', label: 'Selecciona un estado' },
    ...estados.map((estado) => ({
      value: estado.nombre,
      label: estado.nombre
    }))
  ]

  const loadOptionsClientes = async () => {
    try {
      const response = await getCliente()
      return response.map((data) => ({
        value: data.id,
        label: data.nombre_empresa
      }))
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const loadOptionsBancos = async () => {
    try {
      const response = await getBanco()
      return response.map((data) => ({
        value: data.id,
        label: data.nombre
      }))
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const loadOptionsProveedores = async () => {
    try {
      const response = await getProveedor()
      return response.map((data) => ({
        value: data.id,
        label: data.nombre_empresa
      }))
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const loadOptionsArticulos = async () => {
    try {
      const response = await getArticulo()
      return response.map((data) => ({
        value: data.id,
        label: data.nombre
      }))
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const loadOptionsCotizaciones = async () => {
    try {
      const response = await getCotizacion()
      return response.map((data) => ({
        value: data.id,
        label: data.nombre_empresa
      }))
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const loadOptionsVentas = async () => {
    try {
      const response = await getVentaOrdenServicio()
      return response.map((data) => ({
        value: data.id,
        label: `${data.nombre_empresa} (${data.numero_factura})`,
        direccion: data.direccion,
        jefe_grupo: data.cotizacion.jefe_grupo,
        supervisor: data.cotizacion.supervisor,
        fecha_servicio: data.fecha_servicio
      }))
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const loadOptionsGuardias = async () => {
    try {
      const response = await getGuardiasRango()
      return response.map((data) => ({
        value: data.id,
        label: data.nombre_completo
      }))
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const loadOptionsSupervisores = async () => {
    try {
      const response = await getSupervisores()
      return response.map((data) => ({
        value: data.id,
        label: data.nombre_completo
      }))
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const loadOptionsJefesGrupo = async () => {
    try {
      const response = await getJefeGrupo()
      return response.map((data) => ({
        value: data.id,
        label: data.nombre_completo
      }))
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const loadOptionsRoles = async () => {
    try {
      const response = await getRol()
      return response.map((data) => ({
        value: data.id,
        label: data.nombre
      }))
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const loadOptionsModulos = async () => {
    try {
      const response = await getModulo()
      return response.map((data) => ({
        value: data.id,
        label: data.nombre
      }))
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  useEffect(() => {
    if ((edit || view) && formData.cliente_id?.value) {
      const getSucursalesByCliente = async () => {
        await updateSucursalesByCliente(formData.cliente_id.value)
      }

      getSucursalesByCliente()
    }
  }, [edit, view])

  const updateSucursalesByCliente = async (clienteId) => {
    try {
      const response = await getSucursalByCliente(clienteId)
      const data = response.map((sucursal) => ({
        value: sucursal.id,
        label: sucursal.nombre_empresa
      }))

      const options = [{ label: 'Selecciona una opción', value: '' }, ...data]

      setSelectOptions(options)
    } catch (error) {
      console.error('Error al obtener sucursales:', error)
      setSelectOptions([])
    }
  }

  return {
    view,
    add,
    edit,
    deleteModal,
    document,
    modalType,
    setFormData,
    formData,
    openModal,
    closeModal,
    currentItem,
    setNestedFormData,
    handleInputChange,
    handleFileChange,
    handleMultipleFilesChange,
    handleNestedInputChange,
    handleCheckboxChange,
    opcionesEstados,
    municipios,
    loadOptionsClientes,
    loadOptionsBancos,
    loadOptionsProveedores,
    loadOptionsArticulos,
    loadOptionsCotizaciones,
    loadOptionsVentas,
    loadOptionsGuardias,
    loadOptionsSupervisores,
    loadOptionsJefesGrupo,
    loadOptionsRoles,
    loadOptionsModulos,
    selectOptions,
    articulosDisponibles
  }
}
