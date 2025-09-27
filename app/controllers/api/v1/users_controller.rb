module Api
  module V1
    class UsersController < ApiController
      skip_after_action :verify_policy_scoped

      def index
        if current_member
          render json: {
            user: current_member.as_json(
              only: [ :id, :email, :name ],
            ).merge(role: "member")
          }
        elsif current_librarian
          render json: {
            user: current_librarian.as_json(
              only: [ :id, :email, :name ],
            ).merge(role: "librarian")
          }
        else
          render json: { user: nil }, status: :unauthorized
        end
      end
    end
  end
end
