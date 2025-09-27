
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  if Rails.env.development?
    origins = [ "localhost:3000", "localhost:3001", "staging.bookworm.io", "www.bookworm.io" ].freeze
    allow do
      origins origins
      resource "*",
        headers: :any,
        credentials: true,
        methods: %i[get post put patch delete options head]
    end
  else
    origins = [ "www.bookworm.io" ].freeze
    allow do
      origins origins
      resource "*",
        headers: :any,
        credentials: true,
        methods: %i[get post put patch delete options head]
    end
  end
end
