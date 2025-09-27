import axios, { AxiosResponse } from 'axios';
import { Book, Borrowing, BookSearchParams, BorrowingSearchParams } from '@/types/api';
import { LibraryStats } from '@/types/api';
import { getStoredToken, clearAuthData } from './auth';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthData();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Books API
export const booksApi = {
  list: (): Promise<AxiosResponse<Book[]>> =>
    api.get('/books'),

  search: (params: BookSearchParams): Promise<AxiosResponse<Book[]>> =>
    api.get('/books', { params }),

  get: (id: number): Promise<AxiosResponse<Book>> =>
    api.get(`/books/${id}`),

  create: (data: Partial<Book>): Promise<AxiosResponse<Book>> =>
    api.post('/books', { book: data }),

  update: (id: number, data: Partial<Book>): Promise<AxiosResponse<Book>> =>
    api.put(`/books/${id}`, { book: data }),

  delete: (id: number): Promise<AxiosResponse<void>> =>
    api.delete(`/books/${id}`),
};

// Borrowings API
export const borrowingsApi = {
  list: (): Promise<AxiosResponse<Borrowing[]>> =>
    api.get('/borrowings'),

  search: (params: BorrowingSearchParams): Promise<AxiosResponse<Borrowing[]>> =>
    api.get('/borrowings', { params }),

  get: (id: number): Promise<AxiosResponse<Borrowing>> =>
    api.get(`/borrowings/${id}`),

  create: (data: Pick<Borrowing, 'book_id' | 'member_id'>): Promise<AxiosResponse<Borrowing>> =>
    api.post('/borrowings', { borrowing: data }),

  return: (id: number): Promise<AxiosResponse<Borrowing>> =>
    api.post(`/borrowings/${id}/return`),
};

// Librarian API
export const librarianApi = {
  getStats: (): Promise<AxiosResponse<LibraryStats>> =>
    api.get('/librarian/stats'),
};

export default api;
