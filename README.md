# E-commerce Backend API

This project is the backend API for an e-commerce web application. It provides various endpoints for user authentication, product management, order management, and more. The backend is built using Node.js and Express, with MongoDB as the database.

## Features

- **User Authentication**: Register, login, and manage user sessions.
- **Product Management**: CRUD operations for products.
- **Order Management**: Create and manage orders.
- **Category Management**: Create and manage product categories.
- **Admin Management**: Promote or demote users to admin roles.
- **Password Management**: Reset and change passwords.
- **Email Notifications**: Send email notifications for various events.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT**: JSON Web Tokens for secure authentication.
- **Bcrypt**: Library for hashing passwords.
- **NodeMailer**: For sending emails.
- **Dotenv**: For managing environment variables.

## Setup and Installation

### Prerequisites

- Node.js
- npm (Node package manager)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/e-commerce-backend.git
   cd e-commerce-backend

2. Install dependencies:
   ```bash
   npm install
   
3. Set up environment variables:
   Create a .env file in the root directory and add the following variables:
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_pass

5. Run the application:
   ```bash
   npm start
 The API will be running on http://localhost:5000.

## API Endpoints
### User Routes
- **POST** /api/users/register: Register a new user.
- **POST** /api/users/login: Login a user.
- **GET** /api/users/profile: Get user profile (protected).
- **PUT** /api/users/profile: Update user profile (protected).
- **POST** /api/users/forgot-password: Request password reset.
- **POST** /api/users/reset-password: Reset password using token.

### Product Routes
- **GET** /api/products: Get all products.
- **GET** /api/products/: Get a single product by ID.
- **POST** /api/products: Create a new product (admin).
- **PUT** /api/products/: Update a product by ID (admin).
- **DELETE** /api/products/: Delete a product by ID (admin).

### Category Routes
- **GET** /api/categories: Get all categories.
- **POST** /api/categories: Create a new category (admin).
- **PUT** /api/categories/: Update a category by ID (admin).
- **DELETE** /api/categories/: Delete a category by ID (admin).

### Order Routes
- **GET** /api/orders: Get all orders (admin).
- **GET** /api/orders/: Get a single order by ID.
- **POST** /api/orders: Create a new order.
- **PUT** /api/orders/: Update an order by ID (admin).

### Admin Routes
- **GET** /api/admin/users: Get all users (admin).
- **PUT** /api/admin/users/: Promote or demote a user (admin).

## Project Structure
    ```bash
      src/
      ├── controllers/
      │   ├── authController.js
      │   ├── orderController.js
      │   ├── productController.js
      │   ├── userController.js
      │   └── categoryController.js
      ├── models/
      │   ├── orderModel.js
      │   ├── productModel.js
      │   ├── userModel.js
      │   └── categoryModel.js
      ├── routes/
      │   ├── authRoutes.js
      │   ├── orderRoutes.js
      │   ├── productRoutes.js
      │   ├── userRoutes.js
      │   └── categoryRoutes.js
      ├── middleware/
      │   ├── authMiddleware.js
      │   └── errorMiddleware.js
      ├── utils/
      │   ├── sendEmail.js
      │   └── generateToken.js
      ├── app.js
      ├── server.js
      └── config/
          └── db.js
## Usage
Authentication: Use JWT for secure authentication. Pass the token in the Authorization header as Bearer <token>.
Admin Access: Admin routes are protected and require the user to have admin privileges.
Contribution
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Frontend
The frontend for this application is built using React and can be found [Here](https://github.com/Syed1811/apkaBazzarEcomFrontEnd).


