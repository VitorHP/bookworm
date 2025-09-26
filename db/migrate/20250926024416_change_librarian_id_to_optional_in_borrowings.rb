class ChangeLibrarianIdToOptionalInBorrowings < ActiveRecord::Migration[8.0]
  def change
    change_column_null :borrowings, :librarian_id, true
  end
end
