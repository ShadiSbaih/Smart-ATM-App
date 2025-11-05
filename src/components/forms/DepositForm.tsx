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
import { depositSchema, type DepositFormValues } from '@/schemas/depositSchema'
import { useTransactions } from '@/hooks/useTransactions'
import useAuthStore from '@/stores/authStore'
import { ArrowDownCircle } from 'lucide-react'

interface DepositFormProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export default function DepositForm({ open, onOpenChange }: DepositFormProps) {
	const { deposit, isLoading } = useTransactions()
	const user = useAuthStore((s) => s.user)
	const [currentAmount, setCurrentAmount] = useState('')

	const initialValues: DepositFormValues = {
		amount: 0,
		currency: 'ILS',
	}

	const handleSubmit = async (
		values: DepositFormValues,
		{ resetForm }: any
	) => {
		const result = await deposit(values.amount, values.currency)
		if (result) {
			onOpenChange(false)
			setCurrentAmount('')
			resetForm()
		}
	}

	const handleQuickAmount = (amount: number, setFieldValue: any) => {
		const total = parseFloat(currentAmount || '0') + amount
		setCurrentAmount(total.toString())
		setFieldValue('amount', total)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/20">
							<ArrowDownCircle className="h-5 w-5 text-violet-600 dark:text-violet-400" />
						</div>
						<div>
							<DialogTitle className="text-xl">Deposit</DialogTitle>
							<DialogDescription>Add funds to your account</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				<Formik
					initialValues={initialValues}
					validationSchema={depositSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched, setFieldValue, values }) => (
						<Form className="space-y-6">
							{/* Current Balance */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
									Current Balance
								</label>
								<div className="rounded-lg bg-violet-50 dark:bg-violet-900/10 p-4">
									<div className="text-sm text-violet-600 dark:text-violet-400">
										ILS
									</div>
									<div className="text-2xl font-bold text-violet-900 dark:text-violet-100">
										{user?.balance.toFixed(2) || '0.00'} ILS
									</div>
								</div>
							</div>

							{/* Amount Input */}
							<div className="space-y-2">
								<label
									htmlFor="amount"
									className="text-sm font-medium text-gray-700 dark:text-gray-300"
								>
									Deposit Amount
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
								<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
										>
											+{amount}
										</Button>
									))}
								</div>
							</div>

							{/* New Balance Preview */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
									New Balance
								</label>
								<div className="rounded-lg bg-violet-50 dark:bg-violet-900/10 p-4">
									<div className="text-sm text-violet-600 dark:text-violet-400">
										After Deposit
									</div>
									<div className="text-2xl font-bold text-violet-900 dark:text-violet-100">
										{((user?.balance || 0) + (values.amount || 0)).toFixed(2)} ILS
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
									className="flex-1 bg-violet-600 hover:bg-violet-700"
									disabled={isLoading}
								>
									{isLoading ? 'Processing...' : 'Deposit'}
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	)
}
