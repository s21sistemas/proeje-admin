import { AdminActions } from '../components/AdminActions'
import { AdminCards } from '../components/AdminCards'
import { AdminGraphic } from '../components/AdminGraphic'

const AdminPage = () => {
  return (
    <>
      <AdminCards />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <AdminGraphic />

        <AdminActions />
      </div>
    </>
  )
}
export default AdminPage
