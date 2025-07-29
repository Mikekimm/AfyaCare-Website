# 🏥 AfyaCare - Modern Medical Appointment System

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Demo Accounts](#demo-accounts)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

**AfyaCare** is a modern, responsive medical appointment booking system designed specifically for the Kenyan healthcare market. The platform connects patients with qualified healthcare providers, enabling seamless appointment scheduling and healthcare management.

### 🎯 Key Highlights
- **Kenyan Context**: Localized with Kiswahili branding and local hospital partnerships
- **Modern UI/UX**: Beautiful gradient designs with glass morphism effects
- **Professional Images**: Real medical professional photos and healthcare facility imagery
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Role-Based Access**: Separate dashboards for patients and doctors

## ✨ Features

### 👥 For Patients
- **User Registration & Authentication**: Secure account creation and login
- **Doctor Discovery**: Browse and search qualified healthcare providers
- **Advanced Filtering**: Filter doctors by specialty, location, and availability
- **Appointment Booking**: Easy scheduling with preferred date and time slots
- **Appointment Management**: View and track appointment status
- **Professional Profiles**: Detailed doctor information with qualifications and experience

### 🩺 For Doctors
- **Doctor Dashboard**: Comprehensive overview of appointments and patients
- **Appointment Management**: Accept or decline appointment requests
- **Patient Overview**: View patient information and appointment history
- **Performance Metrics**: Track ratings, patient count, and appointment statistics

### 🎨 Design Features
- **AfyaCare Branding**: Professional blue-to-green gradient theme
- **Glass Morphism**: Modern backdrop blur effects and transparent elements
- **Professional Photography**: Real medical professional images from Unsplash
- **Kenyan Healthcare Context**: Local hospital partnerships and Kiswahili integration
- **Accessibility**: WCAG compliant design with proper contrast ratios

## 🛠 Technology Stack

### Frontend
- **React 18.2.0** - Modern React with hooks and functional components
- **React Router DOM 6.20.1** - Client-side routing and navigation
- **Tailwind CSS 3.3.5** - Utility-first CSS framework for styling
- **Vite 5.0.0** - Fast build tool and development server

### Additional Libraries
- **Lucide React 0.292.0** - Beautiful SVG icons
- **React Calendar 4.6.0** - Interactive calendar component
- **React DatePicker 4.21.0** - Date selection functionality
- **Date-fns 2.30.0** - Date utility functions

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixes
- **TypeScript Types** - Type definitions for React

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher) or **yarn**
- **Git** (for version control)

### System Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: At least 500MB free space

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/MichaelMusembi/medical-management-system.git
cd medical-management-system
```

### 2. Install Dependencies
Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

### 3. Environment Setup
The application uses localStorage for data persistence, so no additional environment configuration is required for development.

## 🏃‍♂️ Running the Application

### Development Mode
Start the development server with hot reload:
```bash
npm run dev
```
or
```bash
yarn dev
```

The application will be available at: **http://localhost:5173**

### Production Build
Create an optimized production build:
```bash
npm run build
```
or
```bash
yarn build
```

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```
or
```bash
yarn preview
```

### Linting
Run ESLint to check code quality:
```bash
npm run lint
```
or
```bash
yarn lint
```

## 📁 Project Structure

```
AfyaCare Medical App/
├── public/                    # Static assets
├── src/                      # Source code
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

### 🧩 Component Architecture

The application follows a single-file component architecture in `App.jsx`:

- **AuthProvider**: Context provider for authentication state
- **SimpleLanding**: Landing page with hero section and features
- **SimpleLogin**: User authentication form
- **SimpleRegister**: User registration form
- **PatientDashboard**: Patient portal with appointment management
- **DoctorDashboard**: Doctor portal with appointment requests
- **DoctorProfiles**: Doctor discovery and search functionality
- **BookAppointment**: Appointment booking form

## 🔐 Demo Accounts

### Patient Account
- **Email**: `patient@afyacare.co.ke`
- **Password**: `demo123`
- **Role**: Patient
- **Access**: Book appointments, view doctors, manage appointments

### Doctor Account
- **Email**: `doctor@afyacare.co.ke`
- **Password**: `demo123`
- **Role**: Doctor (Dr. Grace Wanjiku)
- **Specialty**: General Medicine
- **Access**: Manage appointments, view patient requests

## 🏥 Featured Doctors

### Dr. Grace Wanjiku
- **Specialty**: General Medicine
- **Experience**: 12 years
- **Location**: Nairobi Hospital
- **Rating**: 4.9/5
- **Qualifications**: MBChB (University of Nairobi), MMed

### Dr. James Kiprotich
- **Specialty**: Pediatrics
- **Experience**: 15 years
- **Location**: Kenyatta National Hospital
- **Rating**: 4.8/5
- **Qualifications**: MBChB (Moi University), MMed Pediatrics

### Dr. Faith Nyong'o
- **Specialty**: Obstetrics & Gynecology
- **Experience**: 10 years
- **Location**: Aga Khan Hospital
- **Rating**: 4.9/5
- **Qualifications**: MBChB (University of Nairobi), MMed O&G

### Dr. Samuel Mwangi
- **Specialty**: Cardiology
- **Experience**: 18 years
- **Location**: Nairobi Hospital
- **Rating**: 4.7/5
- **Qualifications**: MBChB, MMed, Fellowship in Cardiology

## 🔧 API Documentation

### Authentication
The application uses localStorage for authentication simulation:

```javascript
// Login
const loginResponse = login(email, password);
// Returns: { success: boolean, error?: string }

// Register
const registerResponse = register(name, email, password);
// Returns: { success: boolean }

// Logout
logout();
// Clears user session
```

### Appointment Management
```javascript
// Book Appointment
const appointmentData = {
  doctorId: 1,
  date: "2025-08-01",
  time: "10:00",
  reason: "General checkup"
};
const response = bookAppointment(appointmentData);
// Returns: { success: boolean, appointment?: object }
```

### Data Storage
- **User Data**: `afyacare_user`
- **Appointments**: `afyacare_appointments`
- **Patient Records**: `afyacare_patients`

## 🚀 Deployment

### Netlify Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Manual Deployment
1. Run `npm run build`
2. Upload the `dist` folder contents to your web server
3. Configure server for SPA routing (redirect all routes to index.html)

## 🤝 Contributing

We welcome contributions to AfyaCare! Please follow these guidelines:

### Development Process
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and test thoroughly
4. Commit with clear messages: `git commit -m "Add: new feature description"`
5. Push to your fork: `git push origin feature/your-feature-name`
6. Submit a pull request

### Code Standards
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Maintain responsive design principles
- Write clear, descriptive commit messages
- Test on multiple devices and browsers

### Issue Reporting
Please use GitHub Issues to report bugs or request features:
- **Bug Reports**: Include steps to reproduce, expected behavior, and screenshots
- **Feature Requests**: Describe the feature and its potential impact
- **Questions**: Use Discussions for general questions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash**: Professional medical photography
- **Tailwind CSS**: Utility-first CSS framework
- **React Team**: Amazing React framework
- **Kenyan Healthcare System**: Inspiration for localized features
- **Open Source Community**: Various tools and libraries used

## 📞 Support

For support and questions:
- **Email**: support@afyacare.co.ke
- **GitHub Issues**: [Report bugs or request features](https://github.com/MichaelMikekimm/medical-management-system/issues)
- **Documentation**: [Wiki pages](https://github.com/Mikekimm/medical-management-system/wiki)

---

**Made with ❤️ for the Kenyan healthcare community**

*AfyaCare - Modern Healthcare at Your Fingertips*
