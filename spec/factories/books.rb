FactoryBot.define do
  factory :book do
    title { Faker::Book.title }
    author { Faker::Book.author }
    genre { Faker::Book.genre }
    isbn { 
      # Generate ISBN-13
      prefix = %w[978 979].sample
      group = rand(0..9).to_s
      publisher = rand(100000..999999).to_s
      title_num = rand(10..99).to_s
      check_digit = rand(0..9).to_s
      "#{prefix}-#{group}-#{publisher}-#{title_num}-#{check_digit}"
    }
    total_copies { rand(1..10) }

    trait :without_title do
      title { nil }
    end

    trait :without_author do
      author { nil }
    end

    trait :without_genre do
      genre { nil }
    end

    trait :without_isbn do
      isbn { nil }
    end

    trait :with_invalid_isbn do
      isbn { "invalid-isbn" }
    end

    trait :with_negative_copies do
      total_copies { -1 }
    end
  end
end
