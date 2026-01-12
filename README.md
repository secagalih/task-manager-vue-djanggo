# Task Manager Application

A full-stack task management application built with Django REST Framework (backend) and Nuxt.js (frontend). Users can create tasks and assign them to users, with a simple and intuitive interface for managing tasks.

## Tech Stack

- **Backend**: Django 6.0.1, Django REST Framework
- **Frontend**: Nuxt.js 4, Vue 3, Vuetify
- **Database**: SQLite

## Prerequisites

- Python 3.10+ (Python 3.14 used in development)
- Node.js 18+ and npm
- Git

## How to Run the Project

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies (if you have a virtual environment, activate it first):
   ```bash
   pip install django djangorestframework django-cors-headers
   ```

3. Run database migrations:
   ```bash
   python manage.py migrate
   ```

4. (Optional) Create a superuser to access Django admin:
   ```bash
   python manage.py createsuperuser
   ```

5. Start the Django development server:
   ```bash
   python manage.py runserver
   ```
   
   The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:3000`

### Accessing the Application

- **Frontend**: Open `http://localhost:3000` in your browser
- **Backend API**: Available at `http://localhost:8000/api/`

## API Endpoints

- `GET /api/users/` - List all users
- `POST /api/users/add/` - Create a new user
- `GET /api/user/<id>/` - Get tasks for a specific user
- `POST /api/tasks/add/` - Create a new task
- `PUT /api/tasks/update/<id>/` - Update a task
- `DELETE /api/tasks/delete/<id>/` - Delete a task
