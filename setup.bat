@echo off
REM AfyaCare Medical Appointment System - Windows Setup Script

echo 🏥 AfyaCare Medical Appointment System Setup
echo =============================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm.
    pause
    exit /b 1
)

echo ✅ npm version:
npm --version

echo.
echo 📦 Installing dependencies...
npm install

if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully!
) else (
    echo ❌ Failed to install dependencies. Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo 🎉 Setup complete! You can now run the following commands:
echo.
echo Start development server:
echo   npm run dev
echo.
echo Build for production:
echo   npm run build
echo.
echo Run linting:
echo   npm run lint
echo.
echo Demo accounts:
echo   Patient: patient@afyacare.co.ke / demo123
echo   Doctor:  doctor@afyacare.co.ke / demo123
echo.
echo 🏥 Happy coding with AfyaCare!
pause
