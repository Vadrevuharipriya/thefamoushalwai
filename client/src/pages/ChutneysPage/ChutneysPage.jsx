import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingCart, CheckCircle, MessageCircle, Phone, X, Check, Plus, Minus, Trash2 } from 'lucide-react';
import { chutneyItems } from '../../data/menuData';
import ServiceProductCard from '../../components/ServiceProductCard/ServiceProductCard';
import './ChutneysPage.scss';

const HERO_IMAGE = 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=1600';
const WHATSAPP_URL = 'https://wa.me/918926262674?text=Hello! I am interested in Chutney Services.';
const ITEMS_BASE_URL = 'https://www.thefamoushalwai.com/frontEnd/items/';

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



// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ChutneysPage() {
  const navigate = useNavigate();
  const [plate, setPlate] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleAdd = (id) => {
    const item = chutneyItems.find(i => i.id === id);
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
    <div className="chutneys-page">
      {toast && (
        <div className="ch-toast">
          <Check size={16} />
          {toast}
        </div>
      )}
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
              className={`ch-cart-btn${totalItems > 0 ? ' ch-cart-btn--active' : ''}`}
              onClick={() => totalItems > 0 && navigate('/view-menu-cart', { state: { plate } })}
              aria-label="View cart"
            >
              <ShoppingCart size={18} />
              <span>Cart ({totalItems})</span>
            </button>
          </div>

          {/* Product grid */}
          <div className="ch-grid">
            {chutneyItems.map((item) => (
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
      {/* <div className="ch-contact-strip">
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
      </div> */}
    </div>
  );
}
