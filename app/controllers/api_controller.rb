class ApiController < ActionController::Base
  # Disable CSRF protection for API endpoints
  skip_before_action :verify_authenticity_token

  # Return 500 errors as JSON
  rescue_from StandardError do |e|
    render json: { error: e.message }, status: :internal_server_error
  end

  # Return 404 errors as JSON
  rescue_from ActiveRecord::RecordNotFound do |e|
    render json: { error: e.message }, status: :not_found
  end

  # Return 422 errors as JSON
  rescue_from ActiveRecord::RecordInvalid do |e|
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end
end
