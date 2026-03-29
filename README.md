# Task Manager

A full-stack task management application that allows users to seamlessly create, read, update, and delete tasks. Built with a robust backend API and a dynamic, beautifully styled glassmorphism frontend interface.

## Tech Stack

**Frontend:**
- HTML5, Vanilla JavaScript, CSS3

**Backend:**
- Node.js & Express.js (REST API)
- MongoDB & Mongoose (NoSQL Database and ODM)
- `dotenv` for environment variable parsing
- `cors` for Cross-Origin Resource Sharing

## Features

- **Add Tasks**: Quickly create tasks with titles and detailed descriptions.
- **Task List View**: Dynamically renders tasks from newest to oldest.
- **Update Statuses**: Transition task statuses seamlessly between `pending`, `in-progress`, and `completed`.
- **Delete Tasks**: Remove tasks gracefully with interactive confirmation prompts.
- **Responsive Layout**: Completely mobile-friendly and optimized across all screen sizes. 
- **Animation Enhancements**: Includes UI feedback, state interactions, and staggered appearance animations.

## Setup & Installation

1. **Clone the repository** (if applicable) and navigate to the project directory:
   ```bash
   cd TaskManager
   ```

2. **Install all necessary package dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and define your MongoDB URI sequence and PORT configurations:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Running the Application**:
   You can run the server in either base mode or development mode with hot-reloading:

   To start it locally with Nodemon:
   ```bash
   npm run dev
   ```
   To run in production mode:
   ```bash
   npm start
   ```

5. **Visit Application**: Open your browser and navigate directly to:
   ```
   http://localhost:5000
   ```

## Folder Structure Overview

- `/config` - Holds the MongoDB connection helper functions.
- `/controllers` - Contains the business logic mapped to CRUD behaviors.
- `/models` - Hosts the primary Mongoose structural configuration setup mapping MongoDB collections schemas.
- `/public` - Contains all client-facing application statics (`index.html`, `style.css`, `app.js`).
- `/routes` - Maps specific API URL endpoints layout definitions.

## API Endpoints Reference

| Method | Endpoint | Body Requirements | Action |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | None | Fetches all tasks in the database |
| `POST`| `/api/tasks` | `title` (string), `description` (string) | Creates a new task |
| `PUT` | `/api/tasks/:id`| `status` (string) | Updates specific task status |
| `DELETE` | `/api/tasks/:id`| None | Discards task by its ID parameter |

## License
Provided under the [MIT License](LICENSE).
