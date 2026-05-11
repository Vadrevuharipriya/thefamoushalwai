import { NavLink } from 'react-router-dom';
import { Users, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import './AdminSidebar.scss';

export default function AdminSidebar({ onLogout }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__header">
        <h1 className="admin-sidebar__title">Admin Panel</h1>
      </div>

      <nav className="admin-sidebar__nav">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `admin-sidebar__link ${isActive ? 'admin-sidebar__link--active' : ''}`
          }
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/panel-user"
          className={({ isActive }) =>
            `admin-sidebar__link ${isActive ? 'admin-sidebar__link--active' : ''}`
          }
        >
          <Users size={18} />
          <span>Manage Panel Users</span>
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `admin-sidebar__link ${isActive ? 'admin-sidebar__link--active' : ''}`
          }
        >
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="admin-sidebar__footer">
        <button className="admin-sidebar__logout" onClick={onLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
