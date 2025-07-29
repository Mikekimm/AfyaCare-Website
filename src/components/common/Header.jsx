import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  Stethoscope, 
  User, 
  LogOut, 
  Calendar, 
  Users, 
  FileText,
  Clock,
  Menu,
  X
} from 'lucide-react';

const Header = () => {
  const { user, logout, isPatient, isDoctor } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const patientNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: User },
    { path: '/doctors', label: 'Find Doctors', icon: Users },
    { path: '/book-appointment', label: 'Book Appointment', icon: Calendar },
    { path: '/medical-records', label: 'Medical Records', icon: FileText }
  ];

  const doctorNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: User },
    { path: '/appointments', label: 'Appointments', icon: Calendar },
    { path: '/schedule', label: 'Schedule', icon: Clock },
    { path: '/patient-records', label: 'Patient Records', icon: FileText }
  ];

  const navItems = isPatient ? patientNavItems : doctorNavItems;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="bg-primary-500 p-2 rounded-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">MedCare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {isDoctor ? user.profile?.name : user.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
              <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-600" />
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-primary-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {/* User info */}
              <div className="flex items-center space-x-3 px-2">
                <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {isDoctor ? user.profile?.name : user.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>

              {/* Navigation items */}
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center space-x-3 px-2 py-2 text-gray-600 hover:text-primary-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-2 py-2 text-gray-600 hover:text-red-500 transition-colors text-left"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
