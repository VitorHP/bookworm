class ApiController < ActionController::Base
  include Pundit::Authorization

  # Disable CSRF protection for API endpoints
  skip_before_action :verify_authenticity_token

  # Force authorization check
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  # Return 500 errors as JSON
  rescue_from StandardError do |e|
    render json: { error: e.message }, status: :internal_server_error
  end

  # Return 403 errors as JSON
  rescue_from Pundit::NotAuthorizedError do |e|
    render json: { error: "Unauthorized" }, status: :forbidden
  end

  # Return 404 errors as JSON
  rescue_from ActiveRecord::RecordNotFound do |e|
    render json: { error: e.message }, status: :not_found
  end

  # Return 422 errors as JSON
  rescue_from ActiveRecord::RecordInvalid do |e|
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  def pundit_user
    current_librarian || current_member
  end
end
