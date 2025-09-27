import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useBorrowings } from '@/contexts/BorrowingsContext';
import { useBooksManagement } from '@/contexts/BooksManagementContext';
import type { Book } from '@/types/api';
import BookForm from './BookForm';

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const { user } = useAuth();
  const { borrowBook, isLoading: isBorrowing } = useBorrowings();
  const { deleteBook, isDeleting } = useBooksManagement();
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  if (books.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No books found.</p>
      </div>
    );
  }

  return (
    <>
      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">
              {selectedBook ? 'Edit Book' : 'Create New Book'}
            </h2>
            <BookForm
              book={selectedBook}
              onClose={() => {
                setIsFormOpen(false);
                setSelectedBook(undefined);
              }}
            />
          </div>
        </div>
      )}

      {user?.role === 'librarian' && (
        <div className="mb-6">
          <button
            onClick={() => {
              setSelectedBook(undefined);
              setIsFormOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Book
          </button>
        </div>
      )}

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
              <div className="mt-4 space-y-2">
                {user?.role === 'member' && book.total_copies > 0 && (
                  <button
                    onClick={async () => {
                      try {
                        await borrowBook(book.id);
                        window.alert(`Successfully borrowed "${book.title}"`);
                      } catch (error) {
                        window.alert(error instanceof Error ? error.message : 'Failed to borrow book');
                      }
                    }}
                    disabled={isBorrowing}
                    className="w-full inline-flex justify-center items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBorrowing ? 'Borrowing...' : 'Borrow Book'}
                  </button>
                )}

                {user?.role === 'librarian' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedBook(book);
                        setIsFormOpen(true);
                      }}
                      className="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this book?')) {
                          try {
                            await deleteBook(book.id);
                            window.alert('Book deleted successfully');
                          } catch (error) {
                            window.alert(error instanceof Error ? error.message : 'Failed to delete book');
                          }
                        }
                      }}
                      disabled={isDeleting}
                      className="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BookList;
