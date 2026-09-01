import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

/** Redirects already-authenticated users away from landing/login/signup. */
export default function PublicOnlyRoute() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return null
  if (isAuthenticated) return <Navigate to="/home" replace />

  return <Outlet />
}
