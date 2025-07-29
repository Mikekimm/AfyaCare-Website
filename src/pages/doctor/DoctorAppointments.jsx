import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAppointments } from '../../hooks/useAppointments';
import { storage } from '../../utils/localStorage';
import { dateUtils } from '../../utils/validation';
import AppointmentCard from '../../components/common/AppointmentCard';
import { 
  Calendar, 
  Filter, 
  Search, 
  CheckCircle, 
  XCircle,
  Clock,
  User,
  ArrowLeft
} from 'lucide-react';

const DoctorAppointments = () => {
  const { user } = useAuth();
  const { appointments, loading, approveAppointment, cancelAppointment, completeAppointment } = useAppointments(user?.id, 'doctor');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const getPatientById = (patientId) => {
    const users = storage.getUsers();
    return users.find(user => user.id === patientId);
  };

  const filteredAppointments = appointments
    .filter(appointment => {
      const patient = getPatientById(appointment.patientId);
      const matchesSearch = patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           appointment.reason.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
      
      const today = new Date().toISOString().split('T')[0];
      const matchesDate = dateFilter === 'all' ||
                         (dateFilter === 'today' && appointment.date === today) ||
                         (dateFilter === 'upcoming' && appointment.date >= today) ||
                         (dateFilter === 'past' && appointment.date < today);
      
      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      const dateTimeA = new Date(a.date + 'T' + a.time);
      const dateTimeB = new Date(b.date + 'T' + b.time);
      return dateTimeB - dateTimeA;
    });

  const handleApprove = async (appointment) => {
    await approveAppointment(appointment.id);
  };

  const handleReject = async (appointment) => {
    await cancelAppointment(appointment.id);
  };

  const handleComplete = async (appointment) => {
    await completeAppointment(appointment.id);
  };

  const getActionButtons = (appointment) => {
    const actions = [];
    
    if (appointment.status === 'pending') {
      actions.push(
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
      );
    }
    
    if (appointment.status === 'approved' && dateUtils.isToday(appointment.date)) {
      actions.push({
        label: 'Complete',
        onClick: handleComplete,
        className: 'bg-blue-500 hover:bg-blue-600 text-white'
      });
    }
    
    return actions;
  };

  const statusCounts = {
    all: appointments.length,
    pending: appointments.filter(apt => apt.status === 'pending').length,
    approved: appointments.filter(apt => apt.status === 'approved').length,
    completed: appointments.filter(apt => apt.status === 'completed').length,
    cancelled: appointments.filter(apt => apt.status === 'cancelled').length
  };

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="mt-2 text-gray-600">
            Manage your appointment requests and patient bookings
          </p>
        </div>

        {/* Status Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            { key: 'all', label: 'All', color: 'bg-gray-100 text-gray-700' },
            { key: 'pending', label: 'Pending', color: 'bg-warning-100 text-warning-700' },
            { key: 'approved', label: 'Approved', color: 'bg-success-100 text-success-700' },
            { key: 'completed', label: 'Completed', color: 'bg-blue-100 text-blue-700' },
            { key: 'cancelled', label: 'Cancelled', color: 'bg-error-100 text-error-700' }
          ].map(status => (
            <button
              key={status.key}
              onClick={() => setStatusFilter(status.key)}
              className={`p-4 rounded-lg border-2 text-center transition-colors ${
                statusFilter === status.key
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`text-2xl font-bold mb-1 ${
                statusFilter === status.key ? 'text-primary-600' : 'text-gray-900'
              }`}>
                {statusCounts[status.key]}
              </div>
              <div className={`text-sm ${
                statusFilter === status.key ? 'text-primary-600' : 'text-gray-600'
              }`}>
                {status.label}
              </div>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by patient name or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="md:w-48">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        {filteredAppointments.length > 0 ? (
          <div className="space-y-4">
            {filteredAppointments.map(appointment => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                patient={getPatientById(appointment.patientId)}
                showPatient={true}
                showDoctor={false}
                actions={getActionButtons(appointment)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || statusFilter !== 'all' || dateFilter !== 'all' 
                ? 'No matching appointments found' 
                : 'No appointments yet'
              }
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                ? 'Try adjusting your search criteria or filters.'
                : 'Appointment requests will appear here when patients book with you.'
              }
            </p>
            {(searchTerm || statusFilter !== 'all' || dateFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setDateFilter('all');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Quick Actions */}
        {appointments.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-primary-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Manage Your Schedule</h3>
                <p className="text-primary-100">
                  {statusCounts.pending > 0 
                    ? `You have ${statusCounts.pending} pending appointment${statusCounts.pending !== 1 ? 's' : ''} waiting for your response.`
                    : 'All caught up! No pending appointments at the moment.'
                  }
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                  <Clock className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
