Devise.setup do |config|
  config.jwt do |jwt|
    jwt.secret = ENV.fetch("DEVISE_JWT_SECRET_KEY") { Rails.application.credentials.devise_jwt_secret_key }
    jwt.dispatch_requests = [
      [ "POST", %r{^/api/v1/members/sign_in$} ],
      [ "POST", %r{^/api/v1/librarians/sign_in$} ]
    ]
    jwt.revocation_requests = [
      [ "DELETE", %r{^/api/v1/members/sign_out$} ],
      [ "DELETE", %r{^/api/v1/librarians/sign_out$} ]
    ]
    jwt.expiration_time = 1.day.to_i
  end

  config.jwt_cookie do |jwt_cookie|
    jwt_cookie.name = "jwt" # Name of the cookie to store the JWT
    jwt_cookie.secure = Rails.env.production?
    jwt_cookie.httponly = true
    jwt_cookie.same_site = :lax
  end
end
