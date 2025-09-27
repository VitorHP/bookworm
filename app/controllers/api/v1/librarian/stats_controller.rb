module Api
  module V1
    module Librarian
      class StatsController < ApiController
        skip_after_action :verify_policy_scoped, only: [ :index ]

        def index
          authorize :stats

          render json: {
            total_books: Book.count,
            active_borrowings: Borrowing.active.count,
            overdue_borrowings: Borrowing.overdue.count
          }
        end
      end
    end
  end
end
