import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	withdrawSchema,
	type WithdrawFormValues,
} from '@/schemas/withdrawSchema'
import { useTransactions } from '@/hooks/useTransactions'
import useAuthStore from '@/stores/authStore'
import { ArrowUpCircle } from 'lucide-react'
import { toast } from 'sonner'
import type { WithdrawFormProps } from '@/types'

export default function WithdrawForm({
	open,
	onOpenChange,
}: WithdrawFormProps) {
	const { withdraw, isLoading } = useTransactions()
	const user = useAuthStore((s) => s.user)
	const [currentAmount, setCurrentAmount] = useState('')

	const initialValues: WithdrawFormValues = {
		amount: 0,
		currency: 'ILS',
	}

	const handleSubmit = async (
		values: WithdrawFormValues,
		{ resetForm }: { resetForm: () => void }
	) => {
		if (!user || values.amount > user.balance) {
			toast.error('Insufficient Balance', {
				description: 'You do not have enough funds',
			})
			return
		}

		const result = await withdraw(values.amount, values.currency)
		if (result) {
			onOpenChange(false)
			setCurrentAmount('')
			resetForm()
		}
	}

	const handleQuickAmount = (amount: number, setFieldValue: (field: string, value: number) => void) => {
		const total = parseFloat(currentAmount || '0') + amount
		setCurrentAmount(total.toString())
		setFieldValue('amount', total)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
							<ArrowUpCircle className="h-5 w-5 text-blue-600" />
						</div>
						<div>
							<DialogTitle className="text-xl">Withdraw</DialogTitle>
							<DialogDescription>
								Take funds from your account
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				<Formik
					initialValues={initialValues}
					validationSchema={withdrawSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched, setFieldValue, values }) => (
						<Form className="space-y-6">
							{/* Available Balance */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-gray-700">
									Available Balance
								</label>
								<div className="rounded-lg bg-blue-50 p-4">
									<div className="text-sm text-blue-600">
										ILS
									</div>
									<div className="text-2xl font-bold text-blue-900">
										{user?.balance.toFixed(2) || '0.00'} ILS
									</div>
								</div>
							</div>

							{/* Amount Input */}
							<div className="space-y-2">
								<label
									htmlFor="amount"
									className="text-sm font-medium text-gray-700"
								>
									Withdrawal Amount
								</label>
								<div className="relative">
									<Field
										as={Input}
										id="amount"
										name="amount"
										type="number"
										placeholder="0.00"
										className="pr-12 text-lg h-12"
										value={currentAmount}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											setCurrentAmount(e.target.value)
											setFieldValue('amount', parseFloat(e.target.value) || 0)
										}}
									/>
									<div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
										ILS
									</div>
								</div>
								{errors.amount && touched.amount && (
									<p className="text-xs text-red-600">{errors.amount}</p>
								)}
							</div>

							{/* Quick Amounts */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-gray-700">
									Quick Amounts
								</label>
								<div className="grid grid-cols-3 gap-2">
									{[100, 500, 1000].map((amount) => (
										<Button
											key={amount}
											type="button"
											variant="outline"
											className="h-10"
											onClick={() => handleQuickAmount(amount, setFieldValue)}
											disabled={
												(user?.balance || 0) <
												(parseFloat(currentAmount) || 0) + amount
											}
										>
											+{amount}
										</Button>
									))}
								</div>
							</div>

							{/* Remaining Balance Preview */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-gray-700">
									Remaining Balance
								</label>
								<div className="rounded-lg bg-blue-50 p-4">
									<div className="text-sm text-blue-600">
										After Withdrawal
									</div>
									<div className="text-2xl font-bold text-blue-900">
										{Math.max((user?.balance || 0) - (values.amount || 0), 0).toFixed(
											2
										)}{' '}
										ILS
									</div>
								</div>
							</div>

							{/* Actions */}
							<div className="flex gap-3 pt-2">
								<Button
									type="button"
									variant="outline"
									className="flex-1"
									onClick={() => {
										onOpenChange(false)
										setCurrentAmount('')
									}}
									disabled={isLoading}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									className="flex-1 bg-blue-600 hover:bg-blue-700"
									disabled={isLoading || (user?.balance || 0) < values.amount}
								>
									{isLoading ? 'Processing...' : 'Withdraw'}
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	)
}
