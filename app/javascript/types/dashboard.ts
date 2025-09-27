import { BorrowingStatus, Borrowing } from "./api";

export interface LibrarianDashboardData {
  totalBooks: number;
  borrowings: Borrowing[];
  selectedStatuses: BorrowingStatus[];
  isLoading: boolean;
  error: Error | null;
  toggleStatus: (status: BorrowingStatus) => void;
  returnBook: (borrowingId: number) => Promise<void>;
  isReturning: boolean;
}

export interface MemberDashboardData {
  borrowings: Borrowing[],
  isLoading: boolean,
  error: Error | null,
}
