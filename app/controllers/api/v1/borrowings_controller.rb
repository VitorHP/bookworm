module Api
  module V1
    class BorrowingsController < ApiController
      before_action :set_borrowing, only: [ :show, :return ]

      def index
        authorize Borrowing
        borrowings = policy_scope(Borrowing).includes(:book, :member)

        borrowings = borrowings.overdue if (params[:status] || []).include?("overdue")
        borrowings = borrowings.active if (params[:status] || []).include?("active")
        borrowings = borrowings.returned if (params[:status] || []).include?("returned")
        borrowings = borrowings.due_today if (params[:status] || []).include?("due_today")

        render json: borrowings, include: [ :book, :member ]
      end

      def show
        authorize @borrowing
        render json: @borrowing
      end

      def create
        authorize Borrowing

        book = Book.find(borrowing_params[:book_id])

        result = BorrowBookService.new(
          book: book,
          member: current_member,
        ).call

        if result.success?
          render json: result.borrowing, status: :created
        else
          render json: { errors: [ result.error ] }, status: :unprocessable_entity
        end
      end

      def return
        authorize @borrowing

        result = ReturnBookService.new(
          borrowing: @borrowing,
          librarian: current_librarian
        ).call

        if result.success?
          render json: result.borrowing
        else
          render json: { errors: [ result.error ] }, status: :unprocessable_entity
        end
      end

      private

      def set_borrowing
        @borrowing = Borrowing.find(params[:id])
      end

      def borrowing_params
        params.require(:borrowing).permit(:book_id)
      end
    end
  end
end
