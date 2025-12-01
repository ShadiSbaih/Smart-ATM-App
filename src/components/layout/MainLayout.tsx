import type { MainLayoutProps } from '@/types'
import Sidebar from './Sidebar'
import Header from './Header'

export const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<div className="flex min-h-screen bg-slate-50 dark:bg-gray-900">
			{/* Sidebar - Hidden on mobile, visible on desktop */}
			<div className="hidden lg:block">
				<Sidebar />
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col w-full overflow-x-hidden">
				{/* Header */}
				<Header />

				{/* Page Content */}
				<main className="flex-1 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white pt-24">
					{children}
				</main>
			</div>
		</div>
	)
}

export default MainLayout
