import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/services/mockApi'

type AuthState = {
	user: User | null
	loading: boolean
	error?: string | null
	setUser: (u: User | null) => void
	setLoading: (v: boolean) => void
	setError: (e?: string | null) => void
	clear: () => void
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			loading: false,
			error: null,
			setUser: (u) => set({ user: u, error: null }),
			setLoading: (v) => set({ loading: v }),
			setError: (e) => set({ error: e }),
			clear: () => set({ user: null, loading: false, error: null }),
		}),
		{
			name: 'smart-atm-auth',
			partialize: (state) => ({ user: state.user }),
		}
	)
)

export default useAuthStore
