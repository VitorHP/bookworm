module Api
  module V1
    class MembersSessionsController < Devise::SessionsController
      respond_to :json

      protect_from_forgery with: :null_session

      private

      def respond_with(resource, _opts = {})
        render json: {
          status: { code: 200, message: "Logged in successfully." },
          data: {
            member: {
              id: resource.id,
              email: resource.email,
              name: resource.name,
              role: "member"
            }
          }
        }
      end

      def respond_to_on_destroy
        if current_member
          render json: {
            status: 200,
            message: "Logged out successfully."
          }
        else
          render json: {
            status: 401,
            message: "Couldn't find an active session."
          }
        end
      end
    end
  end
end
