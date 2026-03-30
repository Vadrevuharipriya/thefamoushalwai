import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingCart, CheckCircle, MessageCircle, Phone, X } from 'lucide-react';
import './BhajiPage.scss';

const HERO_IMAGE = 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1600';
const WHATSAPP_URL = 'https://wa.me/918926262674?text=Hello! I am interested in Bhaji Services.';
const ITEMS_BASE_URL = 'https://www.thefamoushalwai.com/frontEnd/items/';

const BHAJI_ITEMS = [
  { id: 1,  name: 'Desi Bundi Laddo',      price: 165 },
  { id: 2,  name: 'Gujrati Kachori',        price: 155 },
  { id: 3,  name: 'Loose Gol Matthi',       price: 169 },
  { id: 4,  name: 'Loose Mitthi Matthi',    price: 169 },
  { id: 5,  name: 'Loose Namek Pare',       price: 169 },
  { id: 6,  name: 'Masala Pare',            price: 179 },
  { id: 7,  name: 'Pithi Kachori',          price: 165 },
  { id: 8,  name: 'Sakkar Pare',            price: 90  },
  { id: 9,  name: 'Atta Dry Fruit Laddoo',  price: 499 },
  { id: 10, name: 'Atta Panjiri',           price: 499 },
  { id: 11, name: 'Balushai',               price: 299 },
  { id: 12, name: 'Besan Dry Fruit Laddo',  price: 499 },
  { id: 13, name: 'Besan Laddo',            price: 299 },
  { id: 14, name: 'Chhena Murgi',           price: 299 },
  { id: 15, name: 'Desi Ghee Bundi',        price: 199 },
  { id: 16, name: 'Desi Ghee Bundi Ladoo',  price: 299 },
  { id: 17, name: 'Desi Ghee Gujia',        price: 399 },
  { id: 18, name: 'Desi Ghee Patisha',      price: 249 },
  { id: 19, name: 'Dry Fruit Patisha',      price: 299 },
  { id: 20, name: 'Karachi Halwai',         price: 299 },
  { id: 21, name: 'Meva Panjiri',           price: 799 },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="bj-hero" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
      <div className="bj-hero__overlay" />
      <div className="bj-hero__content">
        <nav className="bj-hero__breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={13} />
          <span>Our Services</span>
          <ChevronRight size={13} />
          <span>Bhaji Services</span>
        </nav>
        <h1 className="bj-hero__title">
          Bhaji <span className="bj-hero__title-accent">Services</span>
        </h1>
        <p className="bj-hero__sub">
          Authentic Indian mithai &amp; snacks — freshly made with desi ghee, delivered for weddings and gifting.
        </p>
      </div>
    </section>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ item, selected, onToggle }) {
  return (
    <div
      className={`bj-product${selected ? ' bj-product--selected' : ''}`}
      onClick={() => onToggle(item.id)}
      role="checkbox"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggle(item.id); }}
    >
      <div className="bj-product__img-wrap">
        <img
          src={`${ITEMS_BASE_URL}${item.id}.jpg`}
          alt={item.name}
          className="bj-product__img"
          loading="lazy"
        />
        <div className={`bj-product__check${selected ? ' bj-product__check--active' : ''}`}>
          {selected && <CheckCircle size={18} />}
        </div>
      </div>
      <div className="bj-product__info">
        <p className="bj-product__price">₹ {item.price}</p>
        <p className="bj-product__name">{item.name}</p>
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
      <div className="bj-eq-success">
        <CheckCircle size={48} className="bj-eq-success__icon" />
        <h3 className="bj-eq-success__title">Order Enquiry Received!</h3>
        <p className="bj-eq-success__msg">
          Thank you, <strong>{form.name}</strong>! We will contact you at <strong>{form.phone}</strong> shortly.
        </p>
        <div className="bj-eq-success__actions">
          <button type="button" className="bj-eq-success__btn bj-eq-success__btn--primary" onClick={onClose}>
            Continue Browsing
          </button>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bj-eq-success__btn bj-eq-success__btn--wa">
            <MessageCircle size={15} /> WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bj-enquiry-panel">
      <div className="bj-enquiry-panel__head">
        <div>
          <h3 className="bj-enquiry-panel__title">Request a Quote</h3>
          <p className="bj-enquiry-panel__sub">{selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected &middot; Total: ₹ {totalPrice.toLocaleString()}</p>
        </div>
        <button type="button" className="bj-enquiry-panel__close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      <div className="bj-enquiry-panel__items">
        {selectedItems.map((item) => (
          <div key={item.id} className="bj-enquiry-panel__item">
            <img src={`${ITEMS_BASE_URL}${item.id}.jpg`} alt={item.name} className="bj-enquiry-panel__item-img" />
            <span className="bj-enquiry-panel__item-name">{item.name}</span>
            <span className="bj-enquiry-panel__item-price">₹ {item.price}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate className="bj-enquiry-panel__form">
        <div className="bj-enquiry-panel__row">
          <div className="bj-enquiry-panel__group">
            <label className="bj-enquiry-panel__label"><span className="bj-req">*</span> Your Name</label>
            <input type="text" className="bj-enquiry-panel__input" placeholder="Your Name"
              value={form.name} onChange={(e) => set('name', e.target.value)} required />
          </div>
          <div className="bj-enquiry-panel__group">
            <label className="bj-enquiry-panel__label"><span className="bj-req">*</span> Mobile Number</label>
            <input type="tel" className="bj-enquiry-panel__input" placeholder="eg. 98xxxxxx10"
              value={form.phone} onChange={(e) => set('phone', e.target.value)} required />
          </div>
        </div>
        <div className="bj-enquiry-panel__group">
          <label className="bj-enquiry-panel__label">Delivery Location</label>
          <input type="text" className="bj-enquiry-panel__input" placeholder="City / Area"
            value={form.location} onChange={(e) => set('location', e.target.value)} />
        </div>
        <div className="bj-enquiry-panel__group">
          <label className="bj-enquiry-panel__label">Additional Notes</label>
          <textarea className="bj-enquiry-panel__textarea" rows={2}
            placeholder="Any special requirements…"
            value={form.message} onChange={(e) => set('message', e.target.value)} />
        </div>
        <button type="submit" className="bj-enquiry-panel__submit">Send Enquiry</button>
      </form>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function BhajiPage() {
  const [selected, setSelected] = useState([]);
  const [showEnquiry, setShowEnquiry] = useState(false);

  const toggleItem = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectedItems = BHAJI_ITEMS.filter((item) => selected.includes(item.id));
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);

  const handleCloseEnquiry = () => {
    setShowEnquiry(false);
    setSelected([]);
  };

  return (
    <div className="bhaji-page">
      <HeroSection />

      <div className="bj-body">
        <div className="bj-body__inner">

          {/* Header row */}
          <div className="bj-body__header">
            <div>
              <h2 className="bj-body__title">Bhaji Services</h2>
              <p className="bj-body__subtitle">Select items to request a quote — freshly prepared on order</p>
            </div>
            <button
              className={`bj-cart-btn${selected.length > 0 ? ' bj-cart-btn--active' : ''}`}
              onClick={() => selected.length > 0 && setShowEnquiry(true)}
              aria-label="View cart"
            >
              <ShoppingCart size={18} />
              <span>Cart ({selected.length})</span>
              {selected.length > 0 && <span className="bj-cart-btn__total">₹ {totalPrice.toLocaleString()}</span>}
            </button>
          </div>

          {/* Enquiry panel */}
          {showEnquiry && (
            <div className="bj-enquiry-overlay">
              <EnquiryForm selectedItems={selectedItems} onClose={handleCloseEnquiry} />
            </div>
          )}

          {/* Product grid */}
          <div className="bj-grid">
            {BHAJI_ITEMS.map((item) => (
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
            <div className="bj-sticky-bar">
              <div className="bj-sticky-bar__inner">
                <div className="bj-sticky-bar__info">
                  <ShoppingCart size={20} className="bj-sticky-bar__icon" />
                  <span className="bj-sticky-bar__count">{selected.length} item{selected.length > 1 ? 's' : ''} selected</span>
                  <span className="bj-sticky-bar__sep">·</span>
                  <span className="bj-sticky-bar__total">₹ {totalPrice.toLocaleString()}</span>
                </div>
                <div className="bj-sticky-bar__actions">
                  <button type="button" className="bj-sticky-bar__clear" onClick={() => setSelected([])}>
                    Clear
                  </button>
                  <button type="button" className="bj-sticky-bar__cta" onClick={() => setShowEnquiry(true)}>
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact strip */}
      <div className="bj-contact-strip">
        <div className="bj-contact-strip__inner">
          <p className="bj-contact-strip__text">Have a question? Reach us directly.</p>
          <div className="bj-contact-strip__actions">
            <a href="tel:+918926262674" className="bj-contact-strip__btn bj-contact-strip__btn--call">
              <Phone size={15} /> +91-89262 62674
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bj-contact-strip__btn bj-contact-strip__btn--wa">
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
