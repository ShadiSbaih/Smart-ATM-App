import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Cake, Gift, PartyPopper, Sparkles } from 'lucide-react'
import { isTodayBirthday, calculateAge } from '@/utils/dateUtils'
import type { User } from '@/services/mockApi'

interface BirthdayPopupProps {
  user: User | null
}

export default function BirthdayPopup({ user }: BirthdayPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShownThisSession, setHasShownThisSession] = useState(false)

  useEffect(() => {
    // Check if it's the user's birthday and if we haven't shown the popup yet this session
    if (user && isTodayBirthday(user.birthday) && !hasShownThisSession) {
      // Get the last shown date from sessionStorage
      const lastShown = sessionStorage.getItem('birthday-popup-shown')
      const today = new Date().toDateString()

      // Only show if we haven't shown it today in this session
      if (lastShown !== today) {
        setIsOpen(true)
        setHasShownThisSession(true)
        sessionStorage.setItem('birthday-popup-shown', today)
      }
    }
  }, [user, hasShownThisSession])

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!user || !isTodayBirthday(user.birthday)) {
    return null
  }

  const age = calculateAge(user.birthday)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -top-2 -right-2 animate-bounce">
                <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-4 rounded-full">
                <Cake className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 animate-pulse">
                <Gift className="w-6 h-6 text-pink-400 fill-pink-400" />
              </div>
            </div>
          </div>
          
          <DialogTitle className="text-center text-2xl">
            <div className="flex items-center justify-center gap-2">
              <PartyPopper className="w-6 h-6 text-purple-600" />
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Happy Birthday!
              </span>
              <PartyPopper className="w-6 h-6 text-purple-600" />
            </div>
          </DialogTitle>
          
          <DialogDescription className="text-center space-y-3 pt-2">
            <p className="text-lg font-semibold text-slate-800">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-base text-slate-600">
              Wishing you a wonderful {age > 0 ? `${age}th` : ''} birthday! 🎉
            </p>
            <p className="text-sm text-slate-500">
              May this year bring you joy, success, and prosperity!
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
            <p className="text-sm text-center text-slate-700">
              🎁 <span className="font-semibold">Special Birthday Bonus:</span> Check your account for a surprise!
            </p>
          </div>

          <Button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          >
            Thank You! 🎂
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
