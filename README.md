# WealthManager.online - Portfolio Analytics Dashboard

## Overview
This project is a full-stack portfolio analytics dashboard that provides investors with a comprehensive view of their investment portfolio. It includes a backend API service and an interactive frontend dashboard.

## Features
- Portfolio overview with key metrics
- Asset allocation visualizations
- Holdings table with sorting and filtering
- Performance comparison charts
- Top performers section
- Responsive and interactive UI

## Backend
- Built with Node.js and Express
- Provides 4 core API endpoints:
  - `/api/portfolio/holdings`
  - `/api/portfolio/allocation`
  - `/api/portfolio/performance`
  - `/api/portfolio/summary`
- Uses sample data for realistic portfolio analytics
- Includes error handling and data validation

## Frontend
- Built with React (served as static files)
- Interactive charts and tables
- Responsive design for desktop and mobile
- Handles loading states and errors gracefully

## Setup and Running Locally

### Prerequisites
- Node.js and npm installed

### Installation
1. Clone the repository
2. Install backend dependencies:
   ```
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd client
   npm install
   ```
4. Run backend server:
   ```
   npm start
   ```
5. In a separate terminal, run frontend client:
   ```
   cd client
   npm start
   ```
6. Access the app at `http://localhost:3000`

## Deployment

### Production Build
1. Build the frontend:
   ```
   cd client
   npm run build
   ```
2. The backend is configured to serve the frontend build files in production.
3. Set environment variable `NODE_ENV=production`.
4. Start the backend server:
   ```
   npm start
   ```
5. The app will be accessible on the backend server port (default 5000).

### Hosting
- Backend can be hosted on platforms like Heroku, AWS, DigitalOcean.
- Frontend is served by backend in production.

## AI Tools Usage
- AI was used to assist in code generation, debugging, and testing.
- Backend and frontend code were hand-written with AI assistance for efficiency.
- AI helped solve challenges related to deployment configuration and testing.

## Testing
- Backend API endpoints tested with curl and PowerShell requests.
- Frontend UI tested via browser navigation and interaction.
- Error handling and edge cases verified.

## Challenges Solved
- Configuring backend to serve React frontend build.
- Handling Windows PowerShell command syntax differences.
- Ensuring API endpoints return correct data and status codes.

## License
MIT License
