import { useState, useMemo } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'
import DepositForm from '@/components/forms/DepositForm'
import WithdrawForm from '@/components/forms/WithdrawForm'

export default function QuickActions() {
	const [depositOpen, setDepositOpen] = useState(false)
	const [withdrawOpen, setWithdrawOpen] = useState(false)

	const actions = useMemo(() => [
		{
			title: 'Withdraw',
			description: 'Take money from your account',
			icon: ArrowUp,
			onClick: () => setWithdrawOpen(true),
			bgColor: 'bg-blue-100',
			iconColor: 'text-blue-600',
			borderColor: 'border-blue-200',
		},
		{
			title: 'Deposit',
			description: 'Add money from your account',
			icon: ArrowDown,
			onClick: () => setDepositOpen(true),
			bgColor: 'bg-purple-100',
			iconColor: 'text-purple-600',
			borderColor: 'border-purple-200',
		},
	], [])

	return (
		<>
			<div>
				<h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{actions.map((action) => {
						const Icon = action.icon
						return (
							<button
								key={action.title}
								onClick={action.onClick}
								className={`flex items-center gap-4 p-6 bg-white rounded-2xl border-2 ${action.borderColor} hover:shadow-md transition-all duration-200 text-left`}
							>
								<div className={`${action.bgColor} rounded-full p-4`}>
									<Icon className={`w-6 h-6 ${action.iconColor}`} />
								</div>
								<div>
									<h3 className="font-semibold text-slate-900 text-lg">
										{action.title}
									</h3>
									<p className="text-sm text-slate-500">{action.description}</p>
								</div>
							</button>
						)
					})}
				</div>
			</div>

			{/* Dialogs */}
			<DepositForm open={depositOpen} onOpenChange={setDepositOpen} />
			<WithdrawForm open={withdrawOpen} onOpenChange={setWithdrawOpen} />
		</>
	)
}
