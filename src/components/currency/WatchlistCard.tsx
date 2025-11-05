import { Star, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useWatchlistStore } from '@/stores/watchlistStore'
import { toast } from 'sonner'

export const WatchlistCard = () => {
	const { watchlist, removeFromWatchlist } = useWatchlistStore()

	const handleRemove = (code: string) => {
		removeFromWatchlist(code)
		toast.success(`${code} removed from watchlist`)
	}

	if (watchlist.length === 0) {
		return (
			<Card className="border-dashed">
				<CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
					<Star className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
					<h3 className="text-base sm:text-lg font-semibold mb-2">No currencies in watchlist</h3>
					<p className="text-sm text-muted-foreground text-center max-w-sm px-4">
						Add currencies to your watchlist by clicking the star icon on any currency card.
					</p>
				</CardContent>
			</Card>
		)
	}

	return (
		<div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">{watchlist.map((currency) => (
				<Card key={currency.code} className="relative">
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center justify-between text-base sm:text-lg">
							<span className="flex items-center gap-2">
								<Star className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
								{currency.code}
							</span>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => handleRemove(currency.code)}
								className="h-8 w-8 text-destructive hover:text-destructive shrink-0"
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-xl sm:text-2xl font-bold">₪{currency.rate.toFixed(2)}</div>
						<p className="text-xs text-muted-foreground mt-1">
							1 {currency.code} = {currency.rate.toFixed(2)} ILS
						</p>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
