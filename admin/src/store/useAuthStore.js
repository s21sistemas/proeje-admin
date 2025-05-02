import { create } from 'zustand'
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth } from '../api/db/firebaseConfig'
import { getProfile } from '../api/checkAuth'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: null,

  setUser: async (user) => {
    const userAuth = await getProfile(user?.uid)
    set({ user: userAuth, isAuthenticated: !!userAuth })
  },

  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      await useAuthStore.getState().setUser(user)
      window.location.href = '/'
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
    }
  },

  logout: async () => {
    try {
      await signOut(auth)
      set({ user: null, isAuthenticated: false })
      window.location.href = '/login'
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }
}))

onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().setUser(user)
})
