import { Routes, Route } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import DepositPage from '@/pages/DepositPage'
import WithdrawPage from '@/pages/WithdrawPage'
import HistoryPage from '@/pages/HistoryPage'
import WatchlistPage from '@/pages/WatchlistPage'
import SettingsPage from '@/pages/SettingsPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProtectedRoute from '@/components/ProtectedRoute'

export const AppRoutes = () => {
	return (
		<Routes>
			{/* Public Routes */}
			<Route path="/login" element={<LoginPage />} />
			<Route path="/" element={<LoginPage />} />

			{/* Protected Routes */}
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<DashboardPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/deposit"
				element={
					<ProtectedRoute>
						<DepositPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/withdraw"
				element={
					<ProtectedRoute>
						<WithdrawPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/history"
				element={
					<ProtectedRoute>
						<HistoryPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/watchlist"
				element={
					<ProtectedRoute>
						<WatchlistPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/settings"
				element={
					<ProtectedRoute>
						<SettingsPage />
					</ProtectedRoute>
				}
			/>

			{/* 404 Route - Must be last */}
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	)
}

export default AppRoutes
