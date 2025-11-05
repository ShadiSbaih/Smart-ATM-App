import { useState } from 'react'

export type Currency = 'ILS' | 'USD' | 'EUR' | 'GBP'

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  ILS: '₪',
  USD: '$',
  EUR: '€',
  GBP: '£',
}

const CURRENCY_NAMES: Record<Currency, string> = {
  ILS: 'Israeli Shekel',
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
}

/**
 * Hook to manage currency display and conversion
 */
export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>('ILS')

  const formatAmount = (amount: number): string => {
    const symbol = CURRENCY_SYMBOLS[currency]
    return `${symbol}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  const getCurrencySymbol = (): string => {
    return CURRENCY_SYMBOLS[currency]
  }

  const getCurrencyName = (): string => {
    return CURRENCY_NAMES[currency]
  }

  return {
    currency,
    setCurrency,
    formatAmount,
    getCurrencySymbol,
    getCurrencyName,
  }
}
