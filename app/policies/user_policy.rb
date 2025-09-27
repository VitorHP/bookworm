class UserPolicy < ApplicationPolicy
  def index
    # Anyone can check their own session
    true
  end

  class Scope < Scope
    def resolve
    end
  end
end
