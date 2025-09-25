FactoryBot.define do
  factory :librarian do
    name { Faker::Name.name }
    email { Faker::Internet.unique.email }
    password { 'password123' }
    password_confirmation { 'password123' }

    trait :without_name do
      name { nil }
    end

    trait :with_invalid_email do
      email { 'invalid_email' }
    end
  end
end
