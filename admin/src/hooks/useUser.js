// import { useModalStore } from '../store/useModalStore'
// import { useUserStore } from '../store/useUserStore'

// export const useUser = () => {
//   // Store de modal
//   const modalType = useModalStore((state) => state.modalType)
//   const formData = useModalStore((state) => state.formData)
//   const closeModal = useModalStore((state) => state.closeModal)

//   // Store de users
//   const loading = useUserStore((state) => state.loading)
//   const users = useUserStore((state) => state.users)
//   const getDataUsers = useUserStore((state) => state.getDataUsers)
//   const addUser = useUserStore((state) => state.addUser)
//   const editUser = useUserStore((state) => state.editUser)
//   const deleteUser = useUserStore((state) => state.deleteUser)

//   const roles = useUserStore((state) => state.roles)
//   const getDataRoles = useUserStore((state) => state.getDataRoles)

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     const newFormData = {
//       ...formData,
//       rol_id: formData.rol_id.value
//     }

//     if (modalType === 'add') {
//       addUser(newFormData)
//     } else if (modalType === 'edit') {
//       editUser(newFormData)
//     }

//     closeModal()
//   }

//   const handleDelete = (id) => {
//     deleteUser(id)
//     closeModal()
//   }

//   const loadOptions = async () => {
//     try {
//       const data = await getDataRoles()
//       return data.map((rol) => ({
//         value: rol.id,
//         label: rol.nombre
//       }))
//     } catch (error) {
//       console.error('Error loading roles:', error)
//       return []
//     }
//   }

//   return {
//     loadOptions,
//     roles,
//     getDataRoles,
//     users,
//     getDataUsers,
//     loading,
//     handleSubmit,
//     handleDelete
//   }
// }
