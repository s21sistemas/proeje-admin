import { collection, onSnapshot } from 'firebase/firestore'
import { db } from './db/firebaseConfig'
import dayjs from 'dayjs'

// Obtener registro
export const getGuardiasCheck = () => {
  return new Promise((resolve) => {
    const unsubscribe = onSnapshot(
      collection(db, 'guardias_check'),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          fecha: dayjs(doc.data().fecha).format('YYYY-MM-DD HH:mm:ss'),
          guardia: `${doc.data().nombre} (${doc.data().numeroEmpleado})`,
          check: dayjs(doc.data().fecha).format('DD/MM/YYYY hh:mm:ss A')
        }))
        resolve({ data, unsubscribe })
      }
    )
  })
}
