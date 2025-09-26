class Borrowing < ApplicationRecord
  belongs_to :book
  belongs_to :member
  belongs_to :librarian, optional: true

  validates :due_date, presence: true

  scope :active, -> { where(returned_at: nil) }
  scope :overdue, -> { active.where("due_date < ?", Time.current) }

  def returned?
    returned_at.present?
  end

  def overdue?
    !returned? && due_date < Time.current
  end
end
