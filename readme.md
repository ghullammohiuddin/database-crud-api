# Database CRUD API

A RESTful API built with Node.js and Express that connects to MongoDB Atlas for persistent data storage.

## Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/users | Create a new user |
| GET | /api/users | Get all users |
| GET | /api/users/:id | Get user by ID |
| PUT | /api/users/:id | Update user by ID |
| DELETE | /api/users/:id | Delete user by ID |

## Setup

```bash
npm install
node index.js
```

Add your MongoDB connection string to `.env`: