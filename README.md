# Oasis Promotions Agency

A full-stack web application for **Oasis Promotions Agency** - a modern, minimalist marketing agency management platform built with Django REST Framework and React + TypeScript.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Seeding Sample Data](#seeding-sample-data)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Overview

Oasis Promotions Agency is a web application that provides:
- Public landing page showcasing services, projects, and team
- Authentication system with JWT tokens
- Client dashboard for viewing all agency data
- Admin panel for managing services, projects, and blog posts

## Tech Stack

### Backend
- **Django 5.x** - Web framework
- **Django REST Framework** - API toolkit
- **Djoser** - JWT authentication
- **Simple JWT** - Token authentication
- **PostgreSQL/SQLite** - Database

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **TanStack Query** - Data fetching
- **Zustand** - State management
- **React Hook Form + Zod** - Form handling

## Project Structure

```
oasis_project/
├── oasis_api/           # Django backend
│   ├── models.py        # Database models
│   ├── serializers.py   # DRF serializers
│   ├── views.py         # API views
│   ├── api_urls.py      # API routes
│   └── settings.py      # Django settings
├── web/                 # React frontend
│   ├── src/
│   │   ├── domain/      # Entities, interfaces
│   │   ├── data/        # API clients, repositories
│   │   ├── presentation/ # Components, pages, hooks
│   │   └── infrastructure/ # Router, storage
│   └── ...
├── Makefile
├── requirements.txt
└── .gitignore
```

## Features

### Authentication
- JWT-based authentication
- User registration with role selection
- Secure token refresh mechanism

### Public Pages
- Modern landing page with animations
- Services showcase
- Projects gallery
- Team section
- Responsive design

### Client Dashboard
- Overview of all agency data
- Read-only access to services, projects, blogs, team, campaigns
- Statistics cards

### Admin Panel
- Full CRUD for Services
- Full CRUD for Projects
- Full CRUD for Blog Posts
- Protected routes (admin role only)

## Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Clone the repository and navigate to the project:
```bash
cd oasis_project
```

2. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# or
.\venv\Scripts\activate   # Windows
```

3. Install dependencies:
```bash
make install
```

Or manually:
```bash
pip install Django djangorestframework djoser djangorestframework-simplejwt psycopg2-binary django-cors-headers
```

4. Run migrations (SQLite):
```bash
make migrate
```

5. Create a superuser:
```bash
make superuser
```

### Frontend Setup

1. Navigate to the web directory:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
```

Or use the make command from root:
```bash
make frontend-install
```

## Running the Project

### Backend (Development)

Using SQLite:
```bash
make run
```

Using PostgreSQL:
```bash
# Configure database in oasis_api/settings.py first
make run-postgres
```

The API will be available at `http://localhost:8000/api/`

### Frontend (Development)

```bash
make frontend-run
```

The frontend will be available at `http://localhost:5173/`

### Production Build

```bash
make frontend-build
```

## Seeding Sample Data

Populate the database with sample data for testing:

```bash
make seed
```

This creates:
- **2 Users**: admin (`admin123`) and client (`client123`)
- **3 Clients**: TechCorp, Fashionista, HealthPlus
- **4 Services**: Digital Marketing, Brand Identity, Social Media, SEO
- **3 Projects**: Website Redesign, Brand Campaign, SEO
- **3 Team Members**: Creative Director, Marketing Lead, SEO Specialist
- **3 Blog Posts**: Marketing, Design, SEO articles
- **2 Testimonials**, **2 Contacts**, **2 Campaigns**, **3 Subscribers**

### Quick Start

```bash
# Complete setup with sample data
make setup
make seed

# Run backend
make run

# In another terminal, run frontend
make frontend-run
```

Visit `http://localhost:5173/` to see the application.

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/token/` | Obtain JWT token |
| POST | `/api/auth/token/refresh/` | Refresh JWT token |
| POST | `/api/auth/users/` | Register new user |
| GET | `/api/auth/users/me/` | Get current user |

### Resources
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/services/` | List/Create services |
| GET/PUT/DELETE | `/api/services/{id}/` | Service detail |
| GET/POST | `/api/projects/` | List/Create projects |
| GET/PUT/DELETE | `/api/projects/{id}/` | Project detail |
| GET/POST | `/api/blog-posts/` | List/Create blog posts |
| GET/PUT/DELETE | `/api/blog-posts/{id}/` | Blog post detail |
| GET | `/api/clients/` | List clients |
| GET | `/api/team/` | List team members |
| GET | `/api/campaigns/` | List campaigns |
| GET | `/api/subscribers/` | List subscribers |

## Quick Start

```bash
# Complete setup
make setup

# Run backend
make run

# In another terminal, run frontend
make frontend-run
```

## License

MIT License - See LICENSE file for details.
