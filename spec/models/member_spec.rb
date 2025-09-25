require 'rails_helper'

RSpec.describe Member, type: :model do
  describe 'validations' do
    subject { build(:member) }

    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:email).case_insensitive }
    it { should validate_presence_of(:password) }
    it { should validate_length_of(:password).is_at_least(6) }
  end

  describe 'factory' do
    it 'has a valid factory' do
      expect(build(:member)).to be_valid
    end

    it 'is invalid without a name' do
      expect(build(:member, :without_name)).to be_invalid
    end

    it 'is invalid with an invalid email format' do
      expect(build(:member, :with_invalid_email)).to be_invalid
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
end
