# Ecommerce Full-Stack Application

A modern full-stack ecommerce application built with React (frontend) and Node.js/Express (backend), featuring user authentication, product management, shopping cart, and order processing.

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Product Management**: Browse and view detailed product information
- **Shopping Cart**: Add, update, and remove items from cart
- **Order Processing**: Complete checkout flow with order history
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **RESTful API**: Well-structured backend API for all operations

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS enabled for cross-origin requests

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Arun-S-1505/FSD-Project.git
   cd FSD-Project
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment Setup:**

   **Backend (.env):**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your-super-secret-jwt-key-here
   FAKE_STORE_API=https://fakestoreapi.com
   FRONTEND_URL=http://localhost:5173
   ```

   **Frontend (.env):**
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

## Usage

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on http://localhost:5000

2. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:5173

3. **Access the application:**
   Open http://localhost:5173 in your browser

### Building for Production

**Frontend:**
```bash
npm run build
```

**Backend:**
```bash
cd backend
npm run build  # if applicable
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders` - Get user orders (protected)

## Project Structure

```
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts for state management
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── backend/               # Backend Node.js application
│   ├── api/               # API route handlers
│   ├── config/            # Database and configuration
│   ├── middleware/        # Express middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── server.js          # Main server file
├── public/                # Static assets
└── package.json           # Frontend dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Product data sourced from [Fake Store API](https://fakestoreapi.com/)
- UI design inspired by modern ecommerce platforms
