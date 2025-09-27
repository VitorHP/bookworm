import React from 'react';
import { useLibrarianDashboard } from '@/contexts/LibrarianDashboardContext';
import type { Borrowing } from '@/types/api';

interface ReturnButtonProps {
  borrowing: Borrowing;
}

export const ReturnButton: React.FC<ReturnButtonProps> = ({ borrowing }) => {
  const { returnBook, isReturning } = useLibrarianDashboard();

  return (
    <button
      onClick={() => returnBook(borrowing.id)}
      disabled={isReturning}
      className={`inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white
        ${
          isReturning
            ? 'bg-indigo-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        }
      `}
    >
      {isReturning ? 'Marking as returned...' : 'Mark as returned'}
    </button>
  );
};
