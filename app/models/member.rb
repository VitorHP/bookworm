class Member < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :trackable, :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist

  has_many :borrowings, dependent: :restrict_with_error
  has_many :borrowed_books, through: :borrowings, source: :book

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true

  def current_borrowings
    borrowings.active
  end

  def overdue_borrowings
    borrowings.overdue
  end
end
