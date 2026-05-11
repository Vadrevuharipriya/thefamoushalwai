import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import './AdminLayout.scss';

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAuthenticated(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin/login';
  };

  if (isAuthenticated === false) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (isAuthenticated === null) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <AdminSidebar onLogout={handleLogout} />
      <main className="admin-layout__content">
        {children}
      </main>
    </div>
  );
}
