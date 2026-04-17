import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingCart, CheckCircle, MessageCircle, Phone, X, Check, Plus, Minus, Trash2 } from 'lucide-react';
import { bhajiItems } from '../../data/menuData';
import ServiceProductCard from '../../components/ServiceProductCard/ServiceProductCard';
import './BhajiPage.scss';

const HERO_IMAGE = 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1600';
const WHATSAPP_URL = 'https://wa.me/918926262674?text=Hello! I am interested in Bhaji Services.';
const ITEMS_BASE_URL = 'https://www.thefamoushalwai.com/frontEnd/items/';

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



// ─── Main ─────────────────────────────────────────────────────────────────────
export default function BhajiPage() {
  const navigate = useNavigate();
  const [plate, setPlate] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleAdd = (id) => {
    const item = bhajiItems.find(i => i.id === id);
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
    <div className="bhaji-page">
      {toast && (
        <div className="bj-toast">
          <Check size={16} />
          {toast}
        </div>
      )}
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
              className={`bj-cart-btn${totalItems > 0 ? ' bj-cart-btn--active' : ''}`}
              onClick={() => totalItems > 0 && navigate('/view-menu-cart', { state: { plate } })}
              aria-label="View cart"
            >
              <ShoppingCart size={18} />
              <span>Cart ({totalItems})</span>
            </button>
          </div>

          {/* Product grid */}
          <div className="bj-grid">
            {bhajiItems.map((item) => (
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
        </div>
      </div>

      {/* Contact strip */}
      {/* <div className="bj-contact-strip">
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
      </div> */}
    </div>
  );
}
