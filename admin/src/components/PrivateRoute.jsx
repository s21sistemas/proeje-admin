import { Navigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to='/login' />
}
