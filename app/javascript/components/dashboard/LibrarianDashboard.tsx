import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { borrowingsApi } from '@/utils/api';
import { BorrowingCard } from './BorrowingCard';
import type { BorrowingStatus } from '@/types/api';

const LibrarianDashboard: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = React.useState<BorrowingStatus[]>([]);

  const { data: borrowings, isLoading, error } = useQuery(
    ['borrowings', selectedStatus],
    () => borrowingsApi.search({ status: selectedStatus })
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="text-sm text-red-700">
          Failed to load borrowings.
        </div>
      </div>
    );
  }

  const statusOptions: BorrowingStatus[] = ['active', 'due_today', 'overdue', 'returned'];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Borrowings</h2>

        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => {
                setSelectedStatus((prev) =>
                  prev.includes(status)
                    ? prev.filter((s) => s !== status)
                    : [...prev, status]
                );
              }}
              className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium capitalize
                ${
                  selectedStatus.includes(status)
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {borrowings?.data.map((borrowing) => (
          <BorrowingCard key={borrowing.id} borrowing={borrowing} />
        ))}
      </div>

      {(!borrowings?.data || borrowings.data.length === 0) && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No borrowings found.</p>
          {selectedStatus.length > 0 && (
            <p className="text-sm text-gray-400 mt-2">
              Try changing the status filters above.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LibrarianDashboard;
