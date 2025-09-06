@echo off
echo Setting up E-commerce Backend...
echo.

REM Check if .env file exists
if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo.
    echo *** IMPORTANT: Please edit .env file with your MongoDB Atlas credentials ***
    echo.
    echo 1. Go to https://www.mongodb.com/atlas
    echo 2. Create a free cluster
    echo 3. Create a database user
    echo 4. Get your connection string
    echo 5. Replace the MONGODB_URI in .env file
    echo 6. Generate a secure JWT_SECRET
    echo.
    pause
) else (
    echo .env file already exists
)

echo.
echo Starting the backend server...
npm run dev
