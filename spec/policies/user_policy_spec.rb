require 'rails_helper'

RSpec.describe UserPolicy, type: :policy do
  subject { described_class }

  let(:member) { create(:member) }
  let(:librarian) { create(:librarian) }

  permissions :index do
    it "allows access for members" do
      expect(subject).to permit(member)
    end

    it "allows access for librarians" do
      expect(subject).to permit(librarian)
    end

    it "allows access even when not authenticated" do
      expect(subject).to permit(nil)
    end
  end
end
