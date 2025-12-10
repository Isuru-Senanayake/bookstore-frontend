# Online Bookstore Web Application

A full-stack online bookstore web application built with React.js frontend and JSON Server backend for managing books inventory.

## Technologies Used

**Frontend:**
- React.js
- HTML5 & CSS3
- JavaScript (ES6+)
- Axios (for API calls)
- Bootstrap/CSS for styling

**Backend:**
- JSON Server (Mock REST API)
- Node.js

**Database:**
- JSON file (db.json)

## Features

- Browse books catalog
- Add new books to inventory
- Edit existing book details
- Delete books from inventory
- Search functionality
- Responsive design
- User-friendly interface
- CRUD operations (Create, Read, Update, Delete)

## Project Structure
bookstore-application/
├── bookstore-frontend/     # React application
│   ├── src/
│   ├── public/
│   └── package.json
├── bookstore-backend/      # JSON Server API
│   ├── db.json            # Database file
│   └── package.json
└── README.md

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Git

### Backend Setup (JSON Server)

1. **Clone the backend repository**
   git clone https://github.com/Isuru-Senanayake/bookstore-backend.git
   cd bookstore-backend

# Install dependencies
npm install

# Start the JSON Server
npm start
Backend API will run on: http://localhost:3001

# Frontend Setup

# Clone the frontend repository
git clone https://github.com/Isuru-Senanayake/bookstore-frontend.git
cd bookstore-frontend

# Install dependencies
npm install

# Start the React application
npm start
Frontend will run on: http://localhost:3000

# API Endpoints
MethodEndpointDescriptionGET/booksGet all booksGET/books/:idGet book by IDPOST/booksAdd new bookPUT/books/:idUpdate bookDELETE/books/:idDelete book
Base URL: http://localhost:3001

# Testing (Planned)
