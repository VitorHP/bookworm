FactoryBot.define do
  factory :borrowing do
    association :book
    association :member
    association :librarian
    due_date { 2.weeks.from_now }
    returned_at { nil }

    trait :returned do
      returned_at { Time.current }
    end

    trait :overdue do
      due_date { 2.days.ago }
    end

    trait :invalid_return_date do
      returned_at { 1.day.ago }
    end

    trait :future_return_date do
      returned_at { 1.day.from_now }
    end
  end
end
