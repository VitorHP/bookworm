import React, { createContext, useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BorrowingStatus } from '@/types/api';
import { LibrarianDashboardData } from '@/types/dashboard';
import { borrowingsApi } from '@/utils/api';

const LibrarianDashboardContext = createContext<LibrarianDashboardData | undefined>(undefined);

export const LibrarianDashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedStatuses, setSelectedStatuses] = useState<BorrowingStatus[]>(['active']);

  const queryClient = useQueryClient();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['borrowings', 'librarian', selectedStatuses],
    queryFn: async () => {
      const response = await borrowingsApi.search({ status: selectedStatuses });
      return response;
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  const { mutateAsync, isLoading: isReturning } = useMutation({
    mutationFn: (borrowingId: number) => borrowingsApi.return(borrowingId),
    onSuccess: () => {
      queryClient.invalidateQueries(['borrowings']);
    },
  });

  const returnBook = async (borrowingId: number): Promise<void> => {
    await mutateAsync(borrowingId);
  };

  const toggleStatus = (status: BorrowingStatus) => {
    setSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const value: LibrarianDashboardData = {
    totalBooks: 0,
    borrowings: data?.data ?? [],
    selectedStatuses,
    isLoading,
    error: error as Error | null,
    toggleStatus,
    returnBook,
    isReturning,
  };

  return (
    <LibrarianDashboardContext.Provider value={value}>
      {children}
    </LibrarianDashboardContext.Provider>
  );
};

export const useLibrarianDashboard = () => {
  const context = useContext(LibrarianDashboardContext);
  if (!context) {
    throw new Error('useLibrarianDashboard must be used within a LibrarianDashboardProvider');
  }
  return context;
};
