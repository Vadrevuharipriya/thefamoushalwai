import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Protect route - verify JWT token
export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided. Access denied.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token. Access denied.' });
  }
};

// Admin only middleware
export const requireAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided. Admin access required.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Fetch user from database to check role/isAdmin status
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // For now, treat all panel users as admins
    // In future, you can add an isAdmin field to the User model
    req.user = { id: user._id, username: user.username, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token. Admin access required.' });
  }
};

export { JWT_SECRET };
