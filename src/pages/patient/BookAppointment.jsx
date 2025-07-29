import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppointments } from '../../hooks/useAppointments';
import { sampleDoctors, specialties } from '../../data/sampleDoctors';
import { dateUtils, generateId } from '../../utils/validation';
import DoctorCard from '../../components/common/DoctorCard';
import { 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Check,
  ArrowLeft
} from 'lucide-react';

const BookAppointment = () => {
  const { user } = useAuth();
  const { bookAppointment } = useAppointments(user?.id, 'patient');
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);

  const filteredDoctors = selectedSpecialty 
    ? sampleDoctors.filter(doc => doc.specialty === selectedSpecialty)
    : sampleDoctors;

  // Generate available dates (next 30 days, excluding weekends)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = dateUtils.addDays(today, i);
      const dayOfWeek = date.getDay();
      
      // Exclude weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    
    return dates;
  };

  // Update available times when doctor and date change
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const dayOfWeek = dateUtils.getDayOfWeek(selectedDate);
      const doctorAvailability = selectedDoctor.availability[dayOfWeek] || [];
      setAvailableTimes(doctorAvailability);
    }
  }, [selectedDoctor, selectedDate]);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !reason.trim()) {
      return;
    }

    setLoading(true);

    const appointmentData = {
      patientId: user.id,
      doctorId: selectedDoctor.id,
      date: selectedDate,
      time: selectedTime,
      reason: reason.trim()
    };

    const result = await bookAppointment(appointmentData);
    
    if (result.success) {
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  const steps = [
    { number: 1, title: 'Choose Specialty', completed: currentStep > 1 },
    { number: 2, title: 'Select Doctor', completed: currentStep > 2 },
    { number: 3, title: 'Pick Date & Time', completed: currentStep > 3 },
    { number: 4, title: 'Confirm Details', completed: false }
  ];

  const canProceedFromStep1 = selectedSpecialty;
  const canProceedFromStep2 = selectedDoctor;
  const canProceedFromStep3 = selectedDate && selectedTime;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Book an Appointment</h1>
          <p className="mt-2 text-gray-600">Follow the steps below to schedule your appointment</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.completed 
                    ? 'bg-success-500 text-white'
                    : currentStep === step.number 
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.completed ? <Check className="h-5 w-5" /> : step.number}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step.completed || currentStep === step.number 
                    ? 'text-gray-900' 
                    : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    step.completed ? 'bg-success-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          {/* Step 1: Choose Specialty */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose a Specialty</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {specialties.map(specialty => (
                  <button
                    key={specialty}
                    onClick={() => setSelectedSpecialty(specialty)}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      selectedSpecialty === specialty
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{specialty}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Doctor */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Select a Doctor {selectedSpecialty && `(${selectedSpecialty})`}
              </h2>
              <div className="space-y-4">
                {filteredDoctors.map(doctor => (
                  <div 
                    key={doctor.id}
                    className={`border-2 rounded-lg ${
                      selectedDoctor?.id === doctor.id 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="p-4">
                      <DoctorCard 
                        doctor={doctor} 
                        showActions={false}
                      />
                      <button
                        onClick={() => setSelectedDoctor(doctor)}
                        className={`mt-4 w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                          selectedDoctor?.id === doctor.id
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {selectedDoctor?.id === doctor.id ? 'Selected' : 'Select Doctor'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Pick Date & Time */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Pick Date & Time with Dr. {selectedDoctor?.name}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Date Selection */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Select Date</h3>
                  <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
                    {getAvailableDates().map(date => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 rounded-lg border text-left transition-colors ${
                          selectedDate === date
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{dateUtils.formatDate(date)}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Available Times
                    {selectedDate && (
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        for {dateUtils.formatDate(selectedDate)}
                      </span>
                    )}
                  </h3>
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-2">
                      {availableTimes.length > 0 ? (
                        availableTimes.map(time => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-lg border text-center transition-colors ${
                              selectedTime === time
                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {dateUtils.formatTime(time)}
                          </button>
                        ))
                      ) : (
                        <div className="col-span-2 text-center py-8 text-gray-500">
                          No available times for this date
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Please select a date first
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirm Details */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Confirm Your Appointment</h2>
              
              <div className="space-y-6">
                {/* Appointment Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Appointment Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Doctor:</span>
                      <span className="font-medium">Dr. {selectedDoctor?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Specialty:</span>
                      <span className="font-medium">{selectedDoctor?.specialty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{dateUtils.formatDate(selectedDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{dateUtils.formatTime(selectedTime)}</span>
                    </div>
                  </div>
                </div>

                {/* Reason for Visit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Visit *
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows="4"
                    className="input-field resize-none"
                    placeholder="Please describe the reason for your visit..."
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="flex items-center px-6 py-3 text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNextStep}
              disabled={
                (currentStep === 1 && !canProceedFromStep1) ||
                (currentStep === 2 && !canProceedFromStep2) ||
                (currentStep === 3 && !canProceedFromStep3)
              }
              className="flex items-center btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleBookAppointment}
              disabled={loading || !reason.trim()}
              className="flex items-center btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Booking...
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
