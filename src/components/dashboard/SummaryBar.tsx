import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpCircle, ArrowDownCircle, Clock, Calendar } from 'lucide-react'
import type { User } from '@/services/mockApi'

interface SummaryBarProps {
  user: User | null
}

export default function SummaryBar({ user }: SummaryBarProps) {
  const totalTransactions = user?.transactions?.length || 0
  
  const deposits = user?.transactions?.filter((t) => t.type === 'Deposit').length || 0
  const withdrawals = user?.transactions?.filter((t) => t.type === 'Withdraw').length || 0
  
  // Get the last transaction date
  const lastTransaction = user?.transactions?.[0]
  const lastTransactionDate = lastTransaction
    ? new Date(lastTransaction.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : 'No transactions'

  const summaryItems = [
    {
      label: 'Total Transactions',
      value: totalTransactions.toString(),
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Deposits',
      value: deposits.toString(),
      icon: <ArrowUpCircle className="w-5 h-5 text-green-600" />,
      bgColor: 'bg-green-50',
    },
    {
      label: 'Withdrawals',
      value: withdrawals.toString(),
      icon: <ArrowDownCircle className="w-5 h-5 text-red-600" />,
      bgColor: 'bg-red-50',
    },
    {
      label: 'Last Activity',
      value: lastTransactionDate,
      icon: <Calendar className="w-5 h-5 text-purple-600" />,
      bgColor: 'bg-purple-50',
    },
  ]

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {summaryItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className={`${item.bgColor} p-2 rounded-lg`}>
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-600 font-medium">
                  {item.label}
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
