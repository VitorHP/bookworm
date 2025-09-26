class BorrowingPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def show?
    return true if user.is_a?(Librarian)
    return true if record.member == user
    false
  end

  def create?
    user.is_a?(Member)
  end

  def return?
    user.is_a?(Librarian)
  end

  class Scope < Scope
    def resolve
      if user.is_a?(Librarian)
        scope.all
      else
        scope.where(member: user)
      end
    end
  end
end
