import { useState, useEffect } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { CurrencyList } from '@/components/currency/CurrencyList'
import { WatchlistCard } from '@/components/currency/WatchlistCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Currency } from '@/types'
import { Loader2 } from 'lucide-react'

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
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// Simulate loading currencies
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 800)
		return () => clearTimeout(timer)
	}, [])

	return (
		<MainLayout>
			<div className="max-w-7xl mx-auto space-y-6 ml-16 mr-16 mb-16">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl sm:text-3xl font-bold">Currency Exchange</h1>
					<p className="text-sm sm:text-base text-muted-foreground">
						Monitor currency exchange rates and manage your watchlist
					</p>
				</div>

				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					<TabsList className="grid w-full max-w-md grid-cols-2 dark:bg-transparent">
						<TabsTrigger value="all">All Currencies</TabsTrigger>
						<TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
					</TabsList>

					<TabsContent value="all" className="mt-6">
						<Card className="dark:bg-transparent">
							<CardHeader>
								<CardTitle className='dark:text-white'>Available Currencies</CardTitle>
								<CardDescription>
									Click the star icon to add currencies to your watchlist
								</CardDescription>
							</CardHeader>
							<CardContent>
								{isLoading ? (
									<div className="flex justify-center items-center py-12">
										<Loader2 className="h-8 w-8 animate-spin text-primary" />
									</div>
								) : (
									<CurrencyList currencies={MOCK_CURRENCIES} />
								)}
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="watchlist" className="mt-6">
						<Card className="dark:bg-transparent dark:text-white">
							<CardHeader>
								<CardTitle>My Watchlist</CardTitle>
								<CardDescription>
									Your favorite currencies for quick access
								</CardDescription>
							</CardHeader>
							<CardContent>
								{isLoading ? (
									<div className="flex justify-center items-center py-12">
										<Loader2 className="h-8 w-8 animate-spin text-primary" />
									</div>
								) : (
									<WatchlistCard />
								)}
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</MainLayout>
	)
}

export default WatchlistPage
