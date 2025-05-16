import { collection, onSnapshot } from 'firebase/firestore'
import { db } from './db/firebaseConfig'
import dayjs from 'dayjs'

// Obtener registro
export const getBitacoras = () => {
  return new Promise((resolve) => {
    const unsubscribe = onSnapshot(collection(db, 'bitacoras'), (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const inicio = new Date(doc.data().horaInicioRecorrido.seconds * 1000)
        const fin = new Date(doc.data().horaFinRecorrido.seconds * 1000)

        return {
          id: doc.id,
          ...doc.data(),
          guardia: `${doc.data().nombre} (${doc.data().numeroEmpleado})`,
          inicioRecorrido: dayjs(inicio).format('YYYY-MM-DD HH:mm'),
          finRecorrido: dayjs(fin).format('YYYY-MM-DD HH:mm'),
          inicio_format: dayjs(inicio).format('DD/MM/YYYY hh:mm A'),
          fin_format: dayjs(fin).format('DD/MM/YYYY hh:mm A')
        }
      })

      resolve({ data, unsubscribe })
    })
  })
}
