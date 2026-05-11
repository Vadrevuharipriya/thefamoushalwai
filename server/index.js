import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import Enquiry from './models/Enquiry.js';
import User from './models/User.js';
import { protect, requireAdmin, JWT_SECRET } from './middleware/auth.js';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
await connectDB();

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'The Famous Halwai API is running' });
});

// Enquiry endpoint
app.post('/api/enquiry', async (req, res) => {
  const { name, phone, email, service, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }
  try {
    const enquiry = await Enquiry.create({ name, phone, email, service, message });
    console.log('New enquiry saved:', enquiry._id);
    res.json({ success: true, message: 'Enquiry received! We will contact you soon.' });
  } catch (err) {
    console.error('Enquiry save error:', err.message);
    res.status(500).json({ error: 'Failed to save enquiry' });
  }
});

// Get all enquiries (admin use)
app.get('/api/enquiries', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

// ─── Google Reviews ────────────────────────────────────────────────────────────
let reviewCache = null;
let reviewCacheTime = 0;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

app.get('/api/reviews', async (req, res) => {
  try {
    const { GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID } = process.env;

    // Serve from cache if fresh
    if (reviewCache && Date.now() - reviewCacheTime < CACHE_TTL) {
      return res.json(reviewCache);
    }

    if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
      return res.status(503).json({ error: 'Google Places API not configured' });
    }

    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${GOOGLE_PLACE_ID}` +
      `&fields=name,rating,reviews,user_ratings_total` +
      `&reviews_sort=newest` +
      `&key=${GOOGLE_PLACES_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Places API error:', data.status, data.error_message);
      return res.status(500).json({ error: 'Failed to fetch reviews from Google' });
    }

    const result = {
      rating: data.result.rating,
      totalReviews: data.result.user_ratings_total,
      reviews: (data.result.reviews || []).map((r) => ({
        author_name: r.author_name,
        author_url: r.author_url,
        profile_photo_url: r.profile_photo_url,
        rating: r.rating,
        relative_time_description: r.relative_time_description,
        text: r.text,
        time: r.time,
      })),
    };

    reviewCache = result;
    reviewCacheTime = Date.now();

    res.json(result);
  } catch (err) {
    console.error('Reviews endpoint error:', err);
    res.status(500).json({ error: 'Internal server error' });
   }
 });

// ─── Admin Authentication ──────────────────────────────────────────────────────
// Admin login - get JWT token
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        designation: user.designation,
        status: user.status
      }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// ─── Admin Panel Users CRUD ────────────────────────────────────────────────────
// Get all panel users (with optional status filter and search)
app.get('/api/admin/panel-user', requireAdmin, async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error('Fetch users error:', err.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create a new panel user
app.post('/api/admin/panel-user', requireAdmin, async (req, res) => {
  const { name, phone, email, username, password, designation, status } = req.body;

  if (!name || !phone || !email || !username || !password || !designation) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if user with same email or username exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        error: existingUser.email === email ? 'Email already exists' : 'Username already exists'
      });
    }

    const user = await User.create({
      name,
      phone,
      email,
      username,
      password,
      designation,
      status: status || 'Hold'
    });

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(201).json({ success: true, user: userWithoutPassword });
  } catch (err) {
    console.error('Create user error:', err.message);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update a panel user
app.put('/api/admin/panel-user/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, username, password, designation, status } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (email) user.email = email;
    if (username) user.username = username;
    if (password) user.password = password; // Will be hashed by pre-save hook
    if (designation) user.designation = designation;
    if (status) user.status = status;

    await user.save();

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({ success: true, user: userWithoutPassword });
  } catch (err) {
    console.error('Update user error:', err.message);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete a panel user
app.delete('/api/admin/panel-user/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete user error:', err.message);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
