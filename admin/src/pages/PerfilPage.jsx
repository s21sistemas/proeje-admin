import { Edit, X } from 'lucide-react'

export default function PerfilPage() {
  return (
    <div className='max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-gray-800'>
            Perfil del usuario
          </h2>
          <button className='flex items-center gap-1 text-sm font-medium rounded-md px-3 py-1.5 bg-primary text-white hover:bg-primary/90'>
            {/* {isEditing ? (
              <>
                <X size={16} />
                Cancelar
              </>
            ) : (
              <>
                <Edit size={16} />
                Editar
              </>
            )} */}
          </button>
        </div>

        {/* {isEditing ? (
          <FormProfile
            handleSubmit={handleSubmit}
            handlePhotoChange={handlePhotoChange}
            handleChange={handleChange}
            formData={formData}
          />
        ) : (
          <ProfileView userData={userData} />
        )} */}
      </div>
    </div>
  )
}
