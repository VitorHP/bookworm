import React from 'react';
import { Book } from '@/types/api';

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No books found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
          <p className="text-gray-600 mb-2">by {book.author}</p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>Genre: {book.genre}</p>
            <p>ISBN: {book.isbn}</p>
            <p className="mt-2">
              {book.total_copies > 0 ? (
                <span className="text-green-600">
                  {book.total_copies} copies available
                </span>
              ) : (
                <span className="text-red-600">Out of stock</span>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
