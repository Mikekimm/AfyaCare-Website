import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppointments } from '../../hooks/useAppointments';
import { storage } from '../../utils/localStorage';
import { sampleDoctors } from '../../data/sampleDoctors';
import { dateUtils } from '../../utils/validation';
import AppointmentCard from '../../components/common/AppointmentCard';
import { 
  Calendar, 
  Users, 
  FileText, 
  Clock, 
  Plus,
  TrendingUp,
  Activity,
  Heart
} from 'lucide-react';

const PatientDashboard = () => {
  const { user } = useAuth();
  const { appointments, loading } = useAppointments(user?.id, 'patient');
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
    totalDoctors: 0
  });

  useEffect(() => {
    if (appointments.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      const upcoming = appointments.filter(apt => apt.date >= today && apt.status !== 'cancelled').length;
      const completed = appointments.filter(apt => apt.status === 'completed').length;
      const uniqueDoctors = new Set(appointments.map(apt => apt.doctorId)).size;

      setStats({
        totalAppointments: appointments.length,
        upcomingAppointments: upcoming,
        completedAppointments: completed,
        totalDoctors: uniqueDoctors
      });
    }
  }, [appointments]);

  const upcomingAppointments = appointments
    .filter(apt => {
      const today = new Date().toISOString().split('T')[0];
      return apt.date >= today && apt.status !== 'cancelled';
    })
    .sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time))
    .slice(0, 3);

  const recentAppointments = appointments
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const getDoctorById = (doctorId) => {
    return sampleDoctors.find(doc => doc.id === doctorId);
  };

  const quickActions = [
    {
      title: 'Book Appointment',
      description: 'Schedule a new appointment',
      icon: Calendar,
      link: '/book-appointment',
      color: 'bg-primary-500 hover:bg-primary-600'
    },
    {
      title: 'Find Doctors',
      description: 'Browse available doctors',
      icon: Users,
      link: '/doctors',
      color: 'bg-success-500 hover:bg-success-600'
    },
    {
      title: 'Medical Records',
      description: 'View your health records',
      icon: FileText,
      link: '/medical-records',
      color: 'bg-warning-500 hover:bg-warning-600'
    }
  ];

  const statCards = [
    {
      title: 'Total Appointments',
      value: stats.totalAppointments,
      icon: Calendar,
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Upcoming',
      value: stats.upcomingAppointments,
      icon: Clock,
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Completed',
      value: stats.completedAppointments,
      icon: Activity,
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Your Doctors',
      value: stats.totalDoctors,
      icon: Heart,
      color: 'bg-pink-100 text-pink-600',
      bgColor: 'bg-pink-50'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's an overview of your health journey
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className={`${action.color} text-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105`}
              >
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{action.title}</h3>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`${stat.bgColor} rounded-xl p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
              <Link 
                to="/book-appointment"
                className="btn-primary text-sm py-2 px-4"
              >
                <Plus className="h-4 w-4 mr-1 inline" />
                Book New
              </Link>
            </div>

            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    doctor={getDoctorById(appointment.doctorId)}
                    showDoctor={true}
                    showPatient={false}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No upcoming appointments</p>
                <Link 
                  to="/book-appointment"
                  className="btn-primary mt-4 inline-flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Book Your First Appointment
                </Link>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <Link 
                to="/medical-records"
                className="text-primary-500 hover:text-primary-600 text-sm font-medium"
              >
                View All
              </Link>
            </div>

            {recentAppointments.length > 0 ? (
              <div className="space-y-4">
                {recentAppointments.map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    doctor={getDoctorById(appointment.doctorId)}
                    showDoctor={true}
                    showPatient={false}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No recent activity</p>
              </div>
            )}
          </div>
        </div>

        {/* Health Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-primary-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Health Tip of the Day</h3>
              <p className="text-primary-100">
                Regular check-ups help detect health issues early. Schedule your routine appointments to stay healthy!
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <Heart className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
