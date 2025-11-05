import { Wallet } from 'lucide-react'

interface BalanceCardProps {
  balance: number
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 rounded-3xl p-8 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
          <Wallet className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <p className="text-sm text-slate-600 font-medium mb-2">Current Balance</p>
          <h2 className="text-4xl font-bold text-indigo-600">
            {balance.toFixed(2)} ILS
          </h2>
        </div>
      </div>
    </div>
  )
}
