# Task Manager

A simple web application built with **NestJS** (backend) and **Next.js** (frontend) for managing tasks with **CRUD** functionalities. This application allows users to create, read, update, and delete tasks. It also provides JWT authentication for secure user login and registration.

In this application, each task can have one of three statuses: **Pending**, **In Progress**, and **Completed**. You can easily move tasks between these statuses by using **drag-and-drop** functionality. This allows you to quickly update the state of tasks as you work on them. Simply drag a task from one column to another, and the status will automatically be updated, making task management more intuitive and efficient.
## Table of Contents

- [Project Overview](#project-overview)
- [Technologies used](#technologies-used)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [API Endpoints](#api-endpoints)
- [How to Test with Swagger](#swagger)
- [Screenshots](#screenshots)

---

## Project Overview

- **Frontend**: React, Next.js, Tailwind CSS,ShadCn
- **Backend**: NestJS, TypeORM, PostgreSQL
- **Authentication**: JWT-based authentication

---

## Technologies used

- **Frontend**:
  - React
  - Next.js
  - Tailwind CSS
  - ShadCn (UI components)
  - Axios (for API calls)
  
- **Backend**:
  - NestJS
  - TypeORM
  - PostgreSQL
  - JWT Authentication

- **Database**:
  - PostgreSQL

---

  ## Frontend Setup

### Steps to run the frontend:

1. Navigate to the `frontend` directory:
   ```bash
   cd tasks-ui
   
2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   ## Backend Setup

### Steps to run the backend:

1. Navigate to the `backend` directory:
   ```bash
   cd tasks-api
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables by creating a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Set up your backend port , your jwt secret key and PostgreSQL database credentials in .env. 
   ```bash
   PORT=backend-port
   JWT_SECRET=your-secret-key
   DB_HOST=localhost      
   DB_PORT=PostgreSQL-port         
   DB_USERNAME=your-PostgreSQL-username     
   DB_PASSWORD=your-password  
   DB_NAME=your-database-name
   ```
5. Run the development server:
   ```bash
   npm run start:dev
   ```

---
## API Endpoints

### Authentication

- **POST** `/auth/signup`: Register a new user.
- **POST** `/auth/login`: Login a user and receive a JWT token.

### Task Management

- **POST** `/tasks`: Create a new task (requires JWT).
- **GET** `/tasks`: Get all tasks for the logged-in user (requires JWT).
- **GET** `/tasks/:id`: Get a specific task by ID for the logged-in user (requires JWT).
- **PUT** `/tasks/:id`: Update the completion status of a task (requires JWT).
- **DELETE** `/tasks/:id`: Delete a task (requires JWT).
  
---
## How to Test with Swagger

### Accessing Swagger Documentation:

Once the backend server is running, navigate to the following URL in your browser:
   ```bash
   http://localhost:<backend-port>/api
   ```
Replace <backend-port> with the actual port number specified in your .env file.

### Using Swagger U:

-Swagger will display a user-friendly interface for interacting with the API.
-You can test all API endpoints (e.g., user authentication, task creation, and task management).

### Authorizing Requests:

-For endpoints requiring JWT, click the Authorize button at the top of the Swagger UI.
-Enter your JWT token, which you can obtain by logging in via the /auth/login endpoint.

### Testing Endpoints:

-Expand each endpoint to see its details, including the required request body and headers.
-Fill in the necessary parameters and send requests directly from Swagger.


---
## Screenshots
Below are some screenshots of the web application:
### Light Mode: 
![image](https://github.com/user-attachments/assets/31dc27d3-4b58-46e0-a08d-60f699645b00)
![image](https://github.com/user-attachments/assets/f7801a8e-87ac-48a3-a0db-5333baeddaee)
![image](https://github.com/user-attachments/assets/7d2e47af-37da-40a5-9151-7584efa87abc)
![image](https://github.com/user-attachments/assets/9fddfd9c-82f4-42c8-ac52-eedd766805a4)
![image](https://github.com/user-attachments/assets/9bb6c827-b9e4-4acc-b793-82ff63f44d34)

### Darkt Mode:
![image](https://github.com/user-attachments/assets/ace1c733-ca5c-4446-a27f-f3cafbdb22ac)
![image](https://github.com/user-attachments/assets/660d44cb-e7e8-4f76-aa1c-0e1f7f9370a4)
![image](https://github.com/user-attachments/assets/73f28745-b9f5-4116-9578-d22617a422fb)
![image](https://github.com/user-attachments/assets/af0e97fb-3e43-48d0-a08f-fb231f3c001f)
![image](https://github.com/user-attachments/assets/06afba2e-21c0-46ff-b935-36fecfee47dd)

---


