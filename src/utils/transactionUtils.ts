/**
 * Transaction utility functions
 */

/**
 * Get transaction background color class based on type
 */
export function getTransactionBgClass(type: string): string {
  switch (type) {
    case 'Deposit':
      return 'bg-violet-100'
    case 'Withdraw':
      return 'bg-blue-100'
    case 'Transfer':
      return 'bg-orange-100'
    default:
      return 'bg-gray-100'
  }
}

/**
 * Get transaction amount color class based on type
 */
export function getTransactionAmountColor(type: string): string {
  switch (type) {
    case 'Deposit':
      return 'text-green-600'
    case 'Withdraw':
    case 'Transfer':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}

/**
 * Format transaction date for display
 */
export function formatTransactionDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
