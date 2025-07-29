import React, { useState } from 'react';
import { sampleDoctors, specialties } from '../../data/sampleDoctors';
import DoctorCard from '../../components/common/DoctorCard';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  ArrowLeft,
  Grid,
  List
} from 'lucide-react';

const DoctorFinder = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort doctors
  const filteredDoctors = sampleDoctors
    .filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleBookAppointment = (doctor) => {
    navigate('/book-appointment', { state: { selectedDoctor: doctor } });
  };

  const handleViewProfile = (doctor) => {
    // For now, just scroll to top - could implement modal later
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Find a Doctor</h1>
          <p className="mt-2 text-gray-600">Browse our network of trusted healthcare professionals</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Specialty Filter */}
            <div className="min-w-0 lg:w-48">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="input-field"
              >
                <option value="">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="min-w-0 lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
              >
                <option value="rating">Sort by Rating</option>
                <option value="experience">Sort by Experience</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-600">
              {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
              {selectedSpecialty && ` in ${selectedSpecialty}`}
            </p>
          </div>
        </div>

        {/* Doctors Grid/List */}
        {filteredDoctors.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'space-y-4'
          }>
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className={viewMode === 'list' ? 'max-w-none' : ''}>
                <DoctorCard
                  doctor={doctor}
                  onBookAppointment={handleBookAppointment}
                  onViewProfile={handleViewProfile}
                  showActions={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all available doctors.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty('');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {filteredDoctors.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-primary-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold">{sampleDoctors.length}+</div>
                <div className="text-primary-100">Qualified Doctors</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{specialties.length}</div>
                <div className="text-primary-100">Medical Specialties</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-primary-100">Average Rating</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorFinder;
