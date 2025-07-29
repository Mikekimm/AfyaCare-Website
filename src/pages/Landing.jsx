import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Calendar, 
  Users, 
  Shield, 
  Clock, 
  Star,
  ArrowRight,
  CheckCircle,
  Smartphone,
  Monitor
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Book appointments with trusted doctors instantly, anytime, anywhere.'
    },
    {
      icon: Users,
      title: 'Verified Doctors',
      description: 'Connect with certified and experienced healthcare professionals.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your medical information is protected with bank-level security.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our round-the-clock support.'
    }
  ];

  const steps = [
    {
      step: '1',
      title: 'Create Account',
      description: 'Sign up and complete your profile in minutes'
    },
    {
      step: '2',
      title: 'Find Your Doctor',
      description: 'Browse by specialty, location, or availability'
    },
    {
      step: '3',
      title: 'Book Appointment',
      description: 'Select your preferred date and time slot'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Patient',
      content: 'MedCare made it so easy to find and book an appointment with a great cardiologist. The process was seamless!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Patient',
      content: 'Finally, a platform that puts patients first. Quick booking, professional doctors, and excellent service.',
      rating: 5
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Pediatrician',
      content: 'As a doctor, I love how MedCare helps me manage my schedule and connect with patients efficiently.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-500 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MedCare</span>
            </div>
            
            <div className="flex space-x-4">
              <Link to="/login" className="btn-secondary">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Book Appointments With{' '}
                <span className="text-primary-500">Trusted Doctors</span>{' '}
                Instantly
              </h1>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                Connect with certified healthcare professionals, manage your medical records, 
                and take control of your health journey with our modern platform.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn-primary text-lg px-8 py-3">
                  Book Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/login" className="btn-secondary text-lg px-8 py-3">
                  Find a Doctor
                </Link>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"
                  alt="Doctor with patient"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-8 w-8 text-success-500" />
                    <div>
                      <p className="font-semibold text-gray-900">1000+</p>
                      <p className="text-sm text-gray-600">Trusted Doctors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose MedCare?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              We're revolutionizing healthcare access with modern technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Get started in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Our Users Say
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Trusted by thousands of patients and doctors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-2xl">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands who trust MedCare for their healthcare needs
          </p>
          <Link to="/register" className="bg-white text-primary-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary-500 p-2 rounded-lg">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">MedCare</span>
              </div>
              <p className="text-gray-400">
                Modern healthcare booking platform connecting patients with trusted medical professionals.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/register" className="hover:text-white">Sign Up</Link></li>
                <li><Link to="/login" className="hover:text-white">Sign In</Link></li>
                <li><a href="#" className="hover:text-white">Find Doctors</a></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📧 support@medcare.com</li>
                <li>📞 +1 (555) 123-4567</li>
                <li>📍 123 Healthcare Ave, Medical City</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MedCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
