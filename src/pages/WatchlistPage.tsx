import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { CurrencyList } from '@/components/currency/CurrencyList'
import { WatchlistCard } from '@/components/currency/WatchlistCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Currency } from '@/stores/watchlistStore'

// Mock currency data as specified in requirements
const MOCK_CURRENCIES: Currency[] = [
	{ code: 'USD', rate: 3.7 },
	{ code: 'EUR', rate: 4.1 },
	{ code: 'JOD', rate: 5.2 },
	{ code: 'GBP', rate: 4.8 },
	{ code: 'SAR', rate: 0.99 },
	{ code: 'AED', rate: 1.01 },
]

export const WatchlistPage = () => {
	const [activeTab, setActiveTab] = useState('all')

	return (
		<MainLayout>
			<div className="max-w-7xl mx-auto space-y-6">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl sm:text-3xl font-bold">Currency Exchange</h1>
					<p className="text-sm sm:text-base text-muted-foreground">
						Monitor currency exchange rates and manage your watchlist
					</p>
				</div>

				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					<TabsList className="grid w-full max-w-md grid-cols-2">
						<TabsTrigger value="all">All Currencies</TabsTrigger>
						<TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
					</TabsList>

					<TabsContent value="all" className="mt-6">
						<Card>
							<CardHeader>
								<CardTitle>Available Currencies</CardTitle>
								<CardDescription>
									Click the star icon to add currencies to your watchlist
								</CardDescription>
							</CardHeader>
							<CardContent>
								<CurrencyList currencies={MOCK_CURRENCIES} />
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="watchlist" className="mt-6">
						<Card>
							<CardHeader>
								<CardTitle>My Watchlist</CardTitle>
								<CardDescription>
									Your favorite currencies for quick access
								</CardDescription>
							</CardHeader>
							<CardContent>
								<WatchlistCard />
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</MainLayout>
	)
}

export default WatchlistPage
