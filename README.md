# Talent Tracking System (ATS)

A modern, enterprise-grade Applicant Tracking System built with TypeScript, React, Node.js, and PostgreSQL. This system follows SOLID principles and clean architecture patterns to provide a robust solution for managing recruitment processes.

## 🚀 Features

### ✅ Implemented
- **Candidate Management**: Add new candidates with comprehensive information
- **Document Upload**: CV/Resume upload in PDF and DOCX formats with validation
- **Data Validation**: Client-side and server-side validation with detailed error messages
- **File Management**: Secure file storage with size and type validation (max 5MB)
- **Modern UI**: Responsive, accessible interface with professional design
- **Error Handling**: Comprehensive error handling and user feedback
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Clean Architecture**: SOLID principles, dependency injection, and separation of concerns

### 🔄 Coming Soon
- Candidate listing and search
- Interview scheduling
- Reports and analytics
- User authentication and authorization
- Advanced file management (preview, download links)

## 🏗️ Architecture

The application follows a clean, layered architecture:

### Backend Structure
```
backend/src/
├── types/           # TypeScript interfaces and types
├── validators/      # Data validation classes
├── repositories/    # Data access layer
├── services/        # Business logic layer
├── controllers/     # HTTP request handlers
├── routes/          # API route definitions
└── index.ts         # Application entry point
```

### Frontend Structure
```
frontend/src/
├── types/           # TypeScript interfaces
├── services/        # API communication layer
├── components/      # React components
├── config/          # Configuration files
└── App.tsx          # Application entry point
```

## 🛠️ Technology Stack

### Backend
- **Node.js** with **TypeScript**
- **Express.js** for REST API
- **Prisma** as ORM
- **PostgreSQL** database
- **CORS** for cross-origin requests

### Frontend
- **React 18** with **TypeScript**
- **Axios** for HTTP requests
- **CSS3** with modern features
- **Responsive Design**

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd AI4Devs-lab-ides-SR-01
```

### 2. Database Setup
```bash
# Create a PostgreSQL database
createdb talent_tracking_system

# Set up environment variables
# Create a .env file in the backend directory with:
DB_PASSWORD
DB_USER
DB_NAME
DB_PORT
DATABASE_URL
```

### 3. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Start the development server
npm run dev
```

The backend will be available at `http://localhost:3010`

### 4. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create environment file (optional)
# Create a .env file with:
# REACT_APP_API_URL=http://localhost:3010/api

# Start the development server
npm start
```

The frontend will be available at `http://localhost:3000`

## 📖 API Documentation

### Endpoints

#### POST /api/candidates
Create a new candidate with optional CV upload

**Request Body (multipart/form-data):**
- `firstName` (string, required): Candidate's first name
- `lastName` (string, required): Candidate's last name
- `email` (string, required): Valid email address
- `phone` (string, required): Phone number
- `address` (string, optional): Address
- `education` (string, optional): Education background
- `workExperience` (string, optional): Work experience
- `cv` (file, optional): CV/Resume file (PDF or DOCX, max 5MB)

**Response:**
```json
{
  "success": true,
  "message": "Candidate successfully added to the system",
  "candidate": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, State",
    "education": "Bachelor's in Computer Science",
    "workExperience": "5 years as Software Developer",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET /api/candidates
Retrieve all candidates

#### GET /api/candidates/:id
Retrieve a specific candidate by ID

#### GET /api/files/cv/:fileName
Download a candidate's CV file

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🔧 Development

### Code Style
The project uses ESLint and Prettier for code formatting and linting.

### Database Schema
The application uses Prisma for database management. The schema is defined in `backend/prisma/schema.prisma`.

### Adding New Features
1. Follow the existing architecture patterns
2. Implement proper TypeScript types
3. Add validation for new fields
4. Update tests accordingly
5. Follow SOLID principles

## 🚀 Production Deployment

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve the build folder with your preferred web server
```

### Docker Deployment
```bash
# Start all services
docker-compose up -d
```

## 🔒 Security Features

- Input validation and sanitization
- SQL injection prevention through Prisma ORM
- CORS configuration
- Error handling without sensitive information exposure
- Type safety throughout the application

## 🎯 User Stories

### Add Candidate to the System
**As a recruiter, I want to be able to add candidates to the ATS system, so that I can manage my data and recruitment processes efficiently.**

**Acceptance Criteria:**
- ✅ Clearly visible button to add a new candidate from the main dashboard
- ✅ Comprehensive form with all necessary candidate fields
- ✅ Data validation for required fields and format checking
- ✅ Document upload functionality for CV/Resume in PDF and DOCX formats
- ✅ Success confirmation message after successful submission
- ✅ Error handling with appropriate user feedback
- ✅ Responsive design compatible with different devices and browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style and architecture
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## 🆘 Support

For support and questions, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using modern web technologies and best practices**