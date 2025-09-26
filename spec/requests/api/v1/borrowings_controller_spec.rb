require 'rails_helper'

RSpec.describe Api::V1::BorrowingsController, type: :request do
  let(:librarian) { create(:librarian) }
  let(:member) { create(:member) }
  let(:other_member) { create(:member) }
  let(:book) { create(:book) }
  let(:borrowing) { create(:borrowing, member: member, book: book, librarian: librarian) }

  describe 'GET /api/v1/borrowings' do
    context 'as librarian' do
      before { sign_in librarian, scope: :librarian }

      it 'returns all borrowings' do
        create_list(:borrowing, 3)
        get '/api/v1/borrowings'

        expect(response).to have_http_status(:ok)
        expect(json_response.size).to eq(3)
      end
    end

    context 'as member' do
      before { sign_in member, scope: :member }

      it 'returns only member borrowings' do
        create(:borrowing, member: member)
        create(:borrowing, member: other_member)

        get '/api/v1/borrowings'

        expect(response).to have_http_status(:ok)
        expect(json_response.size).to eq(1)
      end
    end

    context 'when not authenticated' do
      it 'returns forbidden' do
        get '/api/v1/borrowings'
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'GET /api/v1/borrowings/:id' do
    context 'as librarian' do
      before { sign_in librarian, scope: :librarian }

      it 'returns the borrowing' do
        get "/api/v1/borrowings/#{borrowing.id}"

        expect(response).to have_http_status(:ok)
        expect(json_response['id']).to eq(borrowing.id)
      end
    end

    context 'as the borrowing member' do
      before { sign_in member, scope: :member }

      it 'returns the borrowing' do
        get "/api/v1/borrowings/#{borrowing.id}"

        expect(response).to have_http_status(:ok)
        expect(json_response['id']).to eq(borrowing.id)
      end
    end

    context 'as other member' do
      before { sign_in other_member, scope: :member }

      it 'returns forbidden' do
        get "/api/v1/borrowings/#{borrowing.id}"
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'POST /api/v1/borrowings' do
    let(:valid_params) do
      {
        borrowing: {
          book_id: book.id,
          member_id: member.id,
          due_date: 2.weeks.from_now
        }
      }
    end

    context 'as librarian' do
      before { sign_in librarian, scope: :librarian }

      it 'returns forbidden' do
        post '/api/v1/borrowings', params: valid_params
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'as member' do
      before { sign_in member, scope: :member }

      it 'creates a new borrowing' do
        expect {
          post '/api/v1/borrowings', params: valid_params
        }.to change(Borrowing, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(json_response['book_id']).to eq(book.id)
        expect(json_response['member_id']).to eq(member.id)
      end

      context 'with an invalid book_id' do
        it 'returns unprocessable entity' do
          post '/api/v1/borrowings', params: { borrowing: { book_id: 99 } }

          expect(response).to have_http_status(:not_found)
          expect(json_response['errors']).to be_present
        end
      end
    end
  end

  describe 'POST /api/v1/borrowings/:id/return' do
    let!(:active_borrowing) { create(:borrowing, member: member) }

    context 'as librarian' do
      before { sign_in librarian, scope: :librarian }

      it 'marks the borrowing as returned' do
        post "/api/v1/borrowings/#{active_borrowing.id}/return"

        expect(response).to have_http_status(:ok)
        expect(active_borrowing.reload.returned?).to be true
      end
    end

    context 'as member' do
      before { sign_in member, scope: :member }

      it 'returns forbidden' do
        post "/api/v1/borrowings/#{active_borrowing.id}/return"
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  private

  def json_response
    JSON.parse(response.body)
  end
end
