module Api
  module V1
    class BooksController < ApiController
      before_action :set_book, only: [:show, :update, :destroy]

      # GET /api/v1/books
      def index
        @books = Book.all

        @books = @books.where('title LIKE ?', "%#{params[:title]}%") if params[:title].present?
        @books = @books.where('author LIKE ?', "%#{params[:author]}%") if params[:author].present?
        @books = @books.where('genre LIKE ?', "%#{params[:genre]}%") if params[:genre].present?

        render json: @books
      end

      # GET /api/v1/books/1
      def show
        render json: @book
      end

      # POST /api/v1/books
      def create
        @book = Book.new(book_params)

        if @book.save
          render json: @book, status: :created, location: api_v1_book_url(@book)
        else
          render json: { errors: @book.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/books/1
      def update
        if @book.update(book_params)
          render json: @book
        else
          render json: { errors: @book.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/books/1
      def destroy
        @book.destroy
        head :no_content
      end

      private

      def set_book
        @book = Book.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Book not found' }, status: :not_found
      end

      def book_params
        params.require(:book).permit(:title, :author, :genre, :isbn, :total_copies)
      end
    end
  end
end
