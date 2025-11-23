import MainLayout from '@/components/layout/MainLayout';
import DepositForm from '@/components/forms/DepositForm';
import { useState } from 'react';

export const DepositPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold"></h1>
        <button
          onClick={() => setOpen(true)}
          className={`flex items-center gap-4 p-6 bg-gray-800 text-white hover:text-gray-200 hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:text-white dark:hover:bg-gray-500 rounded-2xl border-2 border-purple-200 hover:shadow-md transition-all duration-200 text-left`}
        >
          Deposit
        </button>
        <DepositForm open={open} onOpenChange={setOpen} />
      </div>
    </MainLayout>
  );
};

export default DepositPage;
