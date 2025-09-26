import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Book } from '@/types/api';
import { booksApi } from '@/utils/api';
import BookList from './BookList';
import SearchForm from './SearchForm';

interface SearchParams {
  title?: string;
  author?: string;
  genre?: string;
}

const BooksSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const { data: books, isLoading } = useQuery({
    queryKey: ['books', searchParams],
    queryFn: async () => {
      const response = await booksApi.search(searchParams);
      return response.data;
    },
  });

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Library Books</h1>
      
      <SearchForm onSearch={handleSearch} />
      
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
