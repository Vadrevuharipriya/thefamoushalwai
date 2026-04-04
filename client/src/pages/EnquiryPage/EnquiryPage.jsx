import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import './EnquiryPage.scss';

const HERO_IMAGE = 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1600';
const WHATSAPP_URL = 'https://wa.me/918926262675?text=Hello! I am looking for a Halwai %26 Chefs?';

const LOCATIONS = [
  'Delhi NCR', 'Dehradun', 'Haridwar', 'Faridabad', 'Rishikesh',
  'Lucknow', 'Jaipur', 'Tehri Garhwal', 'Noida', 'Gurugram',
  'Ghaziabad', 'Yamunanagar', 'Chandigarh', 'Saharanpur',
];

const MEALS = ['Breakfast', 'Lunch', 'Evening Snacks', 'Dinner'];

// ─── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="eq-hero" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
      <div className="eq-hero__overlay" />
      <div className="eq-hero__content">
        <nav className="eq-hero__breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={13} />
          <span>Book Halwai &amp; Chefs</span>
        </nav>
        <h1 className="eq-hero__title">
          Book Halwai &amp; <span className="eq-hero__title-accent">Chefs</span>
        </h1>
        <p className="eq-hero__sub">
          Verified professionals at your doorstep — for every occasion, every cuisine.
        </p>
      </div>
    </section>
  );
}

// ─── Why Choose section badges ────────────────────────────────────────────────
const TRUST_BADGES = [
  { icon: '✅', label: 'Verified Professionals' },
  { icon: '🍽️', label: 'All Cuisines Covered' },
  { icon: '⏰', label: 'On-Time Guarantee' },
  { icon: '💰', label: 'Transparent Pricing' },
];

function TrustBar() {
  return (
    <div className="eq-trust-bar">
      {TRUST_BADGES.map((b) => (
        <div key={b.label} className="eq-trust-bar__item">
          <span className="eq-trust-bar__icon">{b.icon}</span>
          <span className="eq-trust-bar__label">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────
function EnquiryForm({ incomingPlate }) {
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    location: '',
    name: '',
    phone: '',
    email: '',
    date: '',
    meals: [],
  });
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill form when coming from ViewMenuCartPage
  useEffect(() => {
    if (incomingPlate && Object.keys(incomingPlate).length > 0) {
      // Optionally pre-fill any fields based on the plate
      // For now, we just acknowledge the plate was received
      console.log('Plate received from menu:', incomingPlate);
    }
  }, [incomingPlate]);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const toggleArray = (key, value) => {
    setForm((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="eq-success">
        <CheckCircle size={56} className="eq-success__icon" />
        <h2 className="eq-success__title">Enquiry Submitted!</h2>
        <p className="eq-success__msg">
          Thank you, <strong>{form.name}</strong>! Our customer representative will contact you shortly at{' '}
          <strong>{form.phone}</strong>.
        </p>
        <div className="eq-success__actions">
          <Link to="/" className="eq-success__btn eq-success__btn--primary">Back to Home</Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="eq-success__btn eq-success__btn--whatsapp">
            <MessageCircle size={17} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="eq-form" onSubmit={handleSubmit} noValidate>
      <p className="eq-form__subtitle">
        Please fill out your information below and our Customer Representative will contact you shortly.
      </p>

      {/* Row: Location + Date */}
      <div className="eq-form__row">
        <div className="eq-form__group">
          <label className="eq-form__label"><span className="eq-form__req">*</span> Select Location</label>
          <select
            className="eq-form__select"
            value={form.location}
            onChange={(e) => set('location', e.target.value)}
            required
          >
            <option value="">— Select Location * —</option>
            {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <div className="eq-form__group">
          <label className="eq-form__label"><span className="eq-form__req">*</span> Select Date</label>
          <input
            type="date"
            className="eq-form__input eq-form__input--date"
            min={today}
            value={form.date}
            onChange={(e) => set('date', e.target.value)}
            required
          />
        </div>
      </div>

      {/* Row: Name + Phone */}
      <div className="eq-form__row">
        <div className="eq-form__group">
          <label className="eq-form__label"><span className="eq-form__req">*</span> Full Name</label>
          <input
            type="text"
            className="eq-form__input"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            required
          />
        </div>

        <div className="eq-form__group">
          <label className="eq-form__label"><span className="eq-form__req">*</span> Mobile Number</label>
          <input
            type="tel"
            className="eq-form__input"
            placeholder="Mobile Number"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="eq-form__group">
        <label className="eq-form__label"><span className="eq-form__req">*</span> Email Address</label>
        <input
          type="email"
          className="eq-form__input"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          required
        />
      </div>

      {/* Meals */}
      <div className="eq-form__group">
        <label className="eq-form__label"><span className="eq-form__req">*</span> Select Meals</label>
        <div className="eq-toggle-group">
          {MEALS.map((meal) => (
            <button
              key={meal}
              type="button"
              className={`eq-toggle-btn ${form.meals.includes(meal) ? 'eq-toggle-btn--active' : ''}`}
              onClick={() => toggleArray('meals', meal)}
            >
              {meal}
            </button>
          ))}
        </div>
      </div>

      <div className="eq-form__footer">
        <button type="submit" className="eq-form__submit">
         Process Now
        </button>
        <p className="eq-form__privacy">
          🔒 Your details are safe with us. We never share your data.
        </p>
      </div>
    </form>
  );
}

// ─── Contact Aside ─────────────────────────────────────────────────────────────
function ContactAside() {
  return (
    <aside className="eq-aside">
      <div className="eq-aside__card">
        <span className="eq-aside__emoji">📞</span>
        <h3 className="eq-aside__title">Prefer to call?</h3>
        <p className="eq-aside__desc">Talk to our team directly and get a personalised quote in minutes.</p>
        <a href="tel:+918926262675" className="eq-aside__btn eq-aside__btn--red">
          <Phone size={16} /> +91-89262 62675
        </a>
        {/* <a href="tel:+918926262675" className="eq-aside__btn eq-aside__btn--outline">
          <Phone size={16} /> +91-89262 62675
        </a> */}
      </div>
      <div className="eq-aside__card eq-aside__card--whatsapp">
        <span className="eq-aside__emoji">💬</span>
        <h3 className="eq-aside__title eq-aside__title--white">Chat on WhatsApp</h3>
        <p className="eq-aside__desc eq-aside__desc--white">Get instant responses from our team via WhatsApp.</p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="eq-aside__btn eq-aside__btn--white">
          <MessageCircle size={16} /> Chat Now
        </a>
      </div>
      <div className="eq-aside__info">
        <h4 className="eq-aside__info-title">Serving Cities</h4>
        <div className="eq-aside__cities">
          {LOCATIONS.map((city) => (
            <span key={city} className="eq-aside__city-chip">{city}</span>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function EnquiryPage() {
  const location = useLocation();
  const incomingPlate = location.state?.plate || null;
  
  return (
    <div className="enquiry-page">
      <HeroSection />
      <TrustBar />
      <div className="eq-body">
        <div className="eq-body__inner">
          <div className="eq-body__left">
            <div className="eq-form-card">
              <h2 className="eq-form-card__heading">
                {incomingPlate ? 'Confirm Your Menu Selection' : 'Enquiry Now'}
              </h2>
              <EnquiryForm incomingPlate={incomingPlate} />
            </div>
          </div>
          <ContactAside />
        </div>
      </div>
    </div>
  );
}
