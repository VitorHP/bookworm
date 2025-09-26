require 'rails_helper'

RSpec.describe ReturnBookService do
  let(:librarian) { create(:librarian) }
  let(:borrowing) { create(:borrowing) }

  subject(:service) { described_class.new(borrowing: borrowing, librarian: librarian) }

  describe '#call' do
    context 'when the borrowing is active' do
      it 'marks the borrowing as returned' do
        expect { service.call }.to change { borrowing.reload.returned? }.from(false).to(true)
      end

      it 'assigns the librarian who processed the return' do
        expect { service.call }.to change { borrowing.reload.librarian }.to(librarian)
      end

      it 'returns a successful result' do
        result = service.call
        expect(result.success?).to be true
        expect(result.borrowing).to eq(borrowing)
        expect(result.error).to be_nil
      end
    end

    context 'when the borrowing is already returned' do
      let(:borrowing) { create(:borrowing, :returned) }

      it 'does not update the borrowing' do
        expect { service.call }.not_to change { borrowing.reload.returned_at }
      end

      it 'returns a failure result' do
        result = service.call
        expect(result.success?).to be false
        expect(result.borrowing).to be_nil
        expect(result.error).to eq("Book is already returned")
      end
    end
  end
end

