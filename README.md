# Library Management System

This is a **Library Management System** built using **Node.js**, **Express**, **Prisma**, and **PostgreSQL**. The application allows you to manage books and users in a library system, such as adding books, borrowing and returning books, and managing user registration and authentication. The project also integrates **Swagger** for API documentation.

## Features

- **User Management**:

  - User registration
  - User login with JWT authentication
  - Profile management
  - Update user details
  - Delete a user

- **Book Management**:

  - Add books to the library
  - Search books by title and author
  - Borrow and return books
  - Get book details

- **API Documentation**:
  - Integrated Swagger UI at `/api-docs` for API documentation and testing

## Installation

Follow the steps below to set up the project on your local machine.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **PostgreSQL** (for database)
- **Prisma** (used for database ORM)

### Steps to Install

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up the PostgreSQL database**:

Install PostgreSQL and create a database and user.
Update the .env file (explained in the next step) with the database connection URL.

```sql
CREATE DATABASE library;
```

```sql
CREATE USER prisma_user WITH PASSWORD 'your_secure_password';
```

```sql
ALTER USER prisma_user CREATEDB;
```

```sql
GRANT ALL PRIVILEGES ON DATABASE library TO prisma_user;
```

3. **Set up Prisma**:
   Ensure that Prisma is correctly configured to use PostgreSQL. You will need to update the DATABASE_URL in your .env file for Prisma. If using a user named `prisma_user`, for example, you can use the following URL to access the `library` database

```bash
DATABASE_URL="postgresql://prisma_user:your_secure_password@localhost:5432/library"
JWT_SECRET_KEY="LdDzLn2bOtQ7z2jW1nHMnRVxA2FxLMK9"
```

4. **Run Prisma migration**:

Generate the Prisma client and apply the migrations to set up the database schema:

```bash
npx prisma migrate dev
```

5. **Start the server**:

```bash
npm run dev
```

The server should now be running at `http://localhost:3000`.

## API Documentation

Once the server is running, you can access the API documentation at:

```bash
http://localhost:3000/api-docs
```

This documentation will help you interact with the API endpoints directly.

⚠️ Make sure to set the Authorization Bearer token to the token received from the `/users/register` or `/users/login` routes. This is a JWT token that is necessary for authentication.

### API Endpoints

#### Users

- `POST /users/register`: Register a new user
- `POST /users/login`: Login a user and get a JWT token
- `GET /users/profile`: Get the authenticated user's profile
- `GET /users/{id}`: Get user details by ID
- `PUT /users/{id}`: Update user details by ID (requires authentication)
- `DELETE /users/{id}`: Delete user by ID (requires authentication)

#### Books

- `POST /books/add`: Add a new book to the library
- `GET /books/search`: Search for books by title or author
- `GET /books/borrowed`: List all borrowed books
- `POST /books/borrow/{bookId}`: Borrow a book (requires authentication)
- `POST /books/return/{bookId}`: Return a borrowed book (requires authentication)
- `GET /books/{id}`: Get details of a specific book by ID

## Project Structure

The project follows a modular structure:

```bash
src/
│
├── controllers/         # Business logic for handling requests
├── middleware/          # Middlewares like authentication and validation
├── routes/              # API route definitions
├── schemas/             # Request validation schemas
├── services/            # Database interaction logic, with Prisma
├── types/               # TypeScript types
│
├── app.ts               # Express app initialization
├── server.ts            # Server start-up
├── swagger.ts           # Swagger configuration for API documentation
```

## Schema

The schema is available as a Prisma schema file in `prisma/schema.prisma`.
