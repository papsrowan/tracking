'use client';

import { useState, useEffect } from 'react';
import { AdminLogin } from '@/components/AdminLogin';
import { AdminDashboard } from '@/components/AdminDashboard';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    // Check if admin is already logged in
    const auth = localStorage.getItem('adminAuth');
    if (auth) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    // Simple validation - in production, this should call the backend
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminAuth', JSON.stringify({ username, password }));
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Identifiants incorrects. Utilisez: admin / admin123');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} error={loginError} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
