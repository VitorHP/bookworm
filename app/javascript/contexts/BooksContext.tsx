import React, { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Book } from '@/types/api';
import { booksApi } from '@/utils/api';

interface SearchParams {
  title?: string;
  author?: string;
  genre?: string;
}

interface BooksContextData {
  books: Book[];
  isLoading: boolean;
  error: Error | null;
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
}

const BooksContext = createContext<BooksContextData | undefined>(undefined);

export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ['books', searchParams],
    queryFn: async () => {
      const response = await booksApi.search(searchParams);
      return response.data;
    },
  });

  const value: BooksContextData = {
    books,
    isLoading,
    error: error as Error | null,
    searchParams,
    setSearchParams,
  };

  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
};
