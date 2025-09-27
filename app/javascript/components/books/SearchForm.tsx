import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useBooks } from '@/contexts/BooksContext';

interface SearchParams {
  title?: string;
  author?: string;
  genre?: string;
}

const SearchForm: React.FC = () => {
  const { setSearchParams } = useBooks();
  const [formData, setFormData] = useState<SearchParams>({
    title: '',
    author: '',
    genre: '',
  });

  const debouncedSearch = useDebounce((params: SearchParams) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value && value.trim())
    );
    setSearchParams(cleanParams);
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    debouncedSearch(newFormData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Search by title..."
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Search by author..."
          />
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Genres</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Biography">Biography</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
