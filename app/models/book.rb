class Book < ApplicationRecord
  has_many :borrowings, dependent: :destroy
  has_many :members, through: :borrowings

  validates :title, presence: true
  validates :author, presence: true
  validates :genre, presence: true
  validates :isbn, presence: true, uniqueness: { case_sensitive: false }, format: { with: /\A(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+\z/, message: "must be a valid ISBN-10 or ISBN-13" }
  validates :total_copies, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  def available?
    borrowings.active.count < total_copies
  end

  def available_copies
    total_copies - borrowings.active.count
  end
end
