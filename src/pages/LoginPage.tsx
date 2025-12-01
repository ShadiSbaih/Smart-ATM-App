import * as React from "react"
import { useNavigate } from 'react-router-dom'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User, Key, Loader2 } from "lucide-react"
import Header from "@/components/layout/Header"
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

const visaImg = new URL('../assets/visa.png', import.meta.url).href

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = React.useState("")
  const [pin, setPin] = React.useState("")
  const [error, setError] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    try {
      await login(username, pin)
      navigate('/dashboard')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid username or PIN. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
      <Header />
      
      {/* Main Content Container */}
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] mt-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          {/* Login Card with enhanced shadow and animation */}
          <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-col lg:flex-row items-stretch bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-purple-100/20 dark:border-purple-900/20 transition-all duration-300 hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30">
            
            {/* Left Side - Form Section */}
            <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
              {/* Header Section */}
              <header className="mb-10">
                {/* Welcome Text */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-3 tracking-tight">
                  Welcome back!
                </h1>
                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  Easily manage your balance, deposits, withdrawals, and transactions.
                </p>
              </header>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Username
                  </label>
                  <Input
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    leftIcon={<User size={18} />}
                    className="h-12 rounded-2xl border-2 border-purple-200/50 dark:border-purple-800/50 bg-white dark:bg-gray-800 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 transition-all duration-200"
                  />
                </div>

                {/* PIN Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    PIN
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter your PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    leftIcon={<Key size={18} />}
                    togglePassword
                    className="h-12 rounded-2xl border-2 border-purple-200/50 dark:border-purple-800/50 bg-white dark:bg-gray-800 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 transition-all duration-200"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm font-medium">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-2xl px-8 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 dark:from-violet-500 dark:to-purple-500 dark:hover:from-violet-600 dark:hover:to-purple-600 text-white text-base font-bold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </div>
              </form>

              {/* Additional Info/Links (Optional) */}
              <div className="mt-8 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Secure login powered by Bank ATM
                </p>
              </div>
            </div>

            {/* Right Side - Visual Section */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 relative overflow-hidden flex items-center justify-center p-8 sm:p-12 lg:p-16 min-h-[400px] lg:min-h-0">
              {/* Background Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl"></div>
              </div>

              {/* Card Images */}
              <div className="relative w-full max-w-md h-full flex items-center justify-center">
                {/* Back Card */}
                <img
                  src={visaImg}
                  alt="visa-back"
                  className="w-64 sm:w-72 lg:w-80 h-auto object-contain rounded-2xl transform -rotate-6 translate-x-6 sm:translate-x-8 shadow-2xl border border-white/40 dark:border-white/20 absolute transition-transform duration-500 hover:rotate-[-8deg] hover:translate-x-10"
                  loading="lazy"
                />

                {/* Front Card */}
                <img
                  src={visaImg}
                  alt="visa-front"
                  className="w-72 sm:w-80 lg:w-96 h-auto object-contain rounded-2xl transform rotate-6 shadow-2xl border border-white/60 dark:border-white/30 relative z-10 transition-transform duration-500 hover:rotate-[8deg] hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-8">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2025 Bank ATM. All rights reserved. | Secure & Reliable Banking
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
