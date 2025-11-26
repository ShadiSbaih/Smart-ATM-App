import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User, Key } from "lucide-react"
import type { LoginFormProps } from "@/types"
import Header from "@/components/layout/Header"

const visaImg = new URL('../assets/visa.png', import.meta.url).href

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [username, setUsername] = React.useState("")
  const [pin, setPin] = React.useState("")
  const [error, setError] = React.useState("") 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("") 

    
    if (username !== "sarah-abuzeneh" || pin !== "Sa1234") {
      setError("Invalid username or PIN. Please try again.") 
      return
    }

    try {
      const result = await onSubmit?.({ username, pin }) as { success?: boolean } | undefined
      if (!result || !result.success) {
        setError("Invalid username or PIN. Please try again.")
      }
    } catch {
      setError("An unexpected error occurred. Please try again.") 
    }
  }

  return (
    <>
    <div className="w-full dark:bg-gray-900">
    <Header />
    <div className="min-h-[540px] w-full max-w-4xl mx-auto bg-transparent mt-16">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-lg overflow-hidden shadow-sm dark:bg-gray-900">
        <div className="w-full md:w-1/2 p-10">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 bg-indigo-600/10 dark:bg-white rounded flex items-center justify-center">
              
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0" y="2" width="18" height="2" rx="1" fill="#5B21B6" />
                  <rect x="0" y="7" width="12" height="2" rx="1" fill="#5B21B6" />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-white">Bank ATM</span>
            </div>

            <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-2 dark:text-white">
              Welcome back!
            </h1>
            <p className="text-sm text-slate-500">
              Easily manage your balance, deposits, withdrawals, and transactions.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
              <Input
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                leftIcon={<User size={18} />}
                className="rounded-full border-[1.5px] border-purple-200 bg-transparent placeholder:text-slate-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">PIN</label>
              <Input
                type="password"
                placeholder="Enter your PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                leftIcon={<Key size={18} />}
                togglePassword
                className="rounded-full border-[1.5px] border-purple-200 bg-transparent placeholder:text-slate-300"
              />
            </div>

            {error && ( 
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm font-medium">
                {error}
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="w-full rounded-full px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-base font-semibold shadow-md"
                size="lg"
              >
                Login
              </Button>
            </div>
          </form>
        </div>

       
  <div className="md:w-1/2 w-full bg-transparent relative overflow-hidden flex items-center justify-center">
          <div className="relative inset-0 flex items-center justify-center pointer-events-none">
         
            <img
              src={visaImg}
              alt="visa-back"
              className="w-72 h-44 object-cover rounded-xl transform -rotate-6 translate-x-8 shadow-md border border-white/30 absolute"
              loading="lazy"
            />

            <img
              src={visaImg}
              alt="visa-front"
              className="w-80 h-48 object-cover rounded-xl transform rotate-6 shadow-lg border border-white/40 relative z-10"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )

}
