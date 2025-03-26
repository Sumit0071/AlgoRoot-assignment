# Task Manager Assignment

## Overview
The Task Manager is a web application that allows users to create, update, mark as completed, and delete tasks. It provides a user-friendly interface for managing tasks efficiently, utilizing authentication and authorization features.

## Features
- **User Authentication**: Users must log in to access tasks.
- **Create Tasks**: Users can add new tasks with a title and description.
- **View Tasks**: Users can view their list of tasks.
- **Edit Tasks**: Users can update the task details.
- **Mark as Completed**: Tasks can be marked as completed.
- **Delete Tasks**: Users can remove tasks from their list.


## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB (or use MongoDB Atlas)

### Installation
1. **Clone the repository:**
   ```sh
   https://github.com/Sumit0071/AlgoRoot-assignment.git
   cd AlgoRoot-assignment
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. **Run the backend server:**
   ```sh
   npm run server
   ```
5. **Run the frontend:**
   ```sh
   npm start
   ```

## API Endpoints
| Method | Endpoint         | Description |
|--------|----------------|-------------|
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | User login |
| GET    | /api/tasks        | Get all tasks |
| POST   | /api/tasks        | Create a new task |
| PUT    | /api/tasks/:id    | Update a task |
| PATCH  | /api/tasks/:id/complete | Mark task as completed |
| DELETE | /api/tasks/:id    | Delete a task |

## Usage
1. Sign up or log in.
2. Create a task by entering a title and description.
3. View, update, mark as complete, or delete tasks.


## Future Enhancements
- Role-based access control (Admin/User)
- Task categories and priorities
- Task due dates and reminders
- Mobile-responsive design improvements


---
### Author
Developed by **Sumit Adhikari**. Feel free to connect on [LinkedIn](https://www.linkedin.com/in/Sad2004).

