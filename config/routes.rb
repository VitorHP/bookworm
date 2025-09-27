Rails.application.routes.draw do
  # API routes for authentication
  devise_for :librarians, path: "api/v1/librarians", controllers: {
    sessions: "api/v1/librarians_sessions"
  }, defaults: { format: :json }

  devise_for :members, path: "api/v1/members", controllers: {
    sessions: "api/v1/members_sessions"
  }, defaults: { format: :json }

  # API routes
  namespace :api do
    namespace :v1 do
      get "me", to: "users#index"
      resources :books
      resources :borrowings do
        member do
          post :return
        end
      end

      namespace :librarian do
        resources :stats, only: [ :index ]
      end
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  get "*path", to: "dashboards#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
