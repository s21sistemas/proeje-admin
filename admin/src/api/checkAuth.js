export const getProfile = async (uid) => {
  try {
    
  } catch {
    return null
  }
}

export const updateProfile = async (id, data) => {
  try {
  } catch (error) {
    console.error('Error al actualizar usuario:', error)
  }
}

// Función para subir una imagen
export const uploadUserPhoto = async (file, userId) => {
  try {
  } catch (error) {
    console.error('Error al subir la imagen:', error)
    return null
  }
}

// Función para guardar la imagen en la bd
export const updateUserPhoto = async (userId, photoURL) => {
  try {
  } catch (error) {
    console.error('Error al actualizar la foto en Firestore:', error)
  }
}
