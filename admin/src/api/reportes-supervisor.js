import { collection, onSnapshot } from 'firebase/firestore'
import { db } from './db/firebaseConfig'

// Obtener registro
export const getReportesSupervisor = () => {
  return new Promise((resolve) => {
    const unsubscribe = onSnapshot(
      collection(db, 'reportesSupervisor'),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        resolve({ data, unsubscribe }) // devolvemos la función unsubscribe también
      }
    )
  })
}
