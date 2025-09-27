require "ostruct"

class ReturnBookService
  def initialize(borrowing:, librarian:)
    @borrowing = borrowing
    @librarian = librarian
  end

  def call
    return failure("Book is already returned") if @borrowing.returned?

    @borrowing.returned_at = Time.current
    @borrowing.librarian = @librarian

    if @borrowing.save
      success(@borrowing)
    else
      failure(@borrowing.errors.full_messages.join(", "))
    end
  end

  private

  def success(borrowing)
    OpenStruct.new(success?: true, borrowing: borrowing, error: nil)
  end

  def failure(error)
    OpenStruct.new(success?: false, borrowing: nil, error: error)
  end
end
