import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '@/stores/authStore'
import MainLayout from '@/components/layout/MainLayout'
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
		<MainLayout>
			{/* Birthday Popup - Shows once per session if today is birthday */}
			<BirthdayPopup user={user} />

			{/* Dashboard Content */}
			<div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
				{/* Balance Card */}
				<BalanceCard balance={user.balance} />

				{/* Quick Actions */}
				<QuickActions />
			</div>
		</MainLayout>
	)
}
