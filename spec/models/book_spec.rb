require 'rails_helper'

RSpec.describe Book, type: :model do
  describe 'validations' do
    subject { build(:book) }

    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:author) }
    it { should validate_presence_of(:genre) }
    it { should validate_presence_of(:isbn) }
    it { should validate_uniqueness_of(:isbn).case_insensitive }
    it { should validate_presence_of(:total_copies) }
    it { should validate_numericality_of(:total_copies).is_greater_than_or_equal_to(0) }
  end

  describe 'database columns' do
    it { should have_db_column(:title).of_type(:string).with_options(null: false) }
    it { should have_db_column(:author).of_type(:string).with_options(null: false) }
    it { should have_db_column(:genre).of_type(:string).with_options(null: false) }
    it { should have_db_column(:isbn).of_type(:string).with_options(null: false) }
    it { should have_db_column(:total_copies).of_type(:integer).with_options(null: false, default: 0) }
  end

  describe 'database indices' do
    it { should have_db_index(:isbn).unique }
    it { should have_db_index(:title) }
    it { should have_db_index(:author) }
  end

  describe 'factory' do
    it 'has a valid factory' do
      expect(build(:book)).to be_valid
    end

    it 'is invalid without a title' do
      expect(build(:book, :without_title)).to be_invalid
    end

    it 'is invalid without an author' do
      expect(build(:book, :without_author)).to be_invalid
    end

    it 'is invalid without a genre' do
      expect(build(:book, :without_genre)).to be_invalid
    end

    it 'is invalid without an ISBN' do
      expect(build(:book, :without_isbn)).to be_invalid
    end

    it 'is invalid with an invalid ISBN format' do
      expect(build(:book, :with_invalid_isbn)).to be_invalid
    end

    it 'is invalid with negative copies' do
      expect(build(:book, :with_negative_copies)).to be_invalid
    end

    it 'ensures ISBN uniqueness' do
      book = create(:book)
      duplicate_book = build(:book, isbn: book.isbn)
      expect(duplicate_book).to be_invalid
    end
  end

  describe 'isbn format' do
    it 'accepts valid ISBN-13' do
      book = build(:book, isbn: '978-0-123456-78-9')
      expect(book).to be_valid
    end

    it 'accepts valid ISBN-10' do
      book = build(:book, isbn: '0-123456-78-9')
      expect(book).to be_valid
    end

    it 'rejects invalid ISBN format' do
      book = build(:book, isbn: 'not-an-isbn')
      expect(book).not_to be_valid
      expect(book.errors[:isbn]).to include('must be a valid ISBN-10 or ISBN-13')
    end
  end
end
