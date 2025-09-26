import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { borrowingsApi } from '@/utils/api';
import { formatDate } from '@/utils/formatters';

const MemberDashboard: React.FC = () => {
  const { data: borrowings, isLoading, error } = useQuery(
    ['borrowings'],
    () => borrowingsApi.search({ status: ['active', 'overdue'] })
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

  const borrowingStatus = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    return due < now ? 'overdue' : 'active';
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">My Borrowings</h2>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Book
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Borrowed Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {borrowings.data.map((borrowing) => (
              <tr key={borrowing.id} className={borrowing.status === 'overdue' ? 'bg-red-50' : undefined}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {borrowing.book.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {borrowing.book.author}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(borrowing.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(borrowing.due_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      borrowingStatus(borrowing.due_date) === 'overdue'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {borrowingStatus(borrowing.due_date) === 'overdue' ? 'Overdue' : 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberDashboard;
