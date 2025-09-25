require 'rails_helper'

RSpec.describe BookPolicy, type: :policy do
  subject { described_class }

  let(:member) { create(:member) }
  let(:librarian) { create(:librarian) }
  let(:book) { create(:book) }

  permissions :show?, :index? do
    it "allows access to everyone" do
      expect(subject).not_to permit(nil, book)
      expect(subject).to permit(member, book)
      expect(subject).to permit(librarian, book)
    end
  end

  permissions :create?, :update?, :destroy? do
    it "denies access if user is not a librarian" do
      expect(subject).not_to permit(nil, book)
      expect(subject).not_to permit(member, book)
    end

    it "allows access if user is a librarian" do
      expect(subject).to permit(librarian, book)
    end
  end

  describe "Scope" do
    let!(:books) { create_list(:book, 3) }

    it "shows all books to everyone" do
      scope = BookPolicy::Scope.new(nil, Book).resolve
      expect(scope.count).to eq(3)

      scope = BookPolicy::Scope.new(member, Book).resolve
      expect(scope.count).to eq(3)

      scope = BookPolicy::Scope.new(librarian, Book).resolve
      expect(scope.count).to eq(3)
    end
  end
end
