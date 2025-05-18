# Resume Builder Backend

This is the backend for the Resume Builder application. It provides RESTful API endpoints for user authentication and resume management. Built with Node.js, Express.js, and MongoDB, it supports secure authentication using JSON Web Tokens (JWT).

## Features

- ✅ User registration and login with JWT authentication
- 🧾 Create, read, update, and delete resumes
- 🔐 Protected routes for authenticated users
- 🧩 Modular code structure using MVC pattern

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- dotenv

## Project Structure

```
resume-builder-backend/
├── config/                   # Database configuration
|   └── db.js
├── controllers/              # Logic for API requests
|   ├── authController.js
|   ├── resumeController.js
|   └── uploadImage.js
├── middlewares/              # Authentication and other middleware
|   ├── authMiddleware.js
|   └── uploadMiddleware.js
├── models/                   # Mongoose schemas
|   ├── Resume.js
|   └── User.js
├── routes/                   # API endpoints
|   ├── authRoutes.js
|   └── resumeRoutes.js
├── server.js                 # Main entry point
├── .env                      # Environment variables (not committed)
└── package.json              # Project metadata and dependencies
```

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB database (local or cloud-based like MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/omarbinsaleh/resume-builder-backend.git
   cd resume-builder-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   The server will run at `http://localhost:5000`.

## API Endpoints

### Auth Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get a JWT token

### Resume Routes (Protected)

- `GET /api/resumes` - Get all resumes for the logged-in user
- `POST /api/resumes` - Create a new resume
- `GET /api/resumes/:id` - Get a specific resume
- `PUT /api/resumes/:id` - Update a resume
- `DELETE /api/resumes/:id` - Delete a resume

> ⚠️ All `/api/resumes` routes require an `Authorization` header with a valid JWT token.

## Example JWT Header

```
Authorization: Bearer <your_token_here>
```

## License

This project is open-source and available under the [MIT License](LICENSE).

## Author

[Omar Bin Saleh](https://github.com/omarbinsaleh)
