import { useState } from 'react'
import useAuthStore from '@/stores/authStore'
import type { Transaction, TransactionInput } from '@/types'
import { addTransaction as addTransactionAPI } from '@/services/mockApi'
import { toast } from 'sonner'

export const useTransactions = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const user = useAuthStore((s) => s.user)
	const setUser = useAuthStore((s) => s.setUser)

	const addTransaction = async (input: TransactionInput): Promise<boolean> => {
		if (!user) {
			setError('User not authenticated')
			toast.error('Authentication required')
			return false
		}

		setIsLoading(true)
		setError(null)

		// Save original user state for rollback
		const originalUser = user

		try {
			// Validate based on transaction type
			if (input.type === 'Withdraw' && input.amount > user.balance) {
				throw new Error('Insufficient balance')
			}

			if (input.amount <= 0) {
				throw new Error('Amount must be positive')
			}

			// Calculate new balance
			let newBalance = user.balance
			if (input.type === 'Deposit') {
				newBalance += input.amount
			} else if (input.type === 'Withdraw' || input.type === 'Transfer') {
				newBalance -= input.amount
			}

			// Create new transaction for optimistic update
			const newTransaction: Transaction = {
				id: Date.now(),
				type: input.type,
				amount: input.amount,
				currency: input.currency || 'ILS',
				date: new Date().toISOString(),
				target_user: input.target_user,
			}

			// Optimistic update
			const optimisticUser = {
				...user,
				balance: newBalance,
				transactions: [newTransaction, ...(user.transactions || [])],
			}
			setUser(optimisticUser)

			// Call API to save transaction
			const updatedUser = await addTransactionAPI(
				user.id,
				{
					type: input.type,
					amount: input.amount,
					currency: input.currency || 'ILS',
					date: new Date().toISOString(),
					target_user: input.target_user,
				},
				newBalance
			)

			if (!updatedUser) {
				throw new Error('Failed to save transaction')
			}

			// Update with server response
			setUser(updatedUser)
			setIsLoading(false)
			return true
		} catch (err) {
			setIsLoading(false)
			const errorMessage =
				err instanceof Error ? err.message : 'Transaction failed'
			setError(errorMessage)
			toast.error('Transaction Failed', { description: errorMessage })

			// Revert optimistic update on error
			setUser(originalUser)
			return false
		}
	}

	const deposit = async (amount: number, currency = 'ILS'): Promise<boolean> => {
		const success = await addTransaction({ type: 'Deposit', amount, currency })
		if (success) {
			toast.success('Deposit Successful!', {
				description: `${amount} ${currency} added to your account`,
			})
		}
		return success
	}

	const withdraw = async (amount: number, currency = 'ILS'): Promise<boolean> => {
		const success = await addTransaction({ type: 'Withdraw', amount, currency })
		if (success) {
			toast.success('Withdrawal Successful!', {
				description: `${amount} ${currency} withdrawn from your account`,
			})
		}
		return success
	}

	return {
		deposit,
		withdraw,
		addTransaction,
		isLoading,
		error,
		transactions: user?.transactions || [],
	}
}
