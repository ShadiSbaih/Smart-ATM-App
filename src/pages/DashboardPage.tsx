import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '@/stores/authStore'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
	const user = useAuthStore((s) => s.user)
	const { logout } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [user, navigate])

	if (!user) return null

	return (
		<div className="min-h-screen p-8 bg-slate-50">
			<div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-sm">
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-2xl font-semibold">Welcome, {user.first_name}!</h2>
						<p className="text-sm text-slate-500">Birthday: {user.birthday}</p>
					</div>
					<div>
						<div className="text-right">
							<div className="text-sm text-slate-500">Balance</div>
							<div className="text-xl font-bold">{user.balance} ILS</div>
						</div>
						<button
							onClick={() => {
								logout()
								navigate('/login')
							}}
							className="mt-4 inline-block rounded-md bg-red-500 text-white px-3 py-2 text-sm"
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
