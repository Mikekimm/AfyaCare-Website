#!/bin/bash

# AfyaCare Medical Appointment System - Quick Setup Script
# This script sets up the development environment

echo "🏥 AfyaCare Medical Appointment System Setup"
echo "============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="16.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to 16.0.0 or higher."
    exit 1
fi

echo "✅ Node.js version: $NODE_VERSION"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies. Please check your internet connection and try again."
    exit 1
fi

# Setup complete
echo ""
echo "🎉 Setup complete! You can now run the following commands:"
echo ""
echo "Start development server:"
echo "  npm run dev"
echo ""
echo "Build for production:"
echo "  npm run build"
echo ""
echo "Run linting:"
echo "  npm run lint"
echo ""
echo "Demo accounts:"
echo "  Patient: patient@afyacare.co.ke / demo123"
echo "  Doctor:  doctor@afyacare.co.ke / demo123"
echo ""
echo "🏥 Happy coding with AfyaCare!"
