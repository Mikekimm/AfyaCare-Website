import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { storage } from '../../utils/localStorage';
import { sampleDoctors } from '../../data/sampleDoctors';
import { dateUtils } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  User, 
  Download, 
  Search,
  ArrowLeft,
  Activity,
  Heart,
  Thermometer,
  Scale
} from 'lucide-react';

const MedicalRecords = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedicalRecords();
  }, [user]);

  const loadMedicalRecords = () => {
    try {
      const records = storage.getMedicalRecords();
      const userRecords = records.filter(record => record.patientId === user?.id);
      setMedicalRecords(userRecords);
    } catch (error) {
      console.error('Error loading medical records:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDoctorById = (doctorId) => {
    return sampleDoctors.find(doc => doc.id === doctorId);
  };

  const uniqueDoctors = [...new Set(medicalRecords.map(record => record.doctorId))]
    .map(doctorId => getDoctorById(doctorId))
    .filter(Boolean);

  const filteredRecords = medicalRecords
    .filter(record => {
      const doctor = getDoctorById(record.doctorId);
      const matchesSearch = record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           record.treatment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor?.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDoctor = !selectedDoctor || record.doctorId === selectedDoctor;
      return matchesSearch && matchesDoctor;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleDownloadRecord = (record) => {
    const doctor = getDoctorById(record.doctorId);
    const content = `
MEDICAL RECORD
==============

Patient: ${user.name}
Doctor: Dr. ${doctor?.name}
Date: ${dateUtils.formatDate(record.date)}

DIAGNOSIS:
${record.diagnosis}

TREATMENT:
${record.treatment}

NOTES:
${record.notes}

${record.vitals ? `
VITALS:
${Object.entries(record.vitals).map(([key, value]) => `${key}: ${value}`).join('\n')}
` : ''}

Generated on: ${new Date().toLocaleString()}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medical-record-${record.date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
          <p className="mt-2 text-gray-600">View your complete medical history and records</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search records by diagnosis, treatment, or doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="min-w-0 lg:w-64">
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="input-field"
              >
                <option value="">All Doctors</option>
                {uniqueDoctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>Dr. {doctor.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Records List */}
        {filteredRecords.length > 0 ? (
          <div className="space-y-6">
            {filteredRecords.map(record => {
              const doctor = getDoctorById(record.doctorId);
              return (
                <div key={record.id} className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <FileText className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{record.diagnosis}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <User className="h-4 w-4 mr-1" />
                          <span>Dr. {doctor?.name}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{dateUtils.formatDate(record.date)}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadRecord(record)}
                      className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Treatment */}
                    <div className="lg:col-span-2">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Treatment</h4>
                          <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{record.treatment}</p>
                        </div>
                        {record.notes && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Doctor's Notes</h4>
                            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{record.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Vitals */}
                    {record.vitals && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Vitals</h4>
                        <div className="space-y-3">
                          {record.vitals.bloodPressure && (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Activity className="h-4 w-4 text-red-500 mr-2" />
                                <span className="text-sm text-gray-600">Blood Pressure</span>
                              </div>
                              <span className="text-sm font-medium">{record.vitals.bloodPressure}</span>
                            </div>
                          )}
                          {record.vitals.heartRate && (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Heart className="h-4 w-4 text-red-500 mr-2" />
                                <span className="text-sm text-gray-600">Heart Rate</span>
                              </div>
                              <span className="text-sm font-medium">{record.vitals.heartRate}</span>
                            </div>
                          )}
                          {record.vitals.temperature && (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Thermometer className="h-4 w-4 text-orange-500 mr-2" />
                                <span className="text-sm text-gray-600">Temperature</span>
                              </div>
                              <span className="text-sm font-medium">{record.vitals.temperature}</span>
                            </div>
                          )}
                          {record.vitals.weight && (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Scale className="h-4 w-4 text-blue-500 mr-2" />
                                <span className="text-sm text-gray-600">Weight</span>
                              </div>
                              <span className="text-sm font-medium">{record.vitals.weight}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {medicalRecords.length === 0 ? 'No medical records yet' : 'No records match your search'}
              </h3>
              <p className="text-gray-600 mb-6">
                {medicalRecords.length === 0 
                  ? 'Your medical records will appear here after your appointments.'
                  : 'Try adjusting your search criteria to find specific records.'
                }
              </p>
              {medicalRecords.length === 0 ? (
                <button
                  onClick={() => navigate('/book-appointment')}
                  className="btn-primary"
                >
                  Book Your First Appointment
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedDoctor('');
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Summary Stats */}
        {medicalRecords.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-primary-500 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-semibold mb-4">Health Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{medicalRecords.length}</div>
                <div className="text-primary-100">Total Records</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{uniqueDoctors.length}</div>
                <div className="text-primary-100">Doctors Consulted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {medicalRecords.length > 0 ? dateUtils.formatDate(medicalRecords[0].date) : 'N/A'}
                </div>
                <div className="text-primary-100">Last Visit</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
