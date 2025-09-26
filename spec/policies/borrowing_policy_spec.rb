require 'rails_helper'

RSpec.describe BorrowingPolicy, type: :policy do
  subject { described_class }

  let(:librarian) { create(:librarian) }
  let(:member) { create(:member) }
  let(:other_member) { create(:member) }
  let(:borrowing) { create(:borrowing, member: member) }

  permissions :index? do
    it "denies access if user is not logged in" do
      expect(subject).not_to permit(nil, Borrowing)
    end

    it "allows access to librarians" do
      expect(subject).to permit(librarian, Borrowing)
    end

    it "allows access to members" do
      expect(subject).to permit(member, Borrowing)
    end
  end

  permissions :show? do
    it "denies access if user is not logged in" do
      expect(subject).not_to permit(nil, borrowing)
    end

    it "allows access to librarians" do
      expect(subject).to permit(librarian, borrowing)
    end

    it "allows access to the borrowing member" do
      expect(subject).to permit(member, borrowing)
    end

    it "denies access to other members" do
      expect(subject).not_to permit(other_member, borrowing)
    end
  end

  permissions :create? do
    it "denies access if user is not logged in" do
      expect(subject).not_to permit(nil, Borrowing)
    end

    it "allows access to members" do
      expect(subject).to permit(member, Borrowing)
    end

    it "denies access to librarians" do
      expect(subject).not_to permit(librarian, Borrowing)
    end
  end

  permissions :return? do
    it "denies access if user is not logged in" do
      expect(subject).not_to permit(nil, borrowing)
    end

    it "allows access to librarians" do
      expect(subject).to permit(librarian, borrowing)
    end

    it "denies access to members" do
      expect(subject).not_to permit(member, borrowing)
    end
  end

  describe "scope" do
    let!(:member_borrowing) { create(:borrowing, member: member) }
    let!(:other_borrowing) { create(:borrowing, member: other_member) }

    context "for librarian" do
      subject { Pundit.policy_scope(librarian, Borrowing) }

      it "shows all borrowings" do
        expect(subject).to include(member_borrowing, other_borrowing)
      end
    end

    context "for member" do
      subject { Pundit.policy_scope(member, Borrowing) }

      it "shows only member's borrowings" do
        expect(subject).to include(member_borrowing)
        expect(subject).not_to include(other_borrowing)
      end
    end
  end
end
