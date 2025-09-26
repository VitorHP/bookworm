class BookPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def index?
    user.present?
  end

  def show?
    user.present?
  end

  def create?
    user&.is_a?(Librarian)
  end

  def update?
    user&.is_a?(Librarian)
  end

  def destroy?
    user&.is_a?(Librarian)
  end
end
