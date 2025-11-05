import { useCallback } from 'react'
import useAuthStore from '@/stores/authStore'
import { loginWithUsernameAndPin } from '@/services/mockApi'
import type { User } from '@/types'

export function useAuth() {
	const user = useAuthStore((s) => s.user)
	const setUser = useAuthStore((s) => s.setUser)
	const setLoading = useAuthStore((s) => s.setLoading)
	const setError = useAuthStore((s) => s.setError)

	const login = useCallback(async (username: string, pin: string) => {
		try {
			setLoading(true)
			setError(null)
			const u: User = await loginWithUsernameAndPin(username, pin)
			setUser(u)
			return u
			} catch (err: unknown) {
				const message = err instanceof Error ? err.message : String(err)
				setError(message || 'Login failed')
				throw err
		} finally {
			setLoading(false)
		}
	}, [setUser, setLoading, setError])

	const logout = useCallback(() => {
		setUser(null)
	}, [setUser])

	return {
		user,
		login,
		logout,
		setError,
	}
}

export default useAuth
