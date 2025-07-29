import { useState, useEffect } from 'react';
import { storage } from '../utils/localStorage';
import { generateId } from '../utils/validation';

export const useAppointments = (userId, userRole) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, [userId, userRole]);

  const loadAppointments = () => {
    try {
      const allAppointments = storage.getAppointments();
      let filteredAppointments = [];

      if (userRole === 'patient') {
        filteredAppointments = allAppointments.filter(apt => apt.patientId === userId);
      } else if (userRole === 'doctor') {
        filteredAppointments = allAppointments.filter(apt => apt.doctorId === userId);
      }

      setAppointments(filteredAppointments);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const bookAppointment = async (appointmentData) => {
    try {
      const newAppointment = {
        id: generateId(),
        ...appointmentData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      storage.saveAppointment(newAppointment);
      loadAppointments();
      
      return { success: true, appointment: newAppointment };
    } catch (error) {
      return { success: false, error: 'Failed to book appointment' };
    }
  };

  const updateAppointmentStatus = async (appointmentId, status, notes = '') => {
    try {
      const allAppointments = storage.getAppointments();
      const appointmentIndex = allAppointments.findIndex(apt => apt.id === appointmentId);
      
      if (appointmentIndex >= 0) {
        allAppointments[appointmentIndex] = {
          ...allAppointments[appointmentIndex],
          status,
          notes,
          updatedAt: new Date().toISOString()
        };
        
        localStorage.setItem('medcare_appointments', JSON.stringify(allAppointments));
        loadAppointments();
        
        return { success: true };
      }
      
      return { success: false, error: 'Appointment not found' };
    } catch (error) {
      return { success: false, error: 'Failed to update appointment' };
    }
  };

  const cancelAppointment = async (appointmentId) => {
    return updateAppointmentStatus(appointmentId, 'cancelled');
  };

  const approveAppointment = async (appointmentId) => {
    return updateAppointmentStatus(appointmentId, 'approved');
  };

  const completeAppointment = async (appointmentId, notes = '') => {
    return updateAppointmentStatus(appointmentId, 'completed', notes);
  };

  // Get appointments by status
  const getAppointmentsByStatus = (status) => {
    return appointments.filter(apt => apt.status === status);
  };

  // Get today's appointments
  const getTodayAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === today);
  };

  // Get upcoming appointments
  const getUpcomingAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.date >= today && apt.status !== 'cancelled');
  };

  return {
    appointments,
    loading,
    bookAppointment,
    updateAppointmentStatus,
    cancelAppointment,
    approveAppointment,
    completeAppointment,
    getAppointmentsByStatus,
    getTodayAppointments,
    getUpcomingAppointments,
    refresh: loadAppointments
  };
};
