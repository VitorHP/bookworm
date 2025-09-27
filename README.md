# 📚 Bookworm Library Management System

## To Do

I built this with the help of Github Copilot. It woudn't be possible to complete it in a timely manner this week without it. I previously asked the recruiter if using it was OK and she told it was. I Hope that's fine. I'll try to summarize the things I needed to change from the generated code.

### Backend

Architecture wise I asked it to generate some service classes for some of the endpoints like book borrowing and returning which is what I usually do when developing. Authentication was just standard Devise at first, so I changed it to JWT storing it into httpOnly cookies. I also added Pundit for authorization.

### Frontend

I extracted the behavior from components into Contexts for better separation of concerns and tried to reuse components when it made sense.

### UI

UI was mostly done by AI with some adjustments for better presentation. I can draw orcs just fine and can implement an existing design with no problem, but I'm no UI designer.

## 🛠 Tech Stack

- **Backend**: Ruby on Rails 8.0
- **Frontend**: React 18 with TypeScript
- **Styling**: TailwindCSS
- **Authentication**: Devise with JWT
- **Authorization**: Pundit
- **Database**: SQLite (development)
- **Build Tool**: Vite
- **Testing**: RSpec

## 📋 Prerequisites

- Ruby 3.2.0 or higher
- Node.js 18.0.0 or higher
- Yarn 1.22.0 or higher

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/bookworm.git
   cd bookworm
   ```

2. **Install dependencies**

   ```bash
   # Install Ruby dependencies
   bundle install

   # Install Node.js dependencies
   yarn install
   ```

3. **Set up the database**

   ```bash
   # Create and migrate the database
   bin/rails db:create db:migrate

   # Seed the database with sample data
   bin/rails db:seed
   ```

4. **Start the development server**

   ```bash
   # Start both Rails and Vite servers
   bin/dev

   ```

5. Setup JWT token

   ````
   ```bash
   # generate a secret
   rails secret

   # Create the credentails file
   EDITOR="code --wait" rails credentials

   # Add devise_jwt_secret_key: [your generated key] to the file
   ````

The application will be available at `http://localhost:3000`

## 🔑 Test Credentials

### Librarians

1. Sarah Johnson

   - Email: <sarah.johnson@library.com>
   - Password: password123
   - Role: Librarian

2. Michael Smith

   - Email: <michael.smith@library.com>
   - Password: password123
   - Role: Librarian

3. Emily Brown
   - Email: <emily.brown@library.com>
   - Password: password123
   - Role: Librarian

### Members

1. John Doe

   - Email: <john.doe@example.com>
   - Password: password123
   - Role: Member

2. Alice Wilson
   - Email: <alice.wilson@example.com>
   - Password: password123
   - Role: Member

## 🧪 Running Tests

```bash
# Run all tests
bundle exec rspec

# Run specific test file
bundle exec rspec spec/path/to/test_file.rb
```

## 📱 Features

- **Authentication**

  - JWT-based authentication (Using httpOnly token)
  - Role-based access control (Librarians and Members)

- **Book Management**

  - Add, edit, and remove books
  - Track available copies
  - Search and filter books

- **Borrowing System**

  - Borrow and return books
  - Track due dates
  - Handle overdue books

- **Dashboard**
  - Member dashboard with borrowed books
  - Librarian dashboard with statistics
  - Overdue book notifications

## 🔒 Security Notes

- All passwords in seed data are for testing purposes only
- JWT tokens expire after 24 hours
- Production deployment should use secure environment variables
- HTTPS is enforced in production

## 📝 Development Notes

- Use `bin/dev` to start the development server with hot reload
- Frontend code is in `app/javascript`
- API endpoints are namespaced under `/api/v1`
- Authentication headers format: `Authorization: Bearer <token>`

## 🚢 Deployment

Deployment instructions and configuration are handled through Kamal. See `config/deploy.yml` for details.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
