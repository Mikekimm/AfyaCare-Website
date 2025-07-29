import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

// Mock data for Kenyan doctors with real professional images
const doctors = [
  {
    id: 1,
    name: "Dr. Grace Wanjiku",
    specialty: "General Medicine",
    experience: "12 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    availability: ["Monday", "Tuesday", "Wednesday", "Friday"],
    bio: "Experienced general practitioner specializing in family medicine and preventive care. Fluent in English and Kiswahili.",
    location: "Nairobi Hospital",
    qualifications: "MBChB (University of Nairobi), MMed"
  },
  {
    id: 2,
    name: "Dr. James Kiprotich",
    specialty: "Pediatrics",
    experience: "15 years",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    availability: ["Monday", "Wednesday", "Thursday", "Saturday"],
    bio: "Dedicated pediatrician with expertise in child healthcare and immunizations. Passionate about improving child health outcomes in Kenya.",
    location: "Kenyatta National Hospital",
    qualifications: "MBChB (Moi University), MMed Pediatrics"
  },
  {
    id: 3,
    name: "Dr. Faith Nyong'o",
    specialty: "Obstetrics & Gynecology",
    experience: "10 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1594824047875-d80e5b2b85e5?w=400&h=400&fit=crop&crop=face",
    availability: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    bio: "Compassionate OB-GYN specialist focused on maternal health and family planning services.",
    location: "Aga Khan Hospital",
    qualifications: "MBChB (University of Nairobi), MMed O&G"
  },
  {
    id: 4,
    name: "Dr. Samuel Mwangi",
    specialty: "Cardiology",
    experience: "18 years",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    availability: ["Monday", "Tuesday", "Friday"],
    bio: "Leading cardiologist specializing in heart disease prevention and treatment. Pioneer in cardiac care in East Africa.",
    location: "Nairobi Hospital",
    qualifications: "MBChB, MMed, Fellowship in Cardiology"
  }
];

// Authentication Context
const AuthContext = React.createContext();

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('afyacare_user');
    const savedAppointments = localStorage.getItem('afyacare_appointments');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  const login = (email, password) => {
    // Demo credentials - in real app, this would validate against a backend
    if (email === "patient@afyacare.co.ke" && password === "demo123") {
      const userData = {
        id: 1,
        email: email,
        name: "Mary Wanjira",
        role: "patient"
      };
      setUser(userData);
      localStorage.setItem('afyacare_user', JSON.stringify(userData));
      return { success: true };
    } else if (email === "doctor@afyacare.co.ke" && password === "demo123") {
      const userData = {
        id: 1,
        email: email,
        name: "Dr. Grace Wanjiku",
        role: "doctor",
        specialty: "General Medicine"
      };
      setUser(userData);
      localStorage.setItem('afyacare_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "Invalid credentials. Try the demo accounts below." };
  };

  const register = (name, email, password) => {
    // Simple registration - in real app, this would save to backend
    const userData = {
      id: Date.now(),
      name: name,
      email: email,
      role: "patient"
    };
    setUser(userData);
    localStorage.setItem('afyacare_user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('afyacare_user');
  };

  const bookAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now(),
      ...appointmentData,
      patientId: user.id,
      status: 'pending'
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem('afyacare_appointments', JSON.stringify(updatedAppointments));
    return { success: true };
  };

  const value = {
    user,
    appointments,
    login,
    register,
    logout,
    bookAppointment,
    doctors
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Simple Landing component with enhanced UI
const SimpleLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-teal-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-200 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="text-white text-center relative z-10 max-w-4xl mx-auto px-6">
        {/* Logo and Main Title */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=100&h=100&fit=crop&crop=center" 
              alt="AfyaCare Logo" 
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg mr-4 object-cover"
            />
            <h1 className="text-7xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              AfyaCare
            </h1>
          </div>
          <p className="text-2xl mb-4 font-light">Modern Healthcare at Your Fingertips</p>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Connect with qualified Kenyan doctors, book appointments seamlessly, and manage your health journey with confidence.
          </p>
        </div>

        {/* Feature highlights with real medical images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <img 
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=60&h=60&fit=crop&crop=center" 
              alt="Trusted Doctors" 
              className="w-12 h-12 rounded-full mx-auto mb-3 object-cover"
            />
            <h3 className="font-semibold mb-2">Trusted Doctors</h3>
            <p className="text-sm opacity-80">Certified healthcare professionals</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=60&h=60&fit=crop&crop=center" 
              alt="Easy Booking" 
              className="w-12 h-12 rounded-full mx-auto mb-3 object-cover"
            />
            <h3 className="font-semibold mb-2">Easy Booking</h3>
            <p className="text-sm opacity-80">Schedule appointments instantly</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=60&h=60&fit=crop&crop=center" 
              alt="Secure & Private" 
              className="w-12 h-12 rounded-full mx-auto mb-3 object-cover"
            />
            <h3 className="font-semibold mb-2">Secure & Private</h3>
            <p className="text-sm opacity-80">Your health data is protected</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/login"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
            Sign In
          </Link>
          <Link 
            to="/register"
            className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
            Get Started Free
          </Link>
        </div>

        {/* Trust indicators with real hospital images */}
        <div className="mt-12 text-center">
          <p className="text-sm opacity-75 mb-6">Trusted by thousands of Kenyans</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="flex items-center space-x-2">
              <img 
                src="https://images.unsplash.com/photo-1563213126-a4273aed2016?w=30&h=30&fit=crop&crop=center" 
                alt="Hospital" 
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm">Nairobi Hospital</span>
            </div>
            <div className="flex items-center space-x-2">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=30&h=30&fit=crop&crop=center" 
                alt="Hospital" 
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm">KNH</span>
            </div>
            <div className="flex items-center space-x-2">
              <img 
                src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=30&h=30&fit=crop&crop=center" 
                alt="Hospital" 
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm">Aga Khan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Login component
const SimpleLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-100">
        {/* Header with logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=80&h=80&fit=crop&crop=center" 
              alt="AfyaCare" 
              className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-blue-200"
            />
            <h1 className="text-3xl font-bold text-blue-600">AfyaCare</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to access your healthcare dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              {error}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="patient@afyacare.co.ke"
                required
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Sign In to AfyaCare
          </button>
        </form>

        {/* Demo accounts */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-100">
          <p className="text-sm text-blue-800 font-semibold mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
            Demo Accounts (Kenya):
          </p>
          <div className="space-y-1 text-sm text-blue-700">
            <p><strong>Patient:</strong> patient@afyacare.co.ke / demo123</p>
            <p><strong>Doctor:</strong> doctor@afyacare.co.ke / demo123</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            New to AfyaCare? 
            <Link to="/register" className="text-blue-500 hover:text-blue-600 font-medium ml-1 hover:underline">
              Create an account
            </Link>
          </p>
          <Link to="/" className="block mt-3 text-blue-500 hover:text-blue-600 text-sm hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

// Register component with modern UI and AfyaCare branding
const SimpleRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200 rounded-full opacity-20"></div>
      </div>
      
      <div className="relative backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-xl border border-white/20 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=64&h=64&fit=crop&crop=center" 
              alt="AfyaCare" 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
            Join AfyaCare
          </h2>
          <p className="text-gray-600">Create your account and start your healthcare journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Create a secure password"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-600">
            Already have an account? 
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium ml-1 hover:underline">
              Sign in here
            </Link>
          </p>
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

// Patient Dashboard with modern UI and AfyaCare branding
const PatientDashboard = () => {
  const { user, appointments, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="backdrop-blur-sm bg-white/80 shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=40&h=40&fit=crop&crop=center" 
                alt="AfyaCare Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                AfyaCare
              </h1>
              <p className="text-sm text-gray-600">Patient Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium text-gray-800">Welcome back!</p>
              <p className="text-sm text-gray-600">{user.name}</p>
            </div>
            <button 
              onClick={logout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/doctors" className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Find Doctors</h3>
            <p className="text-gray-600">Browse and search for healthcare providers near you</p>
          </Link>
          
          <Link to="/book-appointment" className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Book Appointment</h3>
            <p className="text-gray-600">Schedule a visit with your preferred doctor</p>
          </Link>
          
          <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">My Records</h3>
            <p className="text-gray-600">View your medical history and reports</p>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Recent Appointments</h2>
            </div>
          </div>
          <div className="p-6">
            {appointments.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">No appointments yet</p>
                <p className="text-gray-400 mb-6">Book your first appointment to get started!</p>
                <Link to="/book-appointment" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Book Appointment
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-gray-800">{appointment.doctorName}</h3>
                        <p className="text-blue-600 font-medium">{appointment.specialty}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {appointment.date}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {appointment.time}
                          </div>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800 border border-green-200' :
                        'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DoctorDashboard = () => {
  const { user, appointments, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <nav className="backdrop-blur-sm bg-white/80 shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=40&h=40&fit=crop&crop=center" 
                alt="AfyaCare Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                AfyaCare
              </h1>
              <p className="text-sm text-gray-600">Doctor Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium text-gray-800">Dr. {user.name}</p>
              <p className="text-sm text-gray-600">{user.specialty}</p>
            </div>
            <button 
              onClick={logout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Today's Appointments</h3>
            <p className="text-3xl font-bold text-blue-600">{appointments.length}</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Total Patients</h3>
            <p className="text-3xl font-bold text-green-600">24</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Rating</h3>
            <p className="text-3xl font-bold text-purple-600">4.9</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Appointment Requests</h2>
            </div>
          </div>
          <div className="p-6">
            {appointments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No appointment requests at the moment.</p>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Patient Appointment Request</h3>
                        <p className="text-gray-600">{appointment.reason}</p>
                        <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                          Accept
                        </button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Doctor Profiles page
const DoctorProfiles = () => {
  const { doctors, user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];
  
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === '' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <nav className="backdrop-blur-sm bg-white/80 shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=40&h=40&fit=crop&crop=center" 
                alt="AfyaCare Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                AfyaCare
              </h1>
              <p className="text-sm text-gray-600">Find Doctors</p>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium text-gray-800">Welcome back!</p>
              <p className="text-sm text-gray-600">{user.name}</p>
            </div>
            <button 
              onClick={logout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Find Doctors</h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-200"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">Experience: {doctor.experience}</p>
                  <div className="flex items-center">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-gray-600 ml-1">{doctor.rating}/5</span>
                  </div>
                  <p className="text-gray-600 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {doctor.location}
                  </p>
                  <p className="text-gray-600 text-sm">{doctor.bio}</p>
                  <p className="text-gray-500 text-xs">{doctor.qualifications}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Available Days:</p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.availability.map(day => (
                      <span key={day} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Link
                  to={`/book-appointment?doctorId=${doctor.id}`}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 text-center block"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Appointment Booking page
const BookAppointment = () => {
  const { doctors, bookAppointment, user, logout } = useAuth();
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const doctor = doctors.find(d => d.id === parseInt(selectedDoctor));
    
    const appointmentData = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: date,
      time: time,
      reason: reason
    };

    bookAppointment(appointmentData);
    setSuccess(true);
    
    // Reset form
    setSelectedDoctor('');
    setDate('');
    setTime('');
    setReason('');
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <nav className="backdrop-blur-sm bg-white/80 shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=40&h=40&fit=crop&crop=center" 
                alt="AfyaCare Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                AfyaCare
              </h1>
              <p className="text-sm text-gray-600">Book Appointment</p>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium text-gray-800">Welcome back!</p>
              <p className="text-sm text-gray-600">{user.name}</p>
            </div>
            <button 
              onClick={logout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Book Appointment</h1>

        {success && (
          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 text-green-800 px-6 py-4 rounded-xl mb-6 shadow-lg">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold">Appointment booked successfully!</p>
                <p className="text-sm">We'll contact you to confirm your appointment details.</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-3">Select Doctor</label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Choose a doctor...</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-3">Preferred Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-3">Preferred Time</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select time...</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-3">Reason for Visit</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Please describe your symptoms or reason for the appointment..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

function App() {
  const { user } = useAuth();
  
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!user ? <SimpleLanding /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!user ? <SimpleLogin /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <SimpleRegister /> : <Navigate to="/dashboard" />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          user ? (
            user.role === 'patient' ? <PatientDashboard /> : <DoctorDashboard />
          ) : <Navigate to="/login" />
        } />
        
        {/* Patient Routes */}
        <Route path="/doctors" element={
          user && user.role === 'patient' ? <DoctorProfiles /> : <Navigate to="/login" />
        } />
        <Route path="/book-appointment" element={
          user && user.role === 'patient' ? <BookAppointment /> : <Navigate to="/login" />
        } />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
      </Routes>
    </Router>
  );
}

const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
