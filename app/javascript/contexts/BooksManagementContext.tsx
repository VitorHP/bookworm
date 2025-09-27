import React, { createContext, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { booksApi } from '@/utils/api';
import type { Book } from '@/types/api';

interface CreateBookData {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  total_copies: number;
}

interface UpdateBookData extends Partial<CreateBookData> {
  id: number;
}

interface BooksManagementContextData {
  createBook: (data: CreateBookData) => Promise<Book>;
  updateBook: (data: UpdateBookData) => Promise<Book>;
  deleteBook: (id: number) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: Error | null;
}

const BooksManagementContext = createContext<BooksManagementContextData | undefined>(undefined);

export const BooksManagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createBook, isLoading: isCreating } = useMutation({
    mutationFn: async (data: CreateBookData) => {
      const response = await booksApi.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
    },
  });

  const { mutateAsync: updateBook, isLoading: isUpdating } = useMutation({
    mutationFn: async ({ id, ...data }: UpdateBookData) => {
      const response = await booksApi.update(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
    },
  });

  const { mutateAsync: deleteBook, isLoading: isDeleting } = useMutation({
    mutationFn: async (id: number) => {
      await booksApi.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
    },
  });

  const value: BooksManagementContextData = {
    createBook,
    updateBook,
    deleteBook,
    isCreating,
    isUpdating,
    isDeleting,
    error: null,
  };

  return (
    <BooksManagementContext.Provider value={value}>
      {children}
    </BooksManagementContext.Provider>
  );
};

export const useBooksManagement = () => {
  const context = useContext(BooksManagementContext);
  if (!context) {
    throw new Error('useBooksManagement must be used within a BooksManagementProvider');
  }
  return context;
};
