require 'rails_helper'

RSpec.describe Librarian, type: :model do
  describe 'validations' do
    subject { build(:librarian) }

    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:email).case_insensitive }
    it { should validate_presence_of(:password) }
    it { should validate_length_of(:password).is_at_least(6) }
  end

  describe 'factory' do
    it 'has a valid factory' do
      expect(build(:librarian)).to be_valid
    end

    it 'is invalid without a name' do
      expect(build(:librarian, :without_name)).to be_invalid
    end

    it 'is invalid with an invalid email format' do
      expect(build(:librarian, :with_invalid_email)).to be_invalid
    end
  end

  describe 'devise modules' do
    it { should have_db_column(:encrypted_password).of_type(:string) }
    it { should have_db_column(:reset_password_token).of_type(:string) }
    it { should have_db_column(:reset_password_sent_at).of_type(:datetime) }
    it { should have_db_column(:remember_created_at).of_type(:datetime) }
    it { should have_db_column(:sign_in_count).of_type(:integer) }
    it { should have_db_column(:current_sign_in_at).of_type(:datetime) }
    it { should have_db_column(:last_sign_in_at).of_type(:datetime) }
    it { should have_db_column(:current_sign_in_ip).of_type(:string) }
    it { should have_db_column(:last_sign_in_ip).of_type(:string) }
  end

  describe 'database indices' do
    it { should have_db_index(:email).unique }
    it { should have_db_index(:reset_password_token).unique }
  end

  describe 'devise features' do
    let(:librarian) { create(:librarian) }

    it 'supports timeout' do
      expect(librarian).to respond_to(:timedout?)
    end

    it 'tracks sign in count' do
      expect(librarian).to respond_to(:sign_in_count)
    end

    it 'tracks current sign in timestamp' do
      expect(librarian).to respond_to(:current_sign_in_at)
    end

    it 'tracks last sign in timestamp' do
      expect(librarian).to respond_to(:last_sign_in_at)
    end
  end
end
