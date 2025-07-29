import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAppointments } from '../../hooks/useAppointments';
import { storage } from '../../utils/localStorage';
import { dateUtils } from '../../utils/validation';
import AppointmentCard from '../../components/common/AppointmentCard';
import { 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Activity
} from 'lucide-react';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const { appointments, loading, approveAppointment, cancelAppointment } = useAppointments(user?.id, 'doctor');
  const [stats, setStats] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
    totalPatients: 0
  });

  useEffect(() => {
    if (appointments.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      const todayAppts = appointments.filter(apt => apt.date === today).length;
      const pending = appointments.filter(apt => apt.status === 'pending').length;
      const uniquePatients = new Set(appointments.map(apt => apt.patientId)).size;

      setStats({
        totalAppointments: appointments.length,
        todayAppointments: todayAppts,
        pendingAppointments: pending,
        totalPatients: uniquePatients
      });
    }
  }, [appointments]);

  const todayAppointments = appointments
    .filter(apt => {
      const today = new Date().toISOString().split('T')[0];
      return apt.date === today;
    })
    .sort((a, b) => a.time.localeCompare(b.time));

  const pendingAppointments = appointments
    .filter(apt => apt.status === 'pending')
    .sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time))
    .slice(0, 5);

  const recentAppointments = appointments
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const getPatientById = (patientId) => {
    const users = storage.getUsers();
    return users.find(user => user.id === patientId);
  };

  const handleApprove = async (appointment) => {
    await approveAppointment(appointment.id);
  };

  const handleReject = async (appointment) => {
    await cancelAppointment(appointment.id);
  };

  const statCards = [
    {
      title: 'Total Appointments',
      value: stats.totalAppointments,
      icon: Calendar,
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Today\'s Schedule',
      value: stats.todayAppointments,
      icon: Clock,
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending Requests',
      value: stats.pendingAppointments,
      icon: AlertCircle,
      color: 'bg-yellow-100 text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-purple-50'
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
            Welcome, Dr. {user?.profile?.name}!
          </h1>
          <p className="mt-2 text-gray-600">
            {user?.profile?.specialty} • {user?.profile?.experience} experience
          </p>
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
          {/* Today's Appointments */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>

            {todayAppointments.length > 0 ? (
              <div className="space-y-4">
                {todayAppointments.map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    patient={getPatientById(appointment.patientId)}
                    showPatient={true}
                    showDoctor={false}
                    actions={appointment.status === 'pending' ? [
                      {
                        label: 'Approve',
                        onClick: handleApprove,
                        className: 'bg-success-500 hover:bg-success-600 text-white'
                      },
                      {
                        label: 'Reject',
                        onClick: handleReject,
                        className: 'bg-error-500 hover:bg-error-600 text-white'
                      }
                    ] : []}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No appointments scheduled for today</p>
              </div>
            )}
          </div>

          {/* Pending Requests */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Pending Requests</h2>
              <span className="bg-warning-100 text-warning-600 px-2 py-1 rounded-full text-xs font-medium">
                {stats.pendingAppointments} pending
              </span>
            </div>

            {pendingAppointments.length > 0 ? (
              <div className="space-y-4">
                {pendingAppointments.map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    patient={getPatientById(appointment.patientId)}
                    showPatient={true}
                    showDoctor={false}
                    actions={[
                      {
                        label: 'Approve',
                        onClick: handleApprove,
                        className: 'bg-success-500 hover:bg-success-600 text-white'
                      },
                      {
                        label: 'Reject',
                        onClick: handleReject,
                        className: 'bg-error-500 hover:bg-error-600 text-white'
                      }
                    ]}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No pending requests</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          
          {recentAppointments.length > 0 ? (
            <div className="space-y-4">
              {recentAppointments.map(appointment => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  patient={getPatientById(appointment.patientId)}
                  showPatient={true}
                  showDoctor={false}
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

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-primary-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Ready to help more patients?</h3>
              <p className="text-primary-100">
                Manage your schedule, review patient records, and provide the best care possible.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <TrendingUp className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
