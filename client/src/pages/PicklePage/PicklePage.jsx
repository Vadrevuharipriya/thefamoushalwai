import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingCart, CheckCircle, MessageCircle, Phone, X, Check, Plus, Minus, Trash2 } from 'lucide-react';
import './PicklePage.scss';

const HERO_IMAGE = 'https://images.pexels.com/photos/4110541/pexels-photo-4110541.jpeg?auto=compress&cs=tinysrgb&w=1600';
const WHATSAPP_URL = 'https://wa.me/918926262674?text=Hello! I am interested in Pickle / Achhar Services.';
const ITEMS_BASE_URL = 'https://www.thefamoushalwai.com/frontEnd/items/';

const PICKLE_ITEMS = [
  { id: 22, name: 'Kathal ka Achaar',          price: 349 },
  { id: 23, name: 'Lal Mirch ka Bharua Achar', price: 399 },
  { id: 24, name: 'Aam ka Achar',              price: 399 },
  { id: 25, name: 'Hari Bhari Mirchi',         price: 399 },
  { id: 26, name: 'Ginger Garlic Pickle',      price: 499 },
  { id: 27, name: 'Chilli Mix Pickle',          price: 399 },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="pk-hero" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
      <div className="pk-hero__overlay" />
      <div className="pk-hero__content">
        <nav className="pk-hero__breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={13} />
          <span>Our Services</span>
          <ChevronRight size={13} />
          <span>Pickle / Achhar</span>
        </nav>
        <h1 className="pk-hero__title">
          Pickle &amp; <span className="pk-hero__title-accent">Achhar</span>
        </h1>
        <p className="pk-hero__sub">
          Authentic homemade pickles — hand-crafted with traditional recipes and the finest spices.
        </p>
      </div>
    </section>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ item, count, onAdd, onRemove }) {
  return (
    <div className="pk-product">
      <div className="pk-product__img-wrap">
        <img
          src={`${ITEMS_BASE_URL}${item.id}.jpg`}
          alt={item.name}
          className="pk-product__img"
          loading="lazy"
        />
      </div>
      <div className="pk-product__info">
        <p className="pk-product__price">₹ {item.price}</p>
        <p className="pk-product__name">{item.name}</p>
        {count > 0 ? (
          <div className="pk-product__counter">
            <button onClick={() => onRemove(item.id)} className="pk-product__counter-btn" aria-label="Remove one">
              <Minus size={10} />
            </button>
            <span>{count}</span>
            <button onClick={() => onAdd(item.id)} className="pk-product__counter-btn" aria-label="Add one more">
              <Plus size={10} />
            </button>
          </div>
        ) : (
          <button onClick={() => onAdd(item.id)} className="pk-product__add-btn" aria-label={`Add ${item.name}`}>
            <Plus size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Enquiry Form ─────────────────────────────────────────────────────────────
function EnquiryForm({ selectedItems, onClose, onRemoveItem, onAdd, onMinus }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', boxes: '', location: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price * (item.count || 1), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pk-eq-success">
        <CheckCircle size={48} className="pk-eq-success__icon" />
        <h3 className="pk-eq-success__title">Order Enquiry Received!</h3>
        <p className="pk-eq-success__msg">
          Thank you, <strong>{form.name}</strong>! We will contact you at <strong>{form.phone}</strong> shortly.
        </p>
        <div className="pk-eq-success__actions">
          <button type="button" className="pk-eq-success__btn pk-eq-success__btn--primary" onClick={onClose}>
            Continue Browsing
          </button>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="pk-eq-success__btn pk-eq-success__btn--wa">
            <MessageCircle size={15} /> WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pk-enquiry-panel">
      <div className="pk-enquiry-panel__head">
        <div>
          <h3 className="pk-enquiry-panel__title">Request a Quote</h3>
          <p className="pk-enquiry-panel__sub">
            {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected &middot; Total: ₹ {totalPrice.toLocaleString()}
          </p>
        </div>
        <button type="button" className="pk-enquiry-panel__close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      <div className="pk-enquiry-panel__items">
        {selectedItems.map((item) => (
          <div key={item.id} className="pk-enquiry-panel__item">
            <img src={`${ITEMS_BASE_URL}${item.id}.jpg`} alt={item.name} className="pk-enquiry-panel__item-img" />
            <span className="pk-enquiry-panel__item-name">{item.name}</span>
            <div className="pk-enquiry-panel__item-qty-btns">
              <button type="button" onClick={() => onMinus(item.id)} aria-label="Decrease">−</button>
              <span>{item.count || 1}</span>
              <button type="button" onClick={() => onAdd(item.id)} aria-label="Increase">+</button>
            </div>
            <span className="pk-enquiry-panel__item-price">₹ {item.price * (item.count || 1)}</span>
            <button type="button" className="pk-enquiry-panel__item-remove" onClick={() => onRemoveItem(item.id)} aria-label="Remove">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate className="pk-enquiry-panel__form">
        <div className="pk-enquiry-panel__row">
          <div className="pk-enquiry-panel__group">
            <label className="pk-enquiry-panel__label"><span className="pk-req">*</span> Your Name</label>
            <input type="text" className="pk-enquiry-panel__input" placeholder="Your Name"
              value={form.name} onChange={(e) => set('name', e.target.value)} required />
          </div>
          <div className="pk-enquiry-panel__group">
            <label className="pk-enquiry-panel__label"><span className="pk-req">*</span> Mobile Number</label>
            <input type="tel" className="pk-enquiry-panel__input" placeholder="eg. 98xxxxxx10"
              value={form.phone} onChange={(e) => set('phone', e.target.value)} required />
          </div>
        </div>
        <div className="pk-enquiry-panel__row">
          <div className="pk-enquiry-panel__group">
            <label className="pk-enquiry-panel__label">Email Address</label>
            <input type="email" className="pk-enquiry-panel__input" placeholder="your@email.com"
              value={form.email} onChange={(e) => set('email', e.target.value)} />
          </div>
          <div className="pk-enquiry-panel__group">
            <label className="pk-enquiry-panel__label">No. of Boxes</label>
            <input type="number" className="pk-enquiry-panel__input" placeholder="e.g. 10"
              value={form.boxes} onChange={(e) => set('boxes', e.target.value)} />
          </div>
        </div>
        <div className="pk-enquiry-panel__group">
          <label className="pk-enquiry-panel__label">Delivery Location</label>
          <input type="text" className="pk-enquiry-panel__input" placeholder="City / Area"
            value={form.location} onChange={(e) => set('location', e.target.value)} />
        </div>
        <div className="pk-enquiry-panel__group">
          <label className="pk-enquiry-panel__label">Additional Notes</label>
          <textarea className="pk-enquiry-panel__textarea" rows={2}
            placeholder="Any special requirements…"
            value={form.message} onChange={(e) => set('message', e.target.value)} />
        </div>
        <button type="submit" className="pk-enquiry-panel__submit">Send Enquiry</button>
      </form>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PicklePage() {
  const navigate = useNavigate();
  const [plate, setPlate] = useState({});
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleAdd = (id) => {
    const item = PICKLE_ITEMS.find(i => i.id === id);
    setPlate(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    if (item) showToast(`${item.name} added!`);
  };

  const handleRemove = (id) => {
    setPlate(prev => {
      const next = { ...prev };
      if (next[id] > 1) next[id]--;
      else delete next[id];
      return next;
    });
  };

  const selectedItems = PICKLE_ITEMS.filter((item) => plate[item.id]).map(item => ({
    ...item,
    count: plate[item.id]
  }));
  const totalItems = Object.values(plate).reduce((sum, c) => sum + c, 0);
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price * item.count, 0);

  const handleCloseEnquiry = () => {
    setShowEnquiry(false);
    setPlate({});
  };

  return (
    <div className="pickle-page">
      {toast && (
        <div className="pk-toast">
          <Check size={16} />
          {toast}
        </div>
      )}
      <HeroSection />

      <div className="pk-body">
        <div className="pk-body__inner">

          {/* Header row */}
          <div className="pk-body__header">
            <div>
              <h2 className="pk-body__title">Pickle &amp; Achhar Services</h2>
              <p className="pk-body__subtitle">Select items to request a quote — handcrafted with traditional recipes</p>
            </div>
            <button
              className={`pk-cart-btn${totalItems > 0 ? ' pk-cart-btn--active' : ''}`}
              onClick={() => totalItems > 0 && setShowEnquiry(true)}
              aria-label="View cart"
            >
              <ShoppingCart size={18} />
              <span>Cart ({totalItems})</span>
              {totalItems > 0 && <span className="pk-cart-btn__total">₹ {totalPrice.toLocaleString()}</span>}
            </button>
          </div>

          {/* Enquiry panel */}
          {showEnquiry && (
            <div className="pk-enquiry-overlay">
              <EnquiryForm selectedItems={selectedItems} onClose={handleCloseEnquiry} onRemoveItem={handleRemove} onAdd={handleAdd} onMinus={handleRemove} />
            </div>
          )}

          {/* Product grid */}
          <div className="pk-grid">
            {PICKLE_ITEMS.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                count={plate[item.id] || 0}
                onAdd={handleAdd}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* Sticky cart bar */}
          
        </div>
      </div>

      {/* Contact strip */}
      {/* <div className="pk-contact-strip">
        <div className="pk-contact-strip__inner">
          <p className="pk-contact-strip__text">Have a question? Reach us directly.</p>
          <div className="pk-contact-strip__actions">
            <a href="tel:+918926262674" className="pk-contact-strip__btn pk-contact-strip__btn--call">
              <Phone size={15} /> +91-89262 62675
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="pk-contact-strip__btn pk-contact-strip__btn--wa">
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
}
