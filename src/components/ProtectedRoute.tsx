import { Navigate } from 'react-router-dom'
import useAuthStore from '@/stores/authStore'

import * as React from 'react'

type ProtectedRouteProps = {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAuthStore((s) => s.user)
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}
