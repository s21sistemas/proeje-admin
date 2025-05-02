import { toast } from 'sonner'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createGuardia,
  getGuardias,
  removeGuardia,
  updateGuardia
} from '../api/guardias'
import { useModalStore } from '../store/useModalStore'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { useState } from 'react'
import estadosData from '../utils/estados.json'
import estadosMunicipiosData from '../utils/municipios.json'

export const useGuardias = () => {
  const [estados, setEstados] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [estadosMunicipios, setEstadosMunicipios] = useState({})

  const modalType = useModalStore((state) => state.modalType)
  const formData = useModalStore((state) => state.formData)
  const closeModal = useModalStore((state) => state.closeModal)

  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['guardias'],
    queryFn: getGuardias
  })

  const createMutation = useMutation({
    mutationFn: createGuardia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guardias'] })
      toast.success('Registro agregado')
      closeModal()
      Swal.close()
    },
    onError: (error) => {
      toast.error(error.message)
      Swal.close()
    }
  })

  const updateMutation = useMutation({
    mutationFn: updateGuardia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guardias'] })
      toast.success('Registro actualizado')
      closeModal()
      Swal.close()
    },
    onError: (error) => {
      toast.error(error.message)
      Swal.close()
    }
  })

  const deleteMutation = useMutation({
    mutationFn: removeGuardia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guardias'] })
      toast.success('Registro eliminado')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    Swal.fire({
      title:
        '<h2 style="font-family: "sans-serif";">Guardando registro, por favor espere...</h2>',
      allowEscapeKey: false,
      allowOutsideClick: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    if (modalType === 'add') {
      createMutation.mutate(formData)
    } else if (modalType === 'edit') {
      updateMutation.mutate(formData)
    }
  }

  const handleDelete = (id) => {
    deleteMutation.mutate(id)
    closeModal()
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

  return {
    isLoading,
    isError,
    data,
    error,
    createMutation,
    updateMutation,
    deleteMutation,
    handleSubmit,
    handleDelete,
    opcionesEstados,
    municipios
  }
}
