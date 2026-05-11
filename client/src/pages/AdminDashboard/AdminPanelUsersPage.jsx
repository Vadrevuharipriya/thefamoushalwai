import { useState, useEffect } from 'react';
import { 
  Search, Plus, Edit, Trash2, Eye, EyeOff, X, ChevronLeft, ChevronRight,
  RefreshCw
} from 'lucide-react';
import './AdminPanelUsers.scss';

export default function AdminPanelUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showPassword, setShowPassword] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', username: '', password: '', designation: '', status: 'Hold'
  });
  const limit = 20;

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter !== 'All' && { status: statusFilter })
      });
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:5000/api/admin/panel-user?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
        setTotalPages(data.pagination.pages);
      } else {
        setError(data.error || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Server error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, statusFilter, searchTerm]);

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({ name: '', phone: '', email: '', username: '', password: '', designation: '', status: 'Hold' });
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      phone: user.phone,
      email: user.email,
      username: user.username,
      password: '',
      designation: user.designation,
      status: user.status
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('adminToken');
    const url = editingUser 
      ? `http://localhost:5000/api/admin/panel-user/${editingUser._id}`
      : 'http://localhost:5000/api/admin/panel-user';
    const method = editingUser ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setModalOpen(false);
        fetchUsers();
      } else {
        setError(data.error || 'Operation failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setError('');
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/panel-user/${deleteConfirm._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setDeleteConfirm(null);
        fetchUsers();
      } else {
        setError(data.error || 'Delete failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const togglePasswordVisibility = (userId) => {
    setShowPassword(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Approve': 'badge-approve',
      'Non-Approve': 'badge-non-approve',
      'Hold': 'badge-hold'
    };
    return styles[status] || 'badge-hold';
  };

  return (
    <div className="admin-panel-users">
      <div className="admin-panel-users__header">
        <h1 className="admin-panel-users__title">Manage Panel Users</h1>
        <button className="btn btn--primary" onClick={openAddModal}>
          <Plus size={18} />
          <span>Add New User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="admin-panel-users__toolbar">
        <div className="admin-panel-users__filters">
          <div className="filter-group">
            {['All', 'Approve', 'Non-Approve', 'Hold'].map((status) => (
              <button
                key={status}
                className={`filter-btn ${statusFilter === status ? 'filter-btn--active' : ''}`}
                onClick={() => { setStatusFilter(status); setPage(1); }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="admin-panel-users__search">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      {/* Error message */}
      {error && <div className="admin-panel-users__error">{error}</div>}

      {/* Users Table */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Option</th>
              <th>Contact Name</th>
              <th>Mobile Phone</th>
              <th>Email Address</th>
              <th>Username</th>
              <th>Password</th>
              <th>Designation</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="loading-cell">
                  <RefreshCw size={24} className="spinner-icon" />
                  <span>Loading...</span>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-cell">No users found</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn action-btn--edit"
                        onClick={() => openEditModal(user)}
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="action-btn action-btn--delete"
                        onClick={() => setDeleteConfirm(user)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>
                    <div className="password-cell">
                      <span>{showPassword[user._id] ? user.password : '••••••••'}</span>
                      <button
                        className="password-toggle"
                        onClick={() => togglePasswordVisibility(user._id)}
                      >
                        {showPassword[user._id] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusBadge(user.status)}`}>
                      {user.designation}
                    </span>
                  </td>
                  <td>{formatDate(user.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            <ChevronLeft size={18} />
          </button>
          <span className="pagination-info">
            Page {page} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal__header">
              <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
              <button className="modal__close" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form className="modal__form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Contact Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Username *</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{editingUser ? 'New Password (leave blank to keep)' : 'Password *'}</label>
                  <input
                    type="text"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!editingUser}
                  />
                </div>
                <div className="form-group">
                  <label>Designation *</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Hold">Hold</option>
                  <option value="Approve">Approve</option>
                  <option value="Non-Approve">Non-Approve</option>
                </select>
              </div>
              <div className="modal__actions">
                <button type="button" className="btn btn--secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary">
                  {editingUser ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal modal--small" onClick={e => e.stopPropagation()}>
            <div className="modal__header">
              <h2>Confirm Delete</h2>
              <button className="modal__close" onClick={() => setDeleteConfirm(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal__body">
              <p>Are you sure you want to delete user <strong>{deleteConfirm.name}</strong>?</p>
              <p className="text-muted">This action cannot be undone.</p>
            </div>
            <div className="modal__actions">
              <button className="btn btn--secondary" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
              <button className="btn btn--danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
