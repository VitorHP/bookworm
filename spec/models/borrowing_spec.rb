require 'rails_helper'

RSpec.describe Borrowing, type: :model do
  describe 'associations' do
    it { should belong_to(:book) }
    it { should belong_to(:member) }
    it { should belong_to(:librarian).optional }
  end

  describe 'validations' do
    it { should validate_presence_of(:due_date) }
  end

  describe 'scopes' do
    let!(:active_borrowing) { create(:borrowing) }
    let!(:returned_borrowing) { create(:borrowing, :returned) }
    let!(:overdue_borrowing) { create(:borrowing, :overdue) }

    describe '.active' do
      it 'returns only active borrowings' do
        expect(Borrowing.active).to include(active_borrowing, overdue_borrowing)
        expect(Borrowing.active).not_to include(returned_borrowing)
      end
    end

    describe '.overdue' do
      it 'returns only overdue borrowings' do
        expect(Borrowing.overdue).to include(overdue_borrowing)
        expect(Borrowing.overdue).not_to include(active_borrowing, returned_borrowing)
      end
    end

    describe '.returned' do
      it 'returns only returned borrowings' do
        expect(Borrowing.returned).to include(returned_borrowing)
        expect(Borrowing.returned).not_to include(active_borrowing, overdue_borrowing)
      end
    end

    describe '.due_today' do
      let!(:due_today_morning) { create(:borrowing, due_date: Time.current.beginning_of_day) }
      let!(:due_today_evening) { create(:borrowing, due_date: Time.current.end_of_day) }
      let!(:due_tomorrow) { create(:borrowing, due_date: 1.day.from_now) }
      let!(:due_today_returned) { create(:borrowing, :returned, due_date: Time.current) }

      it 'returns only borrowings due today that have not been returned' do
        expect(Borrowing.due_today).to include(due_today_morning, due_today_evening)
        expect(Borrowing.due_today).not_to include(due_tomorrow, due_today_returned)
      end
    end
  end

  describe 'instance methods' do
    describe '#returned?' do
      it 'returns true if the book has been returned' do
        borrowing = create(:borrowing, :returned)
        expect(borrowing).to be_returned
      end

      it 'returns false if the book has not been returned' do
        borrowing = create(:borrowing)
        expect(borrowing).not_to be_returned
      end
    end

    describe '#overdue?' do
      it 'returns true if the due date has passed and book is not returned' do
        borrowing = create(:borrowing, :overdue)
        expect(borrowing).to be_overdue
      end

      it 'returns false if the due date has not passed' do
        borrowing = create(:borrowing)
        expect(borrowing).not_to be_overdue
      end

      it 'returns false if the book has been returned' do
        borrowing = create(:borrowing, :overdue, :returned)
        expect(borrowing).not_to be_overdue
      end
    end
  end
end
