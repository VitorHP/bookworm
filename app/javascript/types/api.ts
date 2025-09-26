export type UserRole = 'member' | 'librarian';

export type BorrowingStatus = 'active' | 'overdue' | 'returned' | 'due_today';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole
  token?: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  total_copies: number;
  created_at: string;
  updated_at: string;
}

export interface Borrowing {
  id: number;
  book_id: number;
  member_id: number;
  librarian_id: number;
  due_date: string;
  returned_at: string | null;
  created_at: string;
  updated_at: string;
  book: Book;
  member: User;
  librarian?: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface BookSearchParams {
  author?: string;
  title?: string;
  genre?: string;
}

export interface BorrowingSearchParams {
  status?: BorrowingStatus[];
}
