# HustleHub Backend MVP

This is the backend for the HustleHub platform, built with Node.js, Express, and MongoDB.

## Getting Started

1.  **Install Dependencies**
    ```bash
    cd backend
    npm install
    ```

2.  **Environment Variables**
    Create a `.env` file in the `backend` folder (or use the configured defaults):
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/hustlehub
    JWT_SECRET=your_jwt_secret
    ```

3.  **Run Server**
    ```bash
    npm run dev
    ```

    > **Note:** Ensure you have MongoDB running locally on port 27017, or update `MONGO_URI` in `.env`.
    > If MongoDB is not connected, the server will start in **Offline Mode** and APIs will fail.

## API Endpoints

### Authentication
- `POST /api/auth/register`
    - Body: `{ "name": "John", "email": "john@mit.edu", "password": "123", "role": "student", "college": "MIT" }`
- `POST /api/auth/login`
    - Body: `{ "email": "john@mit.edu", "password": "123" }`

### Tasks
- `GET /api/tasks` (Headers: `Authorization: Bearer <token>`)
- `POST /api/tasks` (Headers: `Authorization: Bearer <token>`)
    - Body: `{ "title": "Math Tutor", "description": "Need help with Calculus", "budget": 500, "deadline": "2024-12-31" }`
    - **Note**: Only users with `role: "client"` can post tasks.

## Folder Structure
- `models/`: Mongoose schemas (User, Task)
- `controllers/`: Request logic
- `routes/`: API endpoint definitions
- `middleware/`: Auth and Role protection
