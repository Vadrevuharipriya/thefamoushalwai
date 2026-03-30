import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingCart, CheckCircle, MessageCircle, Phone, X } from 'lucide-react';
import './ChutneysPage.scss';

const HERO_IMAGE = 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=1600';
const WHATSAPP_URL = 'https://wa.me/918926262674?text=Hello! I am interested in Chutney Services.';
const ITEMS_BASE_URL = 'https://www.thefamoushalwai.com/frontEnd/items/';

const CHUTNEY_ITEMS = [
  { id: 28, name: 'Tomato Chutney',                     price: 399 },
  { id: 29, name: 'Mint Peanut Chutney',                price: 399 },
  { id: 30, name: 'Coconut Chutney',                    price: 399 },
  { id: 31, name: 'Coriander Coconut Chutney',          price: 399 },
  { id: 32, name: 'Tomato Thokku',                      price: 399 },
  { id: 33, name: 'Peanut / Groundnut Chutney',         price: 399 },
  { id: 34, name: 'Moringa Leaves Chutney',             price: 499 },
  { id: 35, name: 'Green Tomato Chutney',               price: 499 },
  { id: 36, name: 'Chana Dal Chutney',                  price: 499 },
  { id: 37, name: 'Mint Yogurt Chutney',                price: 499 },
  { id: 38, name: 'Methi Chutney',                      price: 399 },
  { id: 39, name: 'Capsicum Peanut Chutney',            price: 399 },
  { id: 40, name: 'Red Bell Pepper Chutney',            price: 399 },
  { id: 41, name: 'Zucchini Chutney',                   price: 399 },
  { id: 42, name: 'Walnut Chutney',                     price: 599 },
  { id: 43, name: 'Mango Chutney',                      price: 599 },
  { id: 44, name: 'Onion Chutney',                      price: 499 },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="ch-hero" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
      <div className="ch-hero__overlay" />
      <div className="ch-hero__content">
        <nav className="ch-hero__breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={13} />
          <span>Our Services</span>
          <ChevronRight size={13} />
          <span>Chutney Services</span>
        </nav>
        <h1 className="ch-hero__title">
          Chutney <span className="ch-hero__title-accent">Services</span>
        </h1>
        <p className="ch-hero__sub">
          Homemade chutneys crafted with fresh ingredients — order online and enjoy authentic flavours at home.
        </p>
      </div>
    </section>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ item, selected, onToggle }) {
  return (
    <div
      className={`ch-product${selected ? ' ch-product--selected' : ''}`}
      onClick={() => onToggle(item.id)}
      role="checkbox"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggle(item.id); }}
    >
      <div className="ch-product__img-wrap">
        <img
          src={`${ITEMS_BASE_URL}${item.id}.jpg`}
          alt={item.name}
          className="ch-product__img"
          loading="lazy"
        />
        <div className={`ch-product__check${selected ? ' ch-product__check--active' : ''}`}>
          {selected && <CheckCircle size={18} />}
        </div>
      </div>
      <div className="ch-product__info">
        <p className="ch-product__price">₹ {item.price}</p>
        <p className="ch-product__name">{item.name}</p>
      </div>
    </div>
  );
}

// ─── Enquiry Form (shown when cart has items) ─────────────────────────────────
function EnquiryForm({ selectedItems, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', location: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="ch-eq-success">
        <CheckCircle size={48} className="ch-eq-success__icon" />
        <h3 className="ch-eq-success__title">Order Enquiry Received!</h3>
        <p className="ch-eq-success__msg">
          Thank you, <strong>{form.name}</strong>! We will contact you at <strong>{form.phone}</strong> shortly.
        </p>
        <div className="ch-eq-success__actions">
          <button type="button" className="ch-eq-success__btn ch-eq-success__btn--primary" onClick={onClose}>
            Continue Browsing
          </button>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="ch-eq-success__btn ch-eq-success__btn--wa">
            <MessageCircle size={15} /> WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="ch-enquiry-panel">
      <div className="ch-enquiry-panel__head">
        <div>
          <h3 className="ch-enquiry-panel__title">Request a Quote</h3>
          <p className="ch-enquiry-panel__sub">
            {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected &middot; Total: ₹ {totalPrice.toLocaleString()}
          </p>
        </div>
        <button type="button" className="ch-enquiry-panel__close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      <div className="ch-enquiry-panel__items">
        {selectedItems.map((item) => (
          <div key={item.id} className="ch-enquiry-panel__item">
            <img src={`${ITEMS_BASE_URL}${item.id}.jpg`} alt={item.name} className="ch-enquiry-panel__item-img" />
            <span className="ch-enquiry-panel__item-name">{item.name}</span>
            <span className="ch-enquiry-panel__item-price">₹ {item.price}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate className="ch-enquiry-panel__form">
        <div className="ch-enquiry-panel__row">
          <div className="ch-enquiry-panel__group">
            <label className="ch-enquiry-panel__label"><span className="ch-req">*</span> Your Name</label>
            <input type="text" className="ch-enquiry-panel__input" placeholder="Your Name"
              value={form.name} onChange={(e) => set('name', e.target.value)} required />
          </div>
          <div className="ch-enquiry-panel__group">
            <label className="ch-enquiry-panel__label"><span className="ch-req">*</span> Mobile Number</label>
            <input type="tel" className="ch-enquiry-panel__input" placeholder="eg. 98xxxxxx10"
              value={form.phone} onChange={(e) => set('phone', e.target.value)} required />
          </div>
        </div>
        <div className="ch-enquiry-panel__group">
          <label className="ch-enquiry-panel__label">Delivery Location</label>
          <input type="text" className="ch-enquiry-panel__input" placeholder="City / Area"
            value={form.location} onChange={(e) => set('location', e.target.value)} />
        </div>
        <div className="ch-enquiry-panel__group">
          <label className="ch-enquiry-panel__label">Additional Notes</label>
          <textarea className="ch-enquiry-panel__textarea" rows={2}
            placeholder="Any special requirements…"
            value={form.message} onChange={(e) => set('message', e.target.value)} />
        </div>
        <button type="submit" className="ch-enquiry-panel__submit">Send Enquiry</button>
      </form>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ChutneysPage() {
  const [selected, setSelected] = useState([]);
  const [showEnquiry, setShowEnquiry] = useState(false);

  const toggleItem = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const selectedItems = CHUTNEY_ITEMS.filter((item) => selected.includes(item.id));
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);

  const handleCloseEnquiry = () => {
    setShowEnquiry(false);
    setSelected([]);
  };

  return (
    <div className="chutneys-page">
      <HeroSection />

      <div className="ch-body">
        <div className="ch-body__inner">

          {/* Header row */}
          <div className="ch-body__header">
            <div>
              <h2 className="ch-body__title">Chutney Services</h2>
              <p className="ch-body__subtitle">Select items to request a quote — made fresh with natural ingredients</p>
            </div>
            <button
              className={`ch-cart-btn${selected.length > 0 ? ' ch-cart-btn--active' : ''}`}
              onClick={() => selected.length > 0 && setShowEnquiry(true)}
              aria-label="View cart"
            >
              <ShoppingCart size={18} />
              <span>Cart ({selected.length})</span>
              {selected.length > 0 && <span className="ch-cart-btn__total">₹ {totalPrice.toLocaleString()}</span>}
            </button>
          </div>

          {/* Enquiry panel */}
          {showEnquiry && (
            <div className="ch-enquiry-overlay">
              <EnquiryForm selectedItems={selectedItems} onClose={handleCloseEnquiry} />
            </div>
          )}

          {/* Product grid */}
          <div className="ch-grid">
            {CHUTNEY_ITEMS.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                selected={selected.includes(item.id)}
                onToggle={toggleItem}
              />
            ))}
          </div>

          {/* Sticky cart bar */}
          {selected.length > 0 && !showEnquiry && (
            <div className="ch-sticky-bar">
              <div className="ch-sticky-bar__inner">
                <div className="ch-sticky-bar__info">
                  <ShoppingCart size={20} className="ch-sticky-bar__icon" />
                  <span className="ch-sticky-bar__count">{selected.length} item{selected.length > 1 ? 's' : ''} selected</span>
                  <span className="ch-sticky-bar__sep">·</span>
                  <span className="ch-sticky-bar__total">₹ {totalPrice.toLocaleString()}</span>
                </div>
                <div className="ch-sticky-bar__actions">
                  <button type="button" className="ch-sticky-bar__clear" onClick={() => setSelected([])}>Clear</button>
                  <button type="button" className="ch-sticky-bar__cta" onClick={() => setShowEnquiry(true)}>Request Quote</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact strip */}
      <div className="ch-contact-strip">
        <div className="ch-contact-strip__inner">
          <p className="ch-contact-strip__text">Have a question? Reach us directly.</p>
          <div className="ch-contact-strip__actions">
            <a href="tel:+918926262674" className="ch-contact-strip__btn ch-contact-strip__btn--call">
              <Phone size={15} /> +91-89262 62674
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="ch-contact-strip__btn ch-contact-strip__btn--wa">
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
