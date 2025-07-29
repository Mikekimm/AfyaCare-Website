// Sample appointments data
export const sampleAppointments = [
  {
    id: '1',
    patientId: 'patient1',
    doctorId: '1',
    date: '2025-07-30',
    time: '10:00',
    reason: 'Regular checkup',
    status: 'pending',
    createdAt: '2025-07-29T10:00:00Z',
    notes: ''
  },
  {
    id: '2',
    patientId: 'patient1',
    doctorId: '2',
    date: '2025-08-01',
    time: '14:00',
    reason: 'Skin consultation',
    status: 'approved',
    createdAt: '2025-07-28T15:30:00Z',
    notes: 'Follow-up on previous treatment'
  }
];

// Sample medical records
export const sampleMedicalRecords = [
  {
    id: '1',
    patientId: 'patient1',
    doctorId: '1',
    appointmentId: '2',
    date: '2025-07-15',
    diagnosis: 'Hypertension',
    treatment: 'Prescribed ACE inhibitors, lifestyle modifications',
    notes: 'Patient shows good response to treatment. Blood pressure improved.',
    vitals: {
      bloodPressure: '130/85',
      heartRate: '72 bpm',
      temperature: '98.6°F',
      weight: '165 lbs'
    }
  },
  {
    id: '2',
    patientId: 'patient1',
    doctorId: '2',
    appointmentId: '1',
    date: '2025-07-20',
    diagnosis: 'Eczema',
    treatment: 'Topical corticosteroids, moisturizing routine',
    notes: 'Mild improvement observed. Continue current treatment for 2 weeks.',
    vitals: {
      temperature: '98.4°F',
      weight: '165 lbs'
    }
  }
];

export const appointmentStatuses = {
  pending: { label: 'Pending', color: 'bg-warning-100 text-warning-600' },
  approved: { label: 'Approved', color: 'bg-success-100 text-success-600' },
  cancelled: { label: 'Cancelled', color: 'bg-error-100 text-error-600' },
  completed: { label: 'Completed', color: 'bg-blue-100 text-blue-600' }
};
