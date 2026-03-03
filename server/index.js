import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import Enquiry from './models/Enquiry.js';

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
