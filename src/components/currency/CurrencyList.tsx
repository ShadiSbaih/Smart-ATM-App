import { useMemo } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useWatchlistStore } from '@/stores/watchlistStore'
import { toast } from 'sonner'
import type { CurrencyListProps, Currency } from '@/types'

export const CurrencyList = ({ currencies }: CurrencyListProps) => {
	const { addToWatchlist, removeFromWatchlist, isInWatchlist, watchlist } = useWatchlistStore()

	const handleToggleWatchlist = (currency: Currency) => {
		const inWatchlist = isInWatchlist(currency.code)
		
		if (inWatchlist) {
			removeFromWatchlist(currency.code)
			toast.success(`${currency.code} removed from watchlist`)
		} else {
			addToWatchlist(currency)
			toast.success(`${currency.code} added to watchlist`)
		}
	}

	// Memoize watchlist status for better performance
	const watchlistStatus = useMemo(() => {
		return currencies.reduce((acc, currency) => {
			acc[currency.code] = isInWatchlist(currency.code);
			return acc;
		}, {} as Record<string, boolean>);
	}, [currencies, watchlist]);

	return (
		<div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			{currencies.map((currency) => {
				const inWatchlist = watchlistStatus[currency.code]
				
				return (
					<Card key={currency.code} className="relative dark:bg-transparent">
						<CardHeader className="pb-3">
							<CardTitle className="flex items-center justify-between text-base sm:text-lg dark:text-white">
								<span>{currency.code}</span>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => handleToggleWatchlist(currency)}
									className="h-8 w-8 shrink-0"
								>
									<Star
										className={`h-4 w-4 sm:h-5 sm:w-5 ${
											inWatchlist
												? 'fill-yellow-400 text-yellow-400'
												: 'text-muted-foreground'
										}`}
									/>
								</Button>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-xl sm:text-2xl font-bold dark:text-white">₪{currency.rate.toFixed(2)}</div>
							<p className="text-xs text-muted-foreground mt-1">
								1 {currency.code} = {currency.rate.toFixed(2)} ILS
							</p>
						</CardContent>
					</Card>
				)
			})}
		</div>
	)
}
