import { Users, FileText, TrendingUp, Settings } from 'lucide-react';
import './AdminDashboard.scss';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard__title">Dashboard</h1>
      <p className="admin-dashboard__subtitle">Welcome to The Famous Halwai Admin Panel</p>

      <div className="admin-dashboard__stats">
        <div className="stat-card">
          <div className="stat-card__icon">
            <Users size={28} />
          </div>
          <div className="stat-card__info">
            <h3>Panel Users</h3>
            <p className="stat-card__value">Manage admin users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--blue">
            <FileText size={28} />
          </div>
          <div className="stat-card__info">
            <h3>Enquiries</h3>
            <p className="stat-card__value">View customer enquiries</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--green">
            <TrendingUp size={28} />
          </div>
          <div className="stat-card__info">
            <h3>Analytics</h3>
            <p className="stat-card__value">View insights</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--orange">
            <Settings size={28} />
          </div>
          <div className="stat-card__info">
            <h3>Settings</h3>
            <p className="stat-card__value">Configure system</p>
          </div>
        </div>
      </div>
    </div>
  );
}
