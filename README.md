# Project Setup Guide

This guide will walk you through setting up and running the project locally using **Docker** or running it without Docker. It also covers running backend tests.

## Live Demo

You can test the application live using the following link: [Live Demo](https://family-photo-management-web.onrender.com/).

> **Note:** The live demo is hosted on Render, and it might take a few seconds to respond initially due to the server's cold start behavior.

## Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://www.docker.com/)
- [Node.js (v20 or higher)](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Running the Project with Docker

The project includes a `docker-compose.yml` file to manage both the backend and frontend services.

### Steps:

1. **Navigate to the Project Directory**  
   Open a terminal and navigate to the root folder of the project.

2. **Start the Containers**  
   Run the following command to build and start the services:

   ```bash
   docker-compose up --build
   ```

3. **Access the Application**

   - **Frontend:** Open your browser and go to [http://localhost:3000](http://localhost:3000).
   - **Backend:** The backend runs on [http://localhost:3030](http://localhost:3030).

4. **Stopping the Containers**  
   To stop the running containers, press "Ctrl+C" in the terminal where `docker-compose` is running or execute:
   ```bash
   docker-compose down
   ```

## Running the Project Without Docker

### Backend Setup

1. **Navigate to the Backend Folder**

   ```bash
   cd backend
   ```

2. **Install Dependencies**  
   Run the following command to install required packages:

   ```bash
   npm install
   ```

3. **Start the Backend**  
   Start the backend service in development mode:

   ```bash
   npm run dev
   ```

4. **Verify the Backend**  
   The backend should now be running at [http://localhost:3030](http://localhost:3030).

---

### Frontend Setup

1. **Navigate to the Frontend Folder**

   ```bash
   cd frontend
   ```

2. **Install Dependencies**  
   Install the necessary frontend dependencies:

   ```bash
   npm install
   ```

3. **Start the Frontend**  
   Start the frontend in development mode:

   ```bash
   npm run dev
   ```

4. **Access the Frontend**  
   The application will be available at [http://localhost:5173/](http://localhost:5173/).

## Running Backend Tests

The project includes unit tests for the backend. Follow these steps to run the tests:

1. **Navigate to the Backend Folder**

   ```bash
   cd backend
   ```

2. **Run Tests**  
   Execute the following command to run the tests:

   ```bash
   npm test
   ```

   This will run all the unit tests and display the results in the terminal.

## Summary of Commands

| Action                | Command                      |
| --------------------- | ---------------------------- |
| Start with Docker     | `docker-compose up --build`  |
| Stop Docker           | `docker-compose down`        |
| Install Backend Deps  | `cd backend && npm install`  |
| Install Frontend Deps | `cd frontend && npm install` |
| Run Backend Locally   | `cd backend && npm run dev`  |
| Run Frontend Locally  | `cd frontend && npm run dev` |
| Run Backend Tests     | `cd backend && npm test`     |
