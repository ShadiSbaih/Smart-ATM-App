import { useQuery } from '@tanstack/react-query'
import useAuthStore from '@/stores/authStore'
import { findUserByUsername } from '@/services/mockApi'
import type { User } from '@/types'

/**
 * Hook to fetch and manage user data
 */
export function useUser() {
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)

  // Query to fetch updated user data
  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useQuery<User | null>({
    queryKey: ['user', user?.user_name],
    queryFn: async () => {
      if (!user?.user_name) return null
      return await findUserByUsername(user.user_name)
    },
    enabled: !!user?.user_name,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  })

  // Update auth store when user data changes
  if (userData && userData.id === user?.id) {
    // Only update if there are actual changes to prevent infinite loops
    if (JSON.stringify(userData) !== JSON.stringify(user)) {
      setUser(userData)
    }
  }

  return {
    user: userData || user,
    isLoading,
    error,
    refetch,
  }
}
