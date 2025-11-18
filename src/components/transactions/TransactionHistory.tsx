import { useState } from 'react';
import { ArrowDownCircle, ArrowUpCircle, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Transaction, TransactionHistoryProps } from '@/types';
import {
  formatTransactionDate,
  getTransactionBgClass,
  getTransactionAmountColor,
} from '@/utils/transactionUtils';

export default function TransactionHistory({
  transactions,
  itemsPerPage = 10,
}: TransactionHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'Deposit':
        return <ArrowDownCircle className="h-6 w-6 text-violet-600" />;
      case 'Withdraw':
        return <ArrowUpCircle className="h-6 w-6 text-blue-600" />;
      case 'Transfer':
        return <ArrowRightLeft className="h-6 w-6 text-orange-600" />;
      default:
        return <ArrowRightLeft className="h-6 w-6 text-gray-600" />;
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
          <ArrowRightLeft className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          No Transactions Yet
        </h3>
        <p className="text-slate-600">
          Your transaction history will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-transparent rounded-2xl border-2 border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Transaction History
            </h2>
            <div className="text-sm text-slate-500">
              Total: {transactions.length} transactions
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-slate-200">
          {currentTransactions.map((transaction: Transaction) => (
            <div
              key={transaction.id}
              className="p-6 hover:bg-black transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 ">
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center ${getTransactionBgClass(
                      transaction.type
                    )}`}
                  >
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {transaction.type}
                    </div>
                    {transaction.target_user && (
                      <div className="text-sm text-slate-600">
                        To: {transaction.target_user}
                      </div>
                    )}
                    <div className="text-xs text-slate-500 mt-1">
                      {formatTransactionDate(transaction.date)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-xl font-bold ${getTransactionAmountColor(
                      transaction.type
                    )}`}
                  >
                    {transaction.type === 'Deposit' ? '+' : '-'}
                    {transaction.amount}
                  </div>
                  <div className="text-sm text-slate-500 ">
                    {transaction.currency}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-6 border-t border-slate-200">
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="dark:text-gray-900"
              >
                Previous
              </Button>
              <div className="flex items-center gap-1 dark:text-gray-900">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? 'bg-violet-600 hover:bg-violet-700 '
                          : ''
                      }
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="dark:text-gray-900"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
