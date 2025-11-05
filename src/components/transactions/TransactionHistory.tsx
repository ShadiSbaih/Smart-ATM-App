import { useState } from 'react'
import { ArrowDownCircle, ArrowUpCircle, ArrowRightLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Transaction } from '@/services/mockApi'

interface TransactionHistoryProps {
	transactions: Transaction[]
	itemsPerPage?: number
}

export default function TransactionHistory({
	transactions,
	itemsPerPage = 10,
}: TransactionHistoryProps) {
	const [currentPage, setCurrentPage] = useState(1)

	const totalPages = Math.ceil(transactions.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const currentTransactions = transactions.slice(startIndex, endIndex)

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	const getTransactionIcon = (type: string) => {
		switch (type) {
			case 'Deposit':
				return <ArrowDownCircle className="h-6 w-6 text-violet-600 dark:text-violet-400" />
			case 'Withdraw':
				return <ArrowUpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
			case 'Transfer':
				return <ArrowRightLeft className="h-6 w-6 text-orange-600 dark:text-orange-400" />
			default:
				return <ArrowRightLeft className="h-6 w-6 text-gray-600" />
		}
	}

	const getTransactionBg = (type: string) => {
		switch (type) {
			case 'Deposit':
				return 'bg-violet-100 dark:bg-violet-900/20'
			case 'Withdraw':
				return 'bg-blue-100 dark:bg-blue-900/20'
			case 'Transfer':
				return 'bg-orange-100 dark:bg-orange-900/20'
			default:
				return 'bg-gray-100 dark:bg-gray-900/20'
		}
	}

	const getAmountColor = (type: string) => {
		switch (type) {
			case 'Deposit':
				return 'text-green-600 dark:text-green-400'
			case 'Withdraw':
			case 'Transfer':
				return 'text-red-600 dark:text-red-400'
			default:
				return 'text-gray-600'
		}
	}

	if (transactions.length === 0) {
		return (
			<div className="bg-white rounded-2xl border-2 border-slate-200 p-12 text-center">
				<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
					<ArrowRightLeft className="h-8 w-8 text-slate-400" />
				</div>
				<h3 className="text-lg font-semibold text-slate-900 mb-2">
					No Transactions Yet
				</h3>
				<p className="text-slate-600">
					Your transaction history will appear here
				</p>
			</div>
		)
	}

	return (
		<div className="space-y-4">
			<div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden">
				{/* Header */}
				<div className="p-6 border-b border-slate-200">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-bold text-slate-900">
							Transaction History
						</h2>
						<div className="text-sm text-slate-500">
							Total: {transactions.length} transactions
						</div>
					</div>
				</div>

				{/* Transactions List */}
				<div className="divide-y divide-slate-200">
					{currentTransactions.map((transaction: Transaction) => (
						<div
							key={transaction.id}
							className="p-6 hover:bg-slate-50 transition-colors"
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<div
										className={`h-12 w-12 rounded-full flex items-center justify-center ${getTransactionBg(
											transaction.type
										)}`}
									>
										{getTransactionIcon(transaction.type)}
									</div>
									<div>
										<div className="font-semibold text-slate-900">
											{transaction.type}
										</div>
										{transaction.target_user && (
											<div className="text-sm text-slate-600">
												To: {transaction.target_user}
											</div>
										)}
										<div className="text-xs text-slate-500 mt-1">
											{formatDate(transaction.date)}
										</div>
									</div>
								</div>
								<div className="text-right">
									<div
										className={`text-xl font-bold ${getAmountColor(
											transaction.type
										)}`}
									>
										{transaction.type === 'Deposit' ? '+' : '-'}
										{transaction.amount}
									</div>
									<div className="text-sm text-slate-500">
										{transaction.currency}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="p-6 border-t border-slate-200">
						<div className="flex justify-center gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
								disabled={currentPage === 1}
							>
								Previous
							</Button>
							<div className="flex items-center gap-1">
								{Array.from({ length: totalPages }, (_, i) => i + 1).map(
									(page) => (
										<Button
											key={page}
											variant={currentPage === page ? 'default' : 'outline'}
											size="sm"
											onClick={() => setCurrentPage(page)}
											className={
												currentPage === page ? 'bg-violet-600 hover:bg-violet-700' : ''
											}
										>
											{page}
										</Button>
									)
								)}
							</div>
							<Button
								variant="outline"
								size="sm"
								onClick={() =>
									setCurrentPage((p) => Math.min(totalPages, p + 1))
								}
								disabled={currentPage === totalPages}
							>
								Next
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
