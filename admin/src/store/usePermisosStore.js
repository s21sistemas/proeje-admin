import { create } from 'zustand'

export const usePermisosStore = create((set) => ({
  modulosSeleccionados: [],
  permisosSeleccionados: {},

  setModulosSeleccionados: (modulos) =>
    set({ modulosSeleccionados: modulos || [] }),

  setPermisosDesdeAPI: (permisosAPI) => {
    const permisos = {}

    permisosAPI.forEach(
      ({ modulo_id, consultar, crear, actualizar, eliminar }) => {
        permisos[modulo_id] = { consultar, crear, actualizar, eliminar }
      }
    )

    set({ permisosSeleccionados: permisos })
  },

  togglePermiso: (moduloId, permiso) =>
    set((state) => {
      const permisos = { ...state.permisosSeleccionados }

      if (!permisos[moduloId]) {
        permisos[moduloId] = {
          consultar: false,
          crear: false,
          actualizar: false,
          eliminar: false
        }
      }

      permisos[moduloId][permiso] = !permisos[moduloId][permiso]

      return { permisosSeleccionados: permisos }
    }),

  getPermisoValue: (moduloId, permiso) => {
    const permisos = usePermisosStore.getState().permisosSeleccionados
    return permisos[moduloId]?.[permiso] || false
  },

  resetPermisos: () =>
    set({
      modulosSeleccionados: [],
      permisosSeleccionados: []
    })
}))
