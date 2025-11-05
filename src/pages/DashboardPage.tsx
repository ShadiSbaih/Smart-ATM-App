import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '@/stores/authStore'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import BalanceCard from '@/components/dashboard/BalanceCard'
import QuickActions from '@/components/dashboard/QuickActions'
import BirthdayPopup from '@/components/dashboard/BirthdayPopup'

export default function DashboardPage() {
	const user = useAuthStore((s) => s.user)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [user, navigate])

	if (!user) return null

	return (
		<div className="flex min-h-screen bg-slate-50">
			{/* Birthday Popup - Shows once per session if today is birthday */}
			<BirthdayPopup user={user} />

			{/* Sidebar */}
			<Sidebar />

			{/* Main Content */}
			<div className="flex-1 flex flex-col">
				{/* Header */}
				<Header />

				{/* Dashboard Content */}
				<main className="flex-1 p-8">
					<div className="max-w-5xl space-y-8">
						{/* Balance Card */}
						<BalanceCard balance={user.balance} />

						{/* Quick Actions */}
						<QuickActions />
					</div>
				</main>
			</div>
		</div>
	)
}
