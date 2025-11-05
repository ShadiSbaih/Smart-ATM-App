import { create } from 'zustand'

export type Currency = {
	code: string
	rate: number
}

type WatchlistState = {
	watchlist: Currency[]
	addToWatchlist: (currency: Currency) => void
	removeFromWatchlist: (code: string) => void
	isInWatchlist: (code: string) => boolean
	clearWatchlist: () => void
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
	watchlist: [],
	addToWatchlist: (currency) => {
		const { watchlist } = get()
		if (!watchlist.find((c) => c.code === currency.code)) {
			set({ watchlist: [...watchlist, currency] })
		}
	},
	removeFromWatchlist: (code) => {
		const { watchlist } = get()
		set({ watchlist: watchlist.filter((c) => c.code !== code) })
	},
	isInWatchlist: (code) => {
		const { watchlist } = get()
		return watchlist.some((c) => c.code === code)
	},
	clearWatchlist: () => set({ watchlist: [] }),
}))

export default useWatchlistStore
