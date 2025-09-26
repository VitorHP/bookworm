# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

puts "Cleaning the database..."
Borrowing.destroy_all
Book.destroy_all
Member.destroy_all
Librarian.destroy_all

# Create Librarians
puts "Creating librarians..."
librarians = [
  {
    email: 'sarah.johnson@library.com',
    password: 'password123',
    name: 'Sarah Johnson'
  },
  {
    email: 'michael.smith@library.com',
    password: 'password123',
    name: 'Michael Smith'
  },
  {
    email: 'emily.brown@library.com',
    password: 'password123',
    name: 'Emily Brown'
  }
].map { |attrs| Librarian.create!(attrs) }

# Create Members
puts "Creating members..."
members = [
  {
    email: 'john.doe@example.com',
    password: 'password123',
    name: 'John Doe'
  },
  {
    email: 'alice.wilson@example.com',
    password: 'password123',
    name: 'Alice Wilson'
  },
  {
    email: 'bob.miller@example.com',
    password: 'password123',
    name: 'Bob Miller'
  },
  {
    email: 'carol.taylor@example.com',
    password: 'password123',
    name: 'Carol Taylor'
  },
  {
    email: 'david.anderson@example.com',
    password: 'password123',
    name: 'David Anderson'
  }
].map { |attrs| Member.create!(attrs) }

# Create Books
puts "Creating books..."
books = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    isbn: '9780743273565',
    total_copies: 3
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Science Fiction',
    isbn: '9780451524935',
    total_copies: 5
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    isbn: '9780141439518',
    total_copies: 4
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    isbn: '9780547928227',
    total_copies: 2
  },
  {
    title: 'Murder on the Orient Express',
    author: 'Agatha Christie',
    genre: 'Mystery',
    isbn: '9780062693662',
    total_copies: 3
  },
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    genre: 'Non-Fiction',
    isbn: '9780062316097',
    total_copies: 4
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Science Fiction',
    isbn: '9780441172719',
    total_copies: 3
  },
  {
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'Mystery',
    isbn: '9781250301697',
    total_copies: 2
  },
  {
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    genre: 'Fantasy',
    isbn: '9780756404741',
    total_copies: 3
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Non-Fiction',
    isbn: '9780735211292',
    total_copies: 5
  },
  {
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    genre: 'Fiction',
    isbn: '9781501161933',
    total_copies: 4
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: 'Science Fiction',
    isbn: '9780593135204',
    total_copies: 3
  }
].map { |attrs| Book.create!(attrs) }

# Create Borrowings
puts "Creating borrowings..."

# Active borrowings
[
  {
    member: members[0],
    book: books[0],
    librarian: librarians[0],
    due_date: 2.weeks.from_now
  },
  {
    member: members[1],
    book: books[2],
    librarian: librarians[1],
    due_date: 1.week.from_now
  },
  {
    member: members[2],
    book: books[5],
    librarian: librarians[2],
    due_date: 3.weeks.from_now
  }
].each { |attrs| Borrowing.create!(attrs) }

# Returned borrowings
[
  {
    member: members[0],
    book: books[3],
    librarian: librarians[0],
    due_date: 2.weeks.ago,
    returned_at: 1.week.ago
  },
  {
    member: members[1],
    book: books[4],
    librarian: librarians[1],
    due_date: 3.weeks.ago,
    returned_at: 3.weeks.ago
  },
  {
    member: members[3],
    book: books[6],
    librarian: librarians[2],
    due_date: 1.week.ago,
    returned_at: 2.days.ago
  }
].each { |attrs| Borrowing.create!(attrs) }

# Overdue borrowings
[
  {
    member: members[4],
    book: books[7],
    librarian: librarians[0],
    due_date: 2.days.ago
  },
  {
    member: members[2],
    book: books[8],
    librarian: librarians[1],
    due_date: 1.week.ago
  }
].each { |attrs| Borrowing.create!(attrs) }

puts "Seed data created successfully!"
puts "Created:"
puts "- #{Librarian.count} librarians"
puts "- #{Member.count} members"
puts "- #{Book.count} books"
puts "- #{Borrowing.count} borrowings (#{Borrowing.where.not(returned_at: nil).count} returned, #{Borrowing.where(returned_at: nil).count} active)"
