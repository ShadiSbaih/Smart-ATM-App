import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuthStore from '@/stores/authStore'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { LogOut, Menu, X, Home, History, TrendingUp, Settings as SettingsIcon } from 'lucide-react'
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
    icon: SettingsIcon,
  },
]

export default function Header() {
  const user = useAuthStore((s) => s.user)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <header className="bg-white border-b px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Menu button */}
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>

            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">Bank ATM</h1>
          </div>

          {/* Right side - User info */}
          <div className="flex items-center gap-2 sm:gap-4">
            {user && (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden sm:flex items-center gap-3">
                  {user.profile_img ? (
                    <img
                      src={user.profile_img}
                      alt={user.first_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-700 font-semibold">
                        {user.first_name?.charAt(0)}
                        {user.last_name?.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-semibold text-slate-900">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-xs text-slate-500">@{user.user_name}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-slate-600 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* User Info in Mobile Menu */}
            {user && (
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  {user.profile_img ? (
                    <img
                      src={user.profile_img}
                      alt={user.first_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-700 font-semibold text-lg">
                        {user.first_name?.charAt(0)}
                        {user.last_name?.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-xs text-slate-500">@{user.user_name}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path
                const Icon = item.icon

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
