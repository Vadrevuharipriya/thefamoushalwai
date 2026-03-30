import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, CheckCircle, TrendingUp, Users, Briefcase,
  Star, Clock, HeartHandshake, BarChart3, Phone, MessageCircle,
  ArrowRight, ShieldCheck, Zap, Gift,
} from 'lucide-react';
import './PartnerPage.scss';

const HERO_IMAGE = 'https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=1600';
const STORY_IMAGE = 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800';
const WHATSAPP_URL = 'https://wa.me/918926262674?text=Hello! I am interested in becoming a partner.';

const BENEFITS = [
  { icon: TrendingUp,    title: 'Establish Faster',         desc: 'Skip the long setup curve. Our network, brand and processes fast-track your business launch.' },
  { icon: Users,         title: 'Wide Customer Base',       desc: 'Tap into our existing clientele across Delhi NCR — weddings, corporate events and more.' },
  { icon: Briefcase,     title: 'Full Backend Support',     desc: 'Staffing, training, marketing and sales acquisition — we handle the hard parts for you.' },
  { icon: BarChart3,     title: 'More Leads & Revenue',     desc: 'Receive qualified leads directly from our platform and convert them into recurring income.' },
  { icon: Star,          title: 'Higher Success Rate',      desc: 'Partners backed by The Famous Halwai brand enjoy significantly higher event win rates.' },
  { icon: HeartHandshake,'title': 'Transparent Partnership','desc': 'Zero hidden charges. Clear revenue sharing and complete transparency at every step.' },
  { icon: Clock,         title: 'Flexible Working Hours',   desc: 'Choose the events and schedule that work for you. Complete freedom over your workload.' },
];

const STEPS = [
  { step: '01', icon: ShieldCheck, title: 'Keep Documents Ready',   desc: 'Ensure you have your identity proof, address proof and any relevant certifications handy.' },
  { step: '02', icon: Zap,         title: 'Fill Registration Form', desc: 'Complete the short form below with your name, contact, city and area of expertise.' },
  { step: '03', icon: Gift,        title: 'We Get Back to You',     desc: 'Our team will review your profile and contact you within 24 hours to move forward.' },
];

const SERVICE_TYPES = ['Halwai / Cook', 'Chef', 'Full Caterer', 'Cloud Kitchen', 'Venue Partner', 'Other'];
const EXPERIENCE_OPTIONS = ['Less than 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years'];
const CITIES = [
  'Delhi NCR', 'Noida', 'Gurugram', 'Faridabad', 'Ghaziabad',
  'Dehradun', 'Haridwar', 'Rishikesh', 'Lucknow', 'Jaipur',
  'Tehri Garhwal', 'Yamunanagar', 'Chandigarh', 'Saharanpur',
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="pp-hero" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
      <div className="pp-hero__overlay" />
      <div className="pp-hero__content">
        <nav className="pp-hero__breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={13} />
          <span>Partner Programme</span>
        </nav>
        <div className="pp-hero__badge">🤝 Partner Programme</div>
        <h1 className="pp-hero__title">
          Grow Your Business<br />
          With <span className="pp-hero__accent">The Famous Halwai</span>
        </h1>
        <p className="pp-hero__sub">
          Zero investment. Maximum support. Join 500+ verified chefs, halwais &amp; caterers already thriving on our platform.
        </p>
        <div className="pp-hero__actions">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="pp-hero__cta pp-hero__cta--ghost">
            <MessageCircle size={16} /> Chat with Us
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Stats strip ──────────────────────────────────────────────────────────────
const STATS = [
  { value: '500+', label: 'Active Partners' },
  { value: '15+',  label: 'Cities Covered' },
  { value: '₹0',   label: 'Investment Required' },
  { value: '24hr', label: 'Onboarding Time' },
];

function StatsStrip() {
  return (
    <div className="pp-stats">
      {STATS.map((s) => (
        <div key={s.label} className="pp-stats__item">
          <p className="pp-stats__value">{s.value}</p>
          <p className="pp-stats__label">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Intro / pitch ────────────────────────────────────────────────────────────
function IntroSection() {
  return (
    <section className="pp-intro">
      <div className="pp-intro__inner">
        <div className="pp-intro__text">
          <div className="section-tag">📖 Why Partner With Us</div>
          <h2 className="pp-intro__heading">
            Realise Your Dream of<br />
            <span className="text-brand-red">Becoming an Entrepreneur</span>
          </h2>
          <p className="pp-intro__para">
            The Famous Halwai is inviting spirited and ambitious investors, professionals and aspirants to join our growing partner network. Start your own business with the backing of Delhi NCR's most trusted catering brand.
          </p>
          <p className="pp-intro__para">
            This is an incredible franchising opportunity that enables you to boost your revenue and experience a variety of events. We provide complete backend support — from training and staffing to marketing and sales acquisition.
          </p>
          <ul className="pp-intro__checklist">
            {[
              'Zero investment required to get started',
              'Flexible working hours — you choose your schedule',
              'Complete backend support from day one',
              'Maximum benefits, profits and lead generation',
            ].map((item) => (
              <li key={item} className="pp-intro__check-item">
                <CheckCircle size={16} className="pp-intro__check-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="pp-intro__image-wrap">
          <img src={STORY_IMAGE} alt="Partner team collaboration" className="pp-intro__image" />
          <div className="pp-intro__image-badge">
            <HeartHandshake size={20} className="text-brand-gold" />
            <div>
              <p className="font-heading font-black text-white text-sm">500+ Partners</p>
              <p className="font-body text-white/70 text-xs">Already thriving</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Benefits ─────────────────────────────────────────────────────────────────
function BenefitsSection() {
  return (
    <section className="pp-benefits">
      <div className="pp-section-inner">
        <div className="text-center mb-12">
          <div className="section-tag mx-auto">⭐ Benefits</div>
          <h2 className="font-heading font-black text-3xl md:text-4xl text-dark mt-2">
            Benefits of <span className="text-brand-red">Franchising With Us</span>
          </h2>
          <p className="font-body text-gray-500 mt-3 max-w-lg mx-auto text-sm">
            Everything you need to run a successful catering business — we provide it all.
          </p>
        </div>
        <div className="pp-benefits__grid">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="pp-benefit-card">
              <div className="pp-benefit-card__icon-wrap">
                <Icon size={22} />
              </div>
              <h3 className="pp-benefit-card__title">{title}</h3>
              <p className="pp-benefit-card__desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorksSection() {
  return (
    <section className="pp-how">
      <div className="pp-section-inner">
        <div className="text-center mb-12">
          <div className="section-tag mx-auto" style={{ color: '#fff', background: 'rgba(255,255,255,0.12)' }}>
            🗺️ Process
          </div>
          <h2 className="font-heading font-black text-3xl md:text-4xl text-white mt-2">
            Partner Registration <span className="text-brand-gold">In 3 Steps</span>
          </h2>
        </div>
        <div className="pp-how__grid">
          {STEPS.map(({ step, icon: Icon, title, desc }) => (
            <div key={step} className="pp-how-card">
              <div className="pp-how-card__step">{step}</div>
              <div className="pp-how-card__icon-wrap">
                <Icon size={26} />
              </div>
              <h3 className="pp-how-card__title">{title}</h3>
              <p className="pp-how-card__desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Registration Form ────────────────────────────────────────────────────────
function RegistrationForm() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', city: '',
    serviceType: '', experience: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pp-success">
        <CheckCircle size={56} className="pp-success__icon" />
        <h3 className="pp-success__title">Registration Received!</h3>
        <p className="pp-success__msg">
          Thank you, <strong>{form.name}</strong>! Our team will reach out to you at <strong>{form.phone}</strong> within 24 hours.
        </p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="pp-success__wa">
          <MessageCircle size={17} /> Speed things up on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form className="pp-reg-form" onSubmit={handleSubmit} noValidate>
      <div className="pp-reg-form__row">
        <div className="pp-reg-form__group">
          <label className="pp-reg-form__label"><span className="pp-req">*</span> Full Name</label>
          <input type="text" className="pp-reg-form__input" placeholder="Your Full Name"
            value={form.name} onChange={(e) => set('name', e.target.value)} required />
        </div>
        <div className="pp-reg-form__group">
          <label className="pp-reg-form__label"><span className="pp-req">*</span> Mobile Number</label>
          <input type="tel" className="pp-reg-form__input" placeholder="eg. 98xxxxxx10"
            value={form.phone} onChange={(e) => set('phone', e.target.value)} required />
        </div>
      </div>

      <div className="pp-reg-form__row">
        <div className="pp-reg-form__group">
          <label className="pp-reg-form__label"><span className="pp-req">*</span> Email Address</label>
          <input type="email" className="pp-reg-form__input" placeholder="Email Address"
            value={form.email} onChange={(e) => set('email', e.target.value)} required />
        </div>
        <div className="pp-reg-form__group">
          <label className="pp-reg-form__label"><span className="pp-req">*</span> Your City</label>
          <select className="pp-reg-form__select" value={form.city}
            onChange={(e) => set('city', e.target.value)} required>
            <option value="">— Select City —</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="pp-reg-form__row">
        <div className="pp-reg-form__group">
          <label className="pp-reg-form__label"><span className="pp-req">*</span> Service Type</label>
          <select className="pp-reg-form__select" value={form.serviceType}
            onChange={(e) => set('serviceType', e.target.value)} required>
            <option value="">— Select Type —</option>
            {SERVICE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="pp-reg-form__group">
          <label className="pp-reg-form__label"><span className="pp-req">*</span> Years of Experience</label>
          <select className="pp-reg-form__select" value={form.experience}
            onChange={(e) => set('experience', e.target.value)} required>
            <option value="">— Select Experience —</option>
            {EXPERIENCE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <div className="pp-reg-form__group">
        <label className="pp-reg-form__label">Tell Us About Yourself <span className="pp-optional">(optional)</span></label>
        <textarea className="pp-reg-form__textarea" rows={4}
          placeholder="Briefly describe your experience, specialties, or any questions you have…"
          value={form.message} onChange={(e) => set('message', e.target.value)} />
      </div>

      <div className="pp-reg-form__footer">
        <button type="submit" className="pp-reg-form__submit">
          Submit Registration <ArrowRight size={16} />
        </button>
        <p className="pp-reg-form__privacy">🔒 Your details are safe with us. We never share your data.</p>
      </div>
    </form>
  );
}

function RegisterSection() {
  return (
    <section className="pp-register" id="register">
      <div className="pp-section-inner">
        <div className="pp-register__grid">
          <div className="pp-register__card">
            <div className="pp-register__card-head">
              <span className="pp-register__card-emoji">📋</span>
              <div>
                <h2 className="pp-register__card-title">Partner Registration</h2>
                <p className="pp-register__card-sub">Fill in your details and we'll get back to you within 24 hours.</p>
              </div>
            </div>
            <RegistrationForm />
          </div>

          <aside className="pp-register__aside">
            <div className="pp-register__aside-card">
              <span className="text-3xl">📞</span>
              <h4 className="pp-register__aside-title">Prefer to call?</h4>
              <p className="pp-register__aside-desc">Talk to our partnership team directly and get all your questions answered.</p>
              <a href="tel:+918926262674" className="pp-register__aside-btn pp-register__aside-btn--red">
                <Phone size={15} /> +91-89262 62674
              </a>
              <a href="tel:+918926262675" className="pp-register__aside-btn pp-register__aside-btn--outline">
                <Phone size={15} /> +91-89262 62675
              </a>
            </div>
            <div className="pp-register__aside-card pp-register__aside-card--wa">
              <span className="text-3xl">💬</span>
              <h4 className="pp-register__aside-title pp-register__aside-title--white">Chat on WhatsApp</h4>
              <p className="pp-register__aside-desc pp-register__aside-desc--white">Get instant response from our partnership team.</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="pp-register__aside-btn pp-register__aside-btn--white">
                <MessageCircle size={15} /> Chat Now
              </a>
            </div>
            <div className="pp-register__trust">
              <h4 className="pp-register__trust-title">Why partners love us</h4>
              {[
                'Zero upfront investment',
                'Leads delivered to your profile',
                'Dedicated support manager',
                'Weekly payouts & transparent billing',
              ].map((item) => (
                <div key={item} className="pp-register__trust-item">
                  <CheckCircle size={14} className="text-brand-red flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Strip ────────────────────────────────────────────────────────────────
function CTAStrip() {
  return (
    <section className="pp-cta">
      <div className="pp-cta__inner">
        <h2 className="font-heading font-black text-2xl md:text-3xl text-white text-center">
          Join Our Growing Partner Network
        </h2>
      </div>
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PartnerPage() {
  return (
    <div className="partner-page">
      <HeroSection />
      <StatsStrip />
      <IntroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <RegisterSection />
      <CTAStrip />
    </div>
  );
}
