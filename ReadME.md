# tasktodo API

Restful API for todo management built with Node.js, Express, and MongoDB.

## Features

- CRUD operations for todos
- MongoDB database integration
- CORS enabled for frontend connection
- Error handling and validation

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS

## Installation

1. Clone the repository

```bash
git clone https://github.com/anthonyjwwong/tasktodo-api.git
cd tasktodo-api
```

2. Install dependencies

```bash
npm install
```

3. Create .env file and add your MongoDB connection String

```bash
MONGODB_URI = your_mongodb_connection_string
PORT=5001
```

4. Start the development server

```bash
npm run dev
```

5. Start the production server

```bash
npm start
```

## API Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | /api/todos       | Get all todos     |
| POST   | /api/todos       | Create new todo   |
| PUT    | /api/todos/:id   | Update todo by id |
| DELETE | /api/todos/:id   | Delete todo by id |
| GET    | /api/todos/stats | Get todo Stats    |

## Frontend repository

TaskTodo Frontend - Not ready.

## Live Demo

[Coming soon - deployment in progress]
