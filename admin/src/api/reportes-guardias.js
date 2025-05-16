import { collection, onSnapshot } from 'firebase/firestore'
import { db } from './db/firebaseConfig'
import dayjs from 'dayjs'

// Obtener registro
export const getReportesGuardia = () => {
  return new Promise((resolve) => {
    const unsubscribe = onSnapshot(
      collection(db, 'reportesGuardia'),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const equipo_completo = doc.data().equipo

          // mapear objeto, solo que sean true, y devolver solo las keys
          const equipo = Object.entries(equipo_completo)
            .filter(([, value]) => value === true)
            .map(([key]) => key)

          return {
            id: doc.id,
            ...doc.data(),
            fecha: dayjs(doc.data().fecha).format('YYYY-MM-DD'),
            fecha_format: dayjs(doc.data().fecha).format('DD/MM/YYYY'),
            guardia: `${doc.data().nombreEmpleado} (${doc.data().empleadoId})`,
            equipo: equipo.join(', ')
          }
        })
        resolve({ data, unsubscribe }) // devolvemos la función unsubscribe también
      }
    )
  })
}
