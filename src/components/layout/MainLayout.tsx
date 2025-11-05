import type { MainLayoutProps } from '@/types'
import Sidebar from './Sidebar'
import Header from './Header'

export const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<div className="flex min-h-screen bg-slate-50">
			{/* Sidebar - Hidden on mobile, visible on desktop */}
			<div className="hidden lg:block">
				<Sidebar />
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col w-full">
				{/* Header */}
				<Header />

				{/* Page Content */}
				<main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
					{children}
				</main>
			</div>
		</div>
	)
}

export default MainLayout
