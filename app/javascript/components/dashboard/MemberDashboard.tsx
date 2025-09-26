import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { borrowingsApi } from '@/utils/api';
import { BorrowingCard } from './BorrowingCard';

const MemberDashboard: React.FC = () => {
  const { data: borrowings, isLoading, error } = useQuery(
    ['borrowings'],
    () => borrowingsApi.search({ status: [] })
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
          Failed to load your borrowings.
        </div>
      </div>
    );
  }

  if (!borrowings?.data.length) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">My Borrowings</h2>
        <p className="text-gray-500 mb-4">You don't have any borrowed books.</p>
        <a
          href="/member/books"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Browse Books
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-6">My Borrowings</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {borrowings.data.map((borrowing) => (
          <BorrowingCard key={borrowing.id} borrowing={borrowing} />
        ))}
      </div>
    </div>
  );
};

export default MemberDashboard;
