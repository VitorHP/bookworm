require 'rails_helper'

RSpec.describe BorrowBookService do
  let(:member) { create(:member) }
  let(:book) { create(:book) }

  subject(:service) { described_class.new(book: book, member: member) }

  describe '#call' do
    context 'when everything is valid' do
      it 'creates a new borrowing' do
        expect { service.call }.to change(Borrowing, :count).by(1)
      end

      it 'returns a successful result' do
        result = service.call
        expect(result.success?).to be true
        expect(result.borrowing).to be_persisted
        expect(result.error).to be_nil
      end

      it 'sets the due date to 2 weeks from now' do
        result = service.call
        expect(result.borrowing.due_date.to_date).to eq(2.weeks.from_now.to_date)
      end
    end

    context 'when book has no copies available' do
      let(:book) { create(:book, total_copies: 1) }

      before do
        create(:borrowing, book: book)
      end

      it 'does not create a new borrowing' do
        expect { service.call }.not_to change(Borrowing, :count)
      end

      it 'returns a failure result' do
        result = service.call
        expect(result.success?).to be false
        expect(result.borrowing).to be_nil
        expect(result.error).to eq("Book is not available")
      end
    end

    context 'when member already has an active borrowing for the book' do
      before do
        create(:borrowing, book: book, member: member)
      end

      it 'does not create a new borrowing' do
        expect { service.call }.not_to change(Borrowing, :count)
      end

      it 'returns a failure result' do
        result = service.call
        expect(result.success?).to be false
        expect(result.borrowing).to be_nil
        expect(result.error).to eq("Member already has an active borrowing for this book")
      end
    end

    context 'when the book was previously borrowed but returned' do
      before do
        create(:borrowing, :returned, book: book)
      end

      it 'creates a new borrowing' do
        expect { service.call }.to change(Borrowing, :count).by(1)
      end

      it 'returns a successful result' do
        result = service.call
        expect(result.success?).to be true
        expect(result.borrowing).to be_persisted
      end
    end
  end
end
