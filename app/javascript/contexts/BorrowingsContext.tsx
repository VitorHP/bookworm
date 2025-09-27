import React, { createContext, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { borrowingsApi } from '@/utils/api';
import { Borrowing } from '@/types/api';

interface BorrowingsContextData {
  borrowBook: (bookId: number) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

const BorrowingsContext = createContext<BorrowingsContextData | undefined>(undefined);

export const BorrowingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const { mutateAsync: borrowBook, isLoading, error } = useMutation({
    mutationFn: async (bookId: number) => {
      await borrowingsApi.create({ book_id: bookId, member_id: 0 }); // member_id is not needed as it's taken from the token
    },
    onSuccess: () => {
      // Invalidate books query to refresh the available copies
      queryClient.invalidateQueries(['books']);
    },
  });

  const value: BorrowingsContextData = {
    borrowBook,
    isLoading,
    error: error as Error | null,
  };

  return (
    <BorrowingsContext.Provider value={value}>
      {children}
    </BorrowingsContext.Provider>
  );
};

export const useBorrowings = () => {
  const context = useContext(BorrowingsContext);
  if (!context) {
    throw new Error('useBorrowings must be used within a BorrowingsProvider');
  }
  return context;
};
