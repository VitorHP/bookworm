class Librarian < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :trackable, :jwt_authenticatable,
         :jwt_cookie_authenticatable,
         jwt_revocation_strategy: JwtDenylist

  has_many :processed_borrowings, class_name: "Borrowing", dependent: :restrict_with_error

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
