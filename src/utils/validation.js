// Validation utility functions
export const validation = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  phone: (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  },
  
  password: (password) => {
    return password.length >= 6;
  },
  
  required: (value) => {
    return value && value.toString().trim().length > 0;
  },
  
  name: (name) => {
    return name && name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
  }
};

// Date utility functions
export const dateUtils = {
  formatDate: (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },
  
  formatTime: (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  },
  
  isToday: (date) => {
    const today = new Date();
    const checkDate = new Date(date);
    return today.toDateString() === checkDate.toDateString();
  },
  
  isFuture: (date) => {
    return new Date(date) > new Date();
  },
  
  getDayOfWeek: (date) => {
    return new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  },
  
  addDays: (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
