require 'rails_helper'

RSpec.describe Api::V1::BooksController, type: :request do
  let!(:books) { create_list(:book, 3) }
  let(:book_id) { books.first.id }

  describe 'GET /api/v1/books' do
    before { get '/api/v1/books' }

    it 'returns books' do
      expect(json).not_to be_empty
      expect(json.size).to eq(3)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end

    context 'with search parameters' do
      let!(:specific_book) { create(:book, title: 'Ruby Programming', author: 'John Doe', genre: 'Programming') }

      it 'returns filtered books by title' do
        get '/api/v1/books', params: { title: 'Ruby' }
        expect(json.size).to eq(1)
        expect(json.first['title']).to eq('Ruby Programming')
      end

      it 'returns filtered books by author' do
        get '/api/v1/books', params: { author: 'John' }
        expect(json.size).to eq(1)
        expect(json.first['author']).to eq('John Doe')
      end

      it 'returns filtered books by genre' do
        get '/api/v1/books', params: { genre: 'Programming' }
        expect(json.size).to eq(1)
        expect(json.first['genre']).to eq('Programming')
      end
    end
  end

  describe 'GET /api/v1/books/:id' do
    before { get "/api/v1/books/#{book_id}" }

    context 'when the record exists' do
      it 'returns the book' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(book_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:book_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Book not found/)
      end
    end
  end

  describe 'POST /api/v1/books' do
    let(:valid_attributes) do
      {
        book: {
          title: 'Learn Ruby',
          author: 'John Smith',
          genre: 'Education',
          isbn: '978-3-16-148410-0',
          total_copies: 5
        }
      }
    end

    context 'when the request is valid' do
      before { post '/api/v1/books', params: valid_attributes }

      it 'creates a book' do
        expect(json['title']).to eq('Learn Ruby')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/v1/books', params: { book: { title: 'Invalid Book' } } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/can't be blank/)
      end
    end
  end

  describe 'PUT /api/v1/books/:id' do
    let(:valid_attributes) { { book: { title: 'Updated Title' } } }

    context 'when the record exists' do
      before { put "/api/v1/books/#{book_id}", params: valid_attributes }

      it 'updates the record' do
        expect(json['title']).to eq('Updated Title')
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe 'DELETE /api/v1/books/:id' do
    before { delete "/api/v1/books/#{book_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end

  # Helper method to parse JSON responses
  def json
    JSON.parse(response.body)
  end
end
