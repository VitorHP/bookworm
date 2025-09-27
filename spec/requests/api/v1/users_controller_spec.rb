require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :request do
  describe 'GET /api/v1/me' do
    context 'when authenticated as a member' do
      let(:member) { create(:member) }

      before { sign_in member, scope: :member }

      it 'returns the current member information' do
        get '/api/v1/me'

        expect(response).to have_http_status(:ok)
        expect(json_response['user']).to include(
          'id' => member.id,
          'email' => member.email,
          'name' => member.name,
          'role' => 'member'
        )
      end
    end

    context 'when authenticated as a librarian' do
      let(:librarian) { create(:librarian) }

      before { sign_in librarian, scope: :librarian }

      it 'returns the current librarian information' do
        get '/api/v1/me'

        expect(response).to have_http_status(:ok)
        expect(json_response['user']).to include(
          'id' => librarian.id,
          'email' => librarian.email,
          'name' => librarian.name,
          'role' => 'librarian'
        )
      end
    end

    context 'when not authenticated' do
      it 'returns unauthorized' do
        get '/api/v1/me'

        expect(response).to have_http_status(:unauthorized)
        expect(json_response['user']).to be_nil
      end
    end
  end

  private

  def json_response
    JSON.parse(response.body)
  end
end
