import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '@/stores/authStore'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
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
		<div className="flex min-h-screen bg-slate-50">
			{/* Sidebar */}
			<Sidebar />

			{/* Main Content */}
			<div className="flex-1 flex flex-col">
				{/* Header */}
				<Header />

				{/* History Content */}
				<main className="flex-1 p-8">
					<div className="max-w-5xl space-y-6">
						{/* Page Header */}
						<div className="flex items-center gap-4">
							<Button
								variant="outline"
								size="sm"
								onClick={() => navigate('/dashboard')}
								className="gap-2"
							>
								<ArrowLeft className="h-4 w-4" />
								Back to Dashboard
							</Button>
							<div>
								<h1 className="text-3xl font-bold text-slate-900">
									Transaction History
								</h1>
								<p className="text-slate-600 mt-1">
									View all your transactions
								</p>
							</div>
						</div>

						{/* Transaction History Component */}
						<TransactionHistory transactions={transactions} itemsPerPage={10} />
					</div>
				</main>
			</div>
		</div>
	)
}
