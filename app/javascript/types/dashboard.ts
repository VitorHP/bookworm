import { BorrowingStatus, Borrowing, LibraryStats } from "./api";

export interface LibrarianDashboardData {
  stats: LibraryStats;
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
