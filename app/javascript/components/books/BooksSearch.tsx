import React from 'react';
import { useBooks } from '@/contexts/BooksContext';
import BookList from './BookList';
import SearchForm from './SearchForm';

const BooksSearch: React.FC = () => {
  const { books, isLoading, setSearchParams } = useBooks();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Library Books</h1>

      <SearchForm />

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <BookList books={books || []} />
      )}
    </div>
  );
};

export default BooksSearch;
