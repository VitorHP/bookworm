class StatsPolicy < ApplicationPolicy
  def index?
    user.is_a?(Librarian)
  end

  class Scope < Scope
    def resolve
      raise Pundit::NotAuthorizedError unless user.is_a?(Librarian)
    end
  end
end
