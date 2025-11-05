import { Navigate } from 'react-router-dom'
import useAuthStore from '@/stores/authStore'
import type { ProtectedRouteProps } from '@/types'

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAuthStore((s) => s.user)
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}
