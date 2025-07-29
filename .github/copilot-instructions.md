<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# MedCare - Medical Appointment Booking System

This is a modern React-based Medical Appointment Booking System with a focus on clean UI/UX and seamless user experience.

## Tech Stack
- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom medical color palette
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Data Storage**: localStorage (no backend)
- **Date/Time**: react-calendar, react-datepicker, date-fns

## Project Structure
- **Components**: Reusable UI components in `/src/components/`
- **Pages**: Route-specific pages for patients and doctors
- **Hooks**: Custom React hooks for authentication and appointments
- **Utils**: Utility functions for validation, date formatting, and localStorage
- **Data**: Sample data for doctors, appointments, and medical records

## Color Palette
- Primary Blue: `#2563eb` (trust and medical professionalism)
- Success Green: `#10b981` (positive health outcomes)
- Warning Amber: `#f59e0b` (pending status)
- Error Red: `#ef4444` (alerts and cancellations)
- Background: `#f8fafc` (clean, neutral)

## User Roles
1. **Patients**: Register, browse doctors, book appointments, view medical records
2. **Doctors**: Login with pre-seeded accounts, manage appointments, view patient data

## Key Features
- Responsive mobile-first design
- Multi-step appointment booking flow
- Real-time appointment management
- Medical records with downloadable reports
- Doctor availability scheduling
- Clean, card-based layouts with hover effects

## Development Guidelines
- Use functional components with hooks
- Follow medical UI/UX best practices (trust, cleanliness, accessibility)
- Implement proper loading states and error handling
- Ensure responsive design across all screen sizes
- Use semantic HTML and ARIA labels for accessibility
- Maintain consistent spacing and typography

## Demo Credentials
- **Patient**: Any email with registration
- **Doctor**: sarah.johnson@medcare.com / doctor123
