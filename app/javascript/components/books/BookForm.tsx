import React, { useState, useEffect } from 'react';
import { useBooksManagement } from '@/contexts/BooksManagementContext';
import type { Book } from '@/types/api';

interface BookFormProps {
  book?: Book;
  onClose: () => void;
}

interface FormData {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  total_copies: number;
}

const initialFormData: FormData = {
  title: '',
  author: '',
  genre: '',
  isbn: '',
  total_copies: 1,
};

const BookForm: React.FC<BookFormProps> = ({ book, onClose }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { createBook, updateBook, isCreating, isUpdating } = useBooksManagement();

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        total_copies: book.total_copies,
      });
    }
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (book) {
        await updateBook({ id: book.id, ...formData });
      } else {
        await createBook(formData);
      }
      onClose();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'total_copies' ? parseInt(value, 10) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={formData.title}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          required
          value={formData.author}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
          Genre
        </label>
        <select
          id="genre"
          name="genre"
          required
          value={formData.genre}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select a genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Biography">Biography</option>
        </select>
      </div>

      <div>
        <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
          ISBN
        </label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          required
          value={formData.isbn}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="total_copies" className="block text-sm font-medium text-gray-700">
          Total Copies
        </label>
        <input
          type="number"
          id="total_copies"
          name="total_copies"
          required
          min="0"
          value={formData.total_copies}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isCreating || isUpdating}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating || isUpdating ? 'Saving...' : book ? 'Update Book' : 'Create Book'}
        </button>
      </div>
    </form>
  );
};

export default BookForm;
