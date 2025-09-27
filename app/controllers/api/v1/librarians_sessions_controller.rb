module Api
  module V1
    class LibrariansSessionsController < Devise::SessionsController
      respond_to :json

      protect_from_forgery with: :null_session

      private

      def respond_with(resource, _opts = {})
        render json: {
          status: { code: 200, message: "Logged in successfully." },
          data: {
            librarian: {
              id: resource.id,
              email: resource.email,
              name: resource.name,
              role: "librarian"
            }
          }
        }
      end

      def respond_to_on_destroy
        if current_librarian
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
