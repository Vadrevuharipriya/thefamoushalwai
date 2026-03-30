import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Plus, Minus, Trash2, Phone, ShoppingBag, Calendar } from 'lucide-react';
import { menuSections } from '../../data/menuData';
import './ViewMenuCartPage.scss';

const VEG_ICON = 'https://www.thefamoushalwai.com/frontEnd/images/veg_icon.png';
const NON_VEG_ICON = 'https://www.thefamoushalwai.com/frontEnd/images/non_veg_icon.png';

// Build flat dish lookup
const allDishesMap = {};
menuSections.forEach(s => s.items.forEach(d => { allDishesMap[d.id] = d; }));

// Common occasions
const OCCASIONS = [
  'Wedding Functions',
  'Cocktail & Sangeet',
  'Birthday Party',
  'Corporate Event',
  'House Party',
  'Kids Party',
  'Pooja at Home',
  'Baby Shower',
  'Anniversary',
  'Roka Ceremony',
  'Other Occasion',
];

// Number of people options
const PEOPLE_OPTIONS = [
  '25', '50', '75', '100', '150', '200', '300', '500', '1000', '2000+'
];

// Service locations
const LOCATIONS = [
  'Delhi NCR',
  'Noida',
  'Gurugram',
  'Faridabad',
  'Ghaziabad',
  'Lucknow',
  'Jaipur',
  'Chandigarh',
  'Dehradun',
  'Other',
];

export default function ViewMenuCartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialPlate = location.state?.plate || {};
  
  const [plate, setPlate] = useState(initialPlate);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    occasion: '',
    people: '',
    date: '',
    message: '',
  });

  const plateEntries = Object.entries(plate).filter(([, count]) => count > 0);
  const totalItems = Object.values(plate).reduce((sum, c) => sum + c, 0);
  const plateCount = plateEntries.length;

  const handleQuantity = (id, delta) => {
    setPlate(prev => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleRemove = (id) => {
    setPlate(prev => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to enquiry page with the selected plate items
    navigate('/enquiry', { state: { plate } });
  };

  return (
    <div className="vmc-page">
      <div className="vmc-header">
        <Link to="/our-menu" className="vmc-header__back">
          <ArrowLeft size={20} /> Back to Menu
        </Link>
        <h1>Your Plate</h1>
        <p>{totalItems} items selected</p>
      </div>

      <div className="vmc-content">
        <div className="vmc-main">
          <div className="vmc-list">
            {plateEntries.length === 0 ? (
              <div className="vmc-empty">
                <ShoppingBag size={48} className="vmc-empty__icon" />
                <p>Your plate is empty</p>
                <Link to="/our-menu" className="vmc-empty__btn">Browse Menu</Link>
              </div>
            ) : (
              <>
                <h2 className="vmc-list__title">Menu Items</h2>
                {plateEntries.map(([id, count]) => {
                  const dish = allDishesMap[id];
                  if (!dish) return null;
                  return (
                    <div key={id} className="vmc-item">
                      <div className="vmc-item__info">
                        <img 
                          src={dish.veg ? VEG_ICON : NON_VEG_ICON} 
                          alt={dish.veg ? 'Veg' : 'Non-Veg'} 
                          className="vmc-item__veg"
                        />
                        <span className="vmc-item__name">{dish.name}</span>
                      </div>
                      <div className="vmc-item__controls">
                        <button onClick={() => handleQuantity(id, -1)}>
                          <Minus size={14} />
                        </button>
                        <span>{count}</span>
                        <button onClick={() => handleQuantity(id, 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <button className="vmc-item__remove" onClick={() => handleRemove(id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          <form className="vmc-form" onSubmit={handleSubmit}>
            <h2>Send Enquiry</h2>
            
            <div className="vmc-form__section">
              <h3 className="vmc-form__section-title">Contact Detail</h3>
              <div className="vmc-form__group">
                <input 
                  type="text" name="name" placeholder="Your Name *" 
                  value={form.name} onChange={handleChange} required 
                />
                <input 
                  type="tel" name="phone" placeholder="Mobile Phone no. * eg.98xxxxxx10" 
                  value={form.phone} onChange={handleChange} required 
                />
              </div>
              <div className="vmc-form__group">
                <input 
                  type="email" name="email" placeholder="Email Address" 
                  value={form.email} onChange={handleChange} 
                />
              </div>
            </div>
            
            <div className="vmc-form__section">
              <h3 className="vmc-form__section-title">Service Location</h3>
              <div className="vmc-form__group">
                <select name="location" value={form.location} onChange={handleChange} required>
                  <option value="">-- Service Location --</option>
                  {LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="vmc-form__section">
              <h3 className="vmc-form__section-title">Event Details</h3>
              <div className="vmc-form__group">
                <select name="occasion" value={form.occasion} onChange={handleChange} required>
                  <option value="">-- Your Occasion * --</option>
                  {OCCASIONS.map(occ => (
                    <option key={occ} value={occ}>{occ}</option>
                  ))}
                </select>
                <select name="people" value={form.people} onChange={handleChange} required>
                  <option value="">-- No of People --</option>
                  {PEOPLE_OPTIONS.map(p => (
                    <option key={p} value={p}>{p} {parseInt(p) > 100 ? 'Guests' : 'People'}</option>
                  ))}
                </select>
              </div>
              <div className="vmc-form__group">
                <div className="vmc-form__date-input">
                  <Calendar size={16} className="vmc-form__date-icon" />
                  <input 
                    type="date" name="date" placeholder="dd-mm-yyyy" 
                    value={form.date} onChange={handleChange} required 
                  />
                </div>
              </div>
            </div>
            
            <div className="vmc-form__section">
              <textarea 
                name="message" placeholder="Any special requirements..." 
                value={form.message} onChange={handleChange} rows={3}
              />
            </div>

            <div className="vmc-form__amount">
              <span>Pay Amount: <strong>Rs.235</strong></span>
            </div>
            
            <button type="submit" className="vmc-form__submit">
              Submit Enquiry
            </button>
          </form>
        </div>

        {plateEntries.length > 0 && (
          <div className="vmc-summary">
            <h2 className="vmc-summary__title">Order Summary</h2>
            
            <div className="vmc-summary__items">
              {plateEntries.map(([id, count]) => {
                const dish = allDishesMap[id];
                if (!dish) return null;
                return (
                  <div key={id} className="vmc-summary__item">
                    <span className="vmc-summary__item-name">{dish.name}</span>
                    <span className="vmc-summary__item-qty">x {count}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="vmc-summary__divider" />
            
            <div className="vmc-summary__row">
              <span>Total Plates</span>
              <span>{plateCount}</span>
            </div>
            
            <div className="vmc-summary__row">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>
            
            <div className="vmc-summary__divider" />
            
            <div className="vmc-summary__note">
              <p>* Prices will be shared upon enquiry confirmation</p>
              <p>* Customized menu quotes based on requirements</p>
            </div>
          </div>
        )}
      </div>

      <div className="vmc-help">
        <p>Need help? Call us:</p>
        <a href="tel:+918926262674"><Phone size={16} /> +91-89262 62674</a>
      </div>
    </div>
  );
}
