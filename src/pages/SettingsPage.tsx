import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useAuthStore } from '@/stores/authStore'
import { useWatchlistStore } from '@/stores/watchlistStore'
import { toast } from 'sonner'
import { AlertTriangle, Trash2, LogOut, User, Star } from 'lucide-react'
import confetti from 'canvas-confetti'

export const SettingsPage = () => {
	const navigate = useNavigate()
	const { user, clear: clearAuth } = useAuthStore()
	const { clearWatchlist,watchlist } = useWatchlistStore()
	const [showResetDialog, setShowResetDialog] = useState(false)

	const handleResetAccount = async () => {
		try {
			// Clear authentication and watchlist
			clearAuth()
			clearWatchlist()

			toast.success('Account reset successfully')
			setShowResetDialog(false)

			// Redirect to login page
			navigate('/login')
		} catch (error) {
			toast.error('Failed to reset account')
			console.error('Reset error:', error)
		}
	}

	const handleLogout = () => {
		clearAuth()
		toast.success('Logged out successfully')
		navigate('/login')
	}

	const handleBirthdayTest = () => {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 }
		})
		toast.success('🎉 Happy Birthday!', {
			description: 'Wishing you a day full of happiness and joy! 💖'
		})
	}

	return (
		<MainLayout>
			<div className="max-w-4xl mx-auto space-y-6 mb-16">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
					<p className="text-sm sm:text-base text-muted-foreground">
						Manage your account preferences and data
					</p>
				</div>

				{/* User Info Card */}
				<Card className='dark:bg-transparent'>
					<CardHeader>
						<CardTitle className="flex items-center gap-2 dark:text-white">
							<User className="h-5 w-5" />
							Account Information
						</CardTitle>
						<CardDescription>Your current account details</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center gap-4">
							{user?.profile_img && (
								<img
									src={user.profile_img}
									alt={user.first_name}
									className="h-16 w-16 rounded-full object-cover"
								/>
							)}
							<div>
								<p className="font-semibold text-lg dark:text-white">
									{user?.first_name} {user?.last_name}
								</p>
								<p className="text-sm text-muted-foreground">@{user?.user_name}</p>
								<p className="text-sm text-muted-foreground">
									Balance: ₪{user?.balance?.toFixed(2) || '0.00'}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Watchlist Info */}
				<Card className='dark:bg-transparent'>
					<CardHeader>
						<CardTitle className="flex items-center gap-2 dark:text-white">
							<Star className="h-5 w-5" />
							Watchlist
						</CardTitle>
						<CardDescription>Your currency watchlist status</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm dark:text-white">
							You have <span className="font-semibold">{watchlist.length}</span> {watchlist.length === 1 ? 'currency' : 'currencies'} in your watchlist
						</p>
					</CardContent>
				</Card>

				{/* Test Birthday Feature */}
				<Card className='dark:bg-transparent'>
					<CardHeader>
						<CardTitle className="dark:text-white">Test Features</CardTitle>
						<CardDescription>Test optional app features</CardDescription>
					</CardHeader>
					<CardContent>
						<Button onClick={handleBirthdayTest} variant="outline" className="w-full sm:w-auto">
							🎂 Test Birthday Confetti
						</Button>
					</CardContent>
				</Card>

				{/* Danger Zone */}
				<Card className="border-destructive/50 dark:bg-transparent">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-destructive">
							<AlertTriangle className="h-5 w-5" />
							Danger Zone
						</CardTitle>
						<CardDescription>
							Irreversible actions that will affect your account
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p className="font-semibold dark:text-white">Reset Account</p>
								<p className="text-sm text-muted-foreground">
									Clear all your data and log out
								</p>
							</div>
							<Button
								variant="destructive"
								onClick={() => setShowResetDialog(true)}
								className="w-full sm:w-auto"
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Reset Account
							</Button>
						</div>

						<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4 border-t">
							<div>
								<p className="font-semibold dark:text-white">Log Out</p>
								<p className="text-sm text-muted-foreground">
									Sign out of your account
								</p>
							</div>
							<Button
								variant="outline"
								onClick={handleLogout}
								className="w-full sm:w-auto"
							>
								<LogOut className="mr-2 h-4 w-4" />
								Log Out
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Reset Confirmation Dialog */}
				<Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle className="flex items-center gap-2 dark:text-gray-900">
								<AlertTriangle className="h-5 w-5 text-destructive " />
								Are you absolutely sure?
							</DialogTitle>
							<DialogDescription className="space-y-2 dark:text-gray-900">
								<p>
									This action cannot be undone. This will permanently delete your:
								</p>
								<ul className="list-disc list-inside space-y-1 text-sm">
									<li>Account balance</li>
									<li>Transaction history</li>
									<li>Watchlist</li>
									<li>All preferences</li>
								</ul>
								<p className="font-semibold pt-2">
									You will be logged out and need to log in again.
								</p>
							</DialogDescription>
						</DialogHeader>
						<DialogFooter className="flex gap-2">
							<Button
								variant="outline"
								onClick={() => setShowResetDialog(false)}
								className='dark:text-gray-900'
							>
								Cancel
							</Button>
							<Button
								variant="destructive"
								onClick={handleResetAccount}
							>
								Yes, Reset My Account
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</MainLayout>
	)
}

export default SettingsPage
