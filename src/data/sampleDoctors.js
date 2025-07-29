// Sample doctors data
export const sampleDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    email: 'sarah.johnson@medcare.com',
    phone: '+1 (555) 123-4567',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    experience: '15 years',
    availability: {
      monday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
      tuesday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
      wednesday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
      thursday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
      friday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
    },
    bio: 'Specialized in cardiovascular diseases with over 15 years of experience in treating complex cardiac conditions.',
    credentials: ['MD', 'FACC', 'Board Certified Cardiologist']
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    email: 'michael.chen@medcare.com',
    phone: '+1 (555) 234-5678',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    experience: '12 years',
    availability: {
      monday: ['08:00', '09:00', '10:00', '13:00', '14:00'],
      tuesday: ['08:00', '09:00', '10:00', '13:00', '14:00'],
      wednesday: ['08:00', '09:00', '10:00', '13:00', '14:00'],
      thursday: ['08:00', '09:00', '10:00', '13:00', '14:00'],
      friday: ['08:00', '09:00', '10:00', '13:00', '14:00'],
    },
    bio: 'Expert in dermatological treatments, skin cancer detection, and cosmetic dermatology procedures.',
    credentials: ['MD', 'Board Certified Dermatologist']
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    email: 'emily.rodriguez@medcare.com',
    phone: '+1 (555) 345-6789',
    image: 'https://images.unsplash.com/photo-1594824804732-ca8bee6d5cca?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    experience: '10 years',
    availability: {
      monday: ['09:00', '10:00', '11:00', '15:00', '16:00'],
      tuesday: ['09:00', '10:00', '11:00', '15:00', '16:00'],
      wednesday: ['09:00', '10:00', '11:00', '15:00', '16:00'],
      thursday: ['09:00', '10:00', '11:00', '15:00', '16:00'],
      friday: ['09:00', '10:00', '11:00', '15:00', '16:00'],
    },
    bio: 'Dedicated pediatrician focusing on child development, immunizations, and family healthcare.',
    credentials: ['MD', 'Board Certified Pediatrician']
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    email: 'james.wilson@medcare.com',
    phone: '+1 (555) 456-7890',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
    rating: 4.6,
    experience: '18 years',
    availability: {
      monday: ['08:00', '09:00', '10:00', '14:00', '15:00'],
      tuesday: ['08:00', '09:00', '10:00', '14:00', '15:00'],
      wednesday: ['08:00', '09:00', '10:00', '14:00', '15:00'],
      thursday: ['08:00', '09:00', '10:00', '14:00', '15:00'],
      friday: ['08:00', '09:00', '10:00', '14:00', '15:00'],
    },
    bio: 'Orthopedic surgeon specializing in sports medicine, joint replacement, and trauma surgery.',
    credentials: ['MD', 'Board Certified Orthopedic Surgeon']
  }
];

// Hardcoded doctor accounts for login
export const doctorAccounts = [
  { email: 'sarah.johnson@medcare.com', password: 'doctor123', doctorId: '1' },
  { email: 'michael.chen@medcare.com', password: 'doctor123', doctorId: '2' },
  { email: 'emily.rodriguez@medcare.com', password: 'doctor123', doctorId: '3' },
  { email: 'james.wilson@medcare.com', password: 'doctor123', doctorId: '4' }
];

export const specialties = [
  'Cardiology',
  'Dermatology', 
  'Pediatrics',
  'Orthopedics',
  'Neurology',
  'Oncology',
  'Psychiatry',
  'General Medicine'
];
