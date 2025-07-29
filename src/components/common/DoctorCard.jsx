import React from 'react';
import { Star, MapPin, Calendar, Phone } from 'lucide-react';

const DoctorCard = ({ doctor, onBookAppointment, onViewProfile, showActions = true }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 text-yellow-400 fill-current opacity-50" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start space-x-4">
        {/* Doctor Image */}
        <div className="flex-shrink-0">
          <img
            src={doctor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=2563eb&color=fff&size=80`}
            alt={doctor.name}
            className="h-20 w-20 rounded-full object-cover"
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {doctor.name}
              </h3>
              <p className="text-sm text-primary-600 font-medium">
                {doctor.specialty}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {doctor.experience} experience
              </p>
            </div>
            
            {/* Availability badge */}
            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success-600">
              Available
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 mt-2">
            <div className="flex">
              {renderStars(doctor.rating)}
            </div>
            <span className="text-sm text-gray-600">
              {doctor.rating}
            </span>
          </div>

          {/* Contact Info */}
          <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span>{doctor.phone}</span>
            </div>
          </div>

          {/* Bio */}
          {doctor.bio && (
            <p className="text-sm text-gray-600 mt-3 line-clamp-2">
              {doctor.bio}
            </p>
          )}

          {/* Credentials */}
          {doctor.credentials && (
            <div className="flex flex-wrap gap-1 mt-3">
              {doctor.credentials.map((credential, index) => (
                <span
                  key={index}
                  className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                >
                  {credential}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          {showActions && (
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => onBookAppointment?.(doctor)}
                className="flex-1 btn-primary text-sm py-2"
              >
                <Calendar className="h-4 w-4 mr-1 inline" />
                Book Appointment
              </button>
              <button
                onClick={() => onViewProfile?.(doctor)}
                className="btn-secondary text-sm py-2 px-3"
              >
                View Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
