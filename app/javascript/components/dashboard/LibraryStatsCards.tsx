import React from 'react';
import { LibraryStats } from '@/types/api';

interface StatsCardProps {
  label: string;
  value: number;
  loading?: boolean;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, loading, className }) => (
  <div className={`p-6 bg-white rounded-lg shadow-sm ${className}`}>
    <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
    <dd className="mt-1 text-3xl font-semibold text-gray-900">
      {loading ? (
        <div className="animate-pulse h-9 w-16 bg-gray-200 rounded"></div>
      ) : (
        value
      )}
    </dd>
  </div>
);

interface LibraryStatsProps {
  stats: LibraryStats;
  loading?: boolean;
}

export const LibraryStatsCards: React.FC<LibraryStatsProps> = ({ stats, loading }) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <StatsCard
        label="Total Books"
        value={stats.total_books}
        loading={loading}
        className="border-l-4 border-blue-500"
      />
      <StatsCard
        label="Active Borrowings"
        value={stats.active_borrowings}
        loading={loading}
        className="border-l-4 border-green-500"
      />
      <StatsCard
        label="Overdue Borrowings"
        value={stats.overdue_borrowings}
        loading={loading}
        className="border-l-4 border-red-500"
      />
    </div>
  );
};
