import { Link, useLocation } from 'react-router-dom'
import { Home, History, TrendingUp, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: Home,
  },
  {
    name: 'History',
    path: '/history',
    icon: History,
  },
  {
    name: 'Watchlist',
    path: '/watchlist',
    icon: TrendingUp,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
  },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-r min-h-screen p-6 pt-24 h-full">
      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-indigo-100 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 dark:hover:text-gray-800 dark:text-white hover:text-slate-900'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
