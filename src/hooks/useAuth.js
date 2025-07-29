import { useState, useEffect } from 'react';
import { storage } from '../utils/localStorage';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = storage.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    try {
      if (role === 'doctor') {
        // Import doctor accounts
        const { doctorAccounts, sampleDoctors } = await import('../data/sampleDoctors');
        const doctorAccount = doctorAccounts.find(
          acc => acc.email === email && acc.password === password
        );
        
        if (doctorAccount) {
          const doctorProfile = sampleDoctors.find(doc => doc.id === doctorAccount.doctorId);
          const userData = {
            id: doctorAccount.doctorId,
            email: doctorAccount.email,
            role: 'doctor',
            profile: doctorProfile
          };
          storage.setCurrentUser(userData);
          setUser(userData);
          return { success: true };
        } else {
          return { success: false, error: 'Invalid doctor credentials' };
        }
      } else {
        // Patient login
        const users = storage.getUsers();
        const user = users.find(u => u.email === email && u.password === password && u.role === 'patient');
        
        if (user) {
          storage.setCurrentUser(user);
          setUser(user);
          return { success: true };
        } else {
          return { success: false, error: 'Invalid credentials' };
        }
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const register = (userData) => {
    try {
      const users = storage.getUsers();
      const existingUser = users.find(u => u.email === userData.email);
      
      if (existingUser) {
        return { success: false, error: 'Email already registered' };
      }
      
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        role: 'patient',
        createdAt: new Date().toISOString()
      };
      
      storage.saveUser(newUser);
      storage.setCurrentUser(newUser);
      setUser(newUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    storage.clearCurrentUser();
    setUser(null);
  };

  const updateProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      storage.saveUser(updatedUser);
      storage.setCurrentUser(updatedUser);
      setUser(updatedUser);
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isDoctor: user?.role === 'doctor',
    isPatient: user?.role === 'patient'
  };
};
