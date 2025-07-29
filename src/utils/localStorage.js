// localStorage utility functions
export const storage = {
  // Users
  getUsers: () => JSON.parse(localStorage.getItem('medcare_users') || '[]'),
  saveUser: (user) => {
    const users = storage.getUsers();
    const existingIndex = users.findIndex(u => u.email === user.email);
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem('medcare_users', JSON.stringify(users));
  },
  
  // Current user session
  getCurrentUser: () => JSON.parse(localStorage.getItem('medcare_current_user') || 'null'),
  setCurrentUser: (user) => localStorage.setItem('medcare_current_user', JSON.stringify(user)),
  clearCurrentUser: () => localStorage.removeItem('medcare_current_user'),
  
  // Appointments
  getAppointments: () => JSON.parse(localStorage.getItem('medcare_appointments') || '[]'),
  saveAppointment: (appointment) => {
    const appointments = storage.getAppointments();
    const existingIndex = appointments.findIndex(a => a.id === appointment.id);
    if (existingIndex >= 0) {
      appointments[existingIndex] = appointment;
    } else {
      appointments.push(appointment);
    }
    localStorage.setItem('medcare_appointments', JSON.stringify(appointments));
  },
  
  // Medical Records
  getMedicalRecords: () => JSON.parse(localStorage.getItem('medcare_medical_records') || '[]'),
  saveMedicalRecord: (record) => {
    const records = storage.getMedicalRecords();
    const existingIndex = records.findIndex(r => r.id === record.id);
    if (existingIndex >= 0) {
      records[existingIndex] = record;
    } else {
      records.push(record);
    }
    localStorage.setItem('medcare_medical_records', JSON.stringify(records));
  },
  
  // Doctor availability
  getDoctorAvailability: (doctorId) => {
    const availability = JSON.parse(localStorage.getItem('medcare_doctor_availability') || '{}');
    return availability[doctorId] || {};
  },
  saveDoctorAvailability: (doctorId, availability) => {
    const allAvailability = JSON.parse(localStorage.getItem('medcare_doctor_availability') || '{}');
    allAvailability[doctorId] = availability;
    localStorage.setItem('medcare_doctor_availability', JSON.stringify(allAvailability));
  }
};

// Initialize with sample data if empty
export const initializeSampleData = () => {
  // Import sample data
  import('../data/sampleData.js').then(({ sampleAppointments, sampleMedicalRecords }) => {
    if (storage.getAppointments().length === 0) {
      sampleAppointments.forEach(appointment => storage.saveAppointment(appointment));
    }
    if (storage.getMedicalRecords().length === 0) {
      sampleMedicalRecords.forEach(record => storage.saveMedicalRecord(record));
    }
  });
};
