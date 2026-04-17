import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingCart, CheckCircle, MessageCircle, Phone, X, Check, Plus, Minus, Trash2 } from 'lucide-react';
import { pickleItems } from '../../data/menuData';
import ServiceProductCard from '../../components/ServiceProductCard/ServiceProductCard';
import './PicklePage.scss';

// PicklePage.jsx — line 8
const HERO_IMAGE = 'https://images.pexels.com/photos/4110541/pexels-photo-4110541.jpeg?auto=compress&cs=tinysrgb&w=1600';
const WHATSAPP_URL = 'https://wa.me/918926262674?text=Hello! I am interested in Pickle / Achhar Services.';
const ITEMS_BASE_URL = 'https://www.thefamoushalwai.com/frontEnd/items/';

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



// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PicklePage() {
  const navigate = useNavigate();
  const [plate, setPlate] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleAdd = (id) => {
    const item = pickleItems.find(i => i.id === id);
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

  const totalItems = Object.values(plate).reduce((sum, c) => sum + c, 0);

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
              onClick={() => totalItems > 0 && navigate('/view-menu-cart', { state: { plate } })}
              aria-label="View cart"
            >
              <ShoppingCart size={18} />
              <span>Cart ({totalItems})</span>
            </button>
          </div>

          {/* Product grid */}
          <div className="pk-grid">
            {pickleItems.map((item) => (
              <ServiceProductCard
                key={item.id}
                item={item}
                count={plate[item.id] || 0}
                onAdd={handleAdd}
                onRemove={handleRemove}
                imageBaseUrl={ITEMS_BASE_URL}
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
