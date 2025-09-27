import React from 'react';
import { formatDate } from '@/utils/formatters';

import type { Borrowing } from '@/types/api';

interface BorrowingCardProps {
  borrowing: Borrowing;
  actions?: React.ReactNode;
}

const borrowingStatus = (dueDate: string) => {
  const now = new Date();
  const due = new Date(dueDate);
  return due < now ? 'overdue' : 'active';
};

export const BorrowingCard: React.FC<BorrowingCardProps> = ({ borrowing, actions }) => {
  const status = borrowingStatus(borrowing.due_date);

  return (
    <div
      className={`bg-white rounded-lg shadow-sm overflow-hidden ${
        status === 'overdue' ? 'ring-2 ring-red-500' : ''
      }`}
    >
      <div className="p-4 space-y-3">
        <div className="pt-2">
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
              status === 'overdue'
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {status === 'overdue' ? 'Overdue' : 'Active'}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
            {borrowing.book.title}
          </h3>
          <p className="text-sm text-gray-500">
            {borrowing.book.author}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <dt className="text-gray-500">Borrowed</dt>
          <dd className="text-gray-900">{formatDate(borrowing.created_at)}</dd>
          
          <dt className="text-gray-500">Due Date</dt>
          <dd className="text-gray-900">{formatDate(borrowing.due_date)}</dd>
        </dl>


        <div className="mt-4 space-y-2">
          <a
            href={`/books/${borrowing.book.id}`}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Book Details
          </a>
          {actions && <div className="flex justify-end">{actions}</div>}
        </div>
      </div>
    </div>
  );
};
