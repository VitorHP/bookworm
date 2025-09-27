require 'rails_helper'

RSpec.describe StatsPolicy, type: :policy do
  subject { described_class }

  let(:librarian) { create(:librarian) }
  let(:member) { create(:member) }

  permissions :index? do
    it "denies access if user is not a librarian" do
      expect(subject).not_to permit(member, :stats)
    end

    it "allows access if user is a librarian" do
      expect(subject).to permit(librarian, :stats)
    end
  end

  describe "Scope" do
    subject { described_class::Scope.new(user, :stats) }

    context "when user is a librarian" do
      let(:user) { librarian }

      it "doesn't raise an error" do
        expect { subject.resolve }.not_to raise_error
      end
    end

    context "when user is not a librarian" do
      let(:user) { member }

      it "raises Pundit::NotAuthorizedError" do
        expect { subject.resolve }.to raise_error(Pundit::NotAuthorizedError)
      end
    end
  end
end
