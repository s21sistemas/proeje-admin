import { collection, onSnapshot } from 'firebase/firestore'
import { db } from './db/firebaseConfig'
import dayjs from 'dayjs'

// Obtener registro
export const getReportesIncidentes = () => {
  return new Promise((resolve) => {
    const unsubscribe = onSnapshot(
      collection(db, 'reportesIncidentes'),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          fecha: dayjs(doc.data().fecha).format('YYYY-MM-DD HH:mm:ss'),
          fecha_format: dayjs(doc.data().fecha).format('DD/MM/YYYY hh:mm:ss A'),
          guardia: `${doc.data().nombre} (${doc.data().numeroEmpleado})`
        }))
        resolve({ data, unsubscribe }) // devolvemos la función unsubscribe también
      }
    )
  })
}
