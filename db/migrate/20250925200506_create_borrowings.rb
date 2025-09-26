class CreateBorrowings < ActiveRecord::Migration[8.0]
  def change
    create_table :borrowings do |t|
      t.references :book, null: false, foreign_key: true, index: true
      t.references :member, null: false, foreign_key: true, index: true
      t.references :librarian, null: false, foreign_key: true, index: true
      t.datetime :due_date, null: false
      t.datetime :returned_at
      t.index [:book_id, :returned_at], name: 'index_borrowings_on_book_id_and_returned_at'
      t.index [:member_id, :returned_at], name: 'index_borrowings_on_member_id_and_returned_at'

      t.timestamps
    end
  end
end
