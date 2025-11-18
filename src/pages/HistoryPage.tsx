import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '@/stores/authStore'
import MainLayout from '@/components/layout/MainLayout'
import TransactionHistory from '@/components/transactions/TransactionHistory'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function HistoryPage() {
	const user = useAuthStore((s) => s.user)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [user, navigate])

	if (!user) return null

	const transactions = user.transactions || []

	return (
		<MainLayout>
			<div className="max-w-5xl mx-auto space-y-6 mb-16">
				{/* Page Header */}
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 dark:text-gray-900">
					<Button
						variant="outline"
						size="sm"
						onClick={() => navigate('/dashboard')}
						className="gap-2"
					>
						<ArrowLeft className="h-4 w-4" />
						Back
					</Button>
					<div>
						<h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
							Transaction History
						</h1>
						<p className="text-sm sm:text-base text-slate-600 mt-1">
							View all your transactions
						</p>
					</div>
				</div>

				{/* Transaction History Component */}
				<TransactionHistory transactions={transactions} itemsPerPage={10}  />
			</div>
		</MainLayout>
	)
}
