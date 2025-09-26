require "ostruct"

class BorrowBookService
  def initialize(book:, member:)
    @book = book
    @member = member
  end

  def call
    return failure("Book is not available") unless book_available?
    return failure("Member already has an active borrowing for this book") if active_borrowing_exists?

    borrowing = Borrowing.new(
      book: @book,
      member: @member,
      due_date: 2.weeks.from_now
    )

    if borrowing.save
      success(borrowing)
    else
      failure(borrowing.errors.full_messages.join(", "))
    end
  end

  private

  def book_available?
    @book.available?
  end

  def active_borrowing_exists?
    @member.borrowings.active.where(book: @book).exists?
  end

  def success(borrowing)
    OpenStruct.new(success?: true, borrowing: borrowing, error: nil)
  end

  def failure(error)
    OpenStruct.new(success?: false, borrowing: nil, error: error)
  end
end
