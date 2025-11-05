import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Home, AlertCircle } from 'lucide-react'

export const NotFoundPage = () => {
	const navigate = useNavigate()

	const handleGoHome = () => {
		navigate('/dashboard')
	}

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
			<Card className="w-full max-w-md">
				<CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-6">
					<div className="relative">
						<AlertCircle className="h-24 w-24 text-muted-foreground/40" />
						<div className="absolute inset-0 flex items-center justify-center">
							<span className="text-6xl font-bold text-muted-foreground">404</span>
						</div>
					</div>

					<div className="space-y-2">
						<h1 className="text-3xl font-bold">⚠️ Oops! Page not found</h1>
						<p className="text-muted-foreground text-lg">
							The page you're looking for doesn't exist.
						</p>
					</div>

					<div className="pt-4">
						<Button onClick={handleGoHome} size="lg" className="gap-2">
							<Home className="h-5 w-5" />
							Go Home
						</Button>
					</div>

					<p className="text-sm text-muted-foreground">
						Error Code: 404 - Page Not Found
					</p>
				</CardContent>
			</Card>
		</div>
	)
}

export default NotFoundPage
