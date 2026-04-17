import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { ArrowLeft, Plus, Minus, Trash2, Phone, ShoppingBag, Calendar } from 'lucide-react';
import { menuSections, bhajiItems, pickleItems, chutneyItems } from '../../data/menuData';
import './ViewMenuCartPage.scss';

const VEG_ICON = 'https://www.thefamoushalwai.com/frontEnd/images/veg_icon.png';
const NON_VEG_ICON = 'https://www.thefamoushalwai.com/frontEnd/images/non_veg_icon.png';
const SERVICE_BASE_URL = 'https://www.thefamoushalwai.com/frontEnd/items/';

// Build flat lookup map
const allItemsMap = {};
menuSections.forEach(s => s.items.forEach(d => { allItemsMap[d.id] = { ...d, type: 'dish' }; }));
bhajiItems.forEach(i => { allItemsMap[i.id] = { ...i, type: 'service', image: `${SERVICE_BASE_URL}${i.id}.jpg` }; });
pickleItems.forEach(i => { allItemsMap[i.id] = { ...i, type: 'service', image: `${SERVICE_BASE_URL}${i.id}.jpg` }; });
chutneyItems.forEach(i => { allItemsMap[i.id] = { ...i, type: 'service', image: `${SERVICE_BASE_URL}${i.id}.jpg` }; });

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

  const plateEntries = Object.entries(plate).filter(([, count]) => count > 0);

  // Calculate Summary
  const summary = useMemo(() => {
    let subtotal = 0;
    let totalItemsCount = 0;
    
    plateEntries.forEach(([id, count]) => {
      const item = allItemsMap[id];
      if (item) {
        subtotal += (item.price || 0) * count;
        totalItemsCount += count;
      }
    });

    const discount = subtotal > 1000 ? 200 : 0;
    const platformFee = 8;
    const gst = Math.round((subtotal - discount) * 0.18);
    const totalPayable = subtotal - discount + platformFee + gst;

    return {
      subtotal,
      totalItems: totalItemsCount,
      totalPlates: plateEntries.length,
      discount,
      platformFee,
      gst,
      totalPayable
    };
  }, [plateEntries]);

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

  const handleSubmit = () => {
    // Navigate to enquiry page with the selected plate items
    navigate('/enquiry', { state: { plate } });
  };

  return (
    <div className="vmc-page">
      <div className="vmc-container">
        <header className="vmc-top-bar">
          <Link to="/our-menu" className="vmc-back-link">
            <ArrowLeft size={18} /> Back to menu
          </Link>
        </header>

        <div className="vmc-layout">
          {/* Main List Section */}
          <div className="vmc-list-card">
            <div className="vmc-list-header">
              <span className="col-items">Items</span>
              <span className="col-qty">Quantity</span>
              <span className="col-price">Price</span>
            </div>

            <div className="vmc-items">
              {plateEntries.length === 0 ? (
                <div className="vmc-empty-state">
                  <ShoppingBag size={48} />
                  <p>Your plate is empty. Start adding items!</p>
                  <Link to="/our-menu" className="btn-red">Browse Menu</Link>
                </div>
              ) : (
                plateEntries.map(([id, count]) => {
                  const item = allItemsMap[id];
                  if (!item) return null;
                  return (
                    <div key={id} className="vmc-row">
                      <div className="vmc-row__item">
                        <div className="vmc-row__img-wrap">
                          <img src={item.image} alt={item.name} onError={e => e.target.src = 'https://picsum.photos/100/100'} />
                        </div>
                        <span className="vmc-row__name">{item.name}</span>
                      </div>
                      
                      <div className="vmc-row__qty">
                        <div className="vmc-qty-pill">
                          <button onClick={() => handleQuantity(id, -1)} aria-label="Decrease">
                            <Minus size={12} />
                          </button>
                          <span>{count}</span>
                          <button onClick={() => handleQuantity(id, 1)} aria-label="Increase">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      <div className="vmc-row__price">
                        <span className="price-val">Rs. {item.price || 300}</span>
                        <button className="vmc-row__del" onClick={() => handleRemove(id)} aria-label="Remove item">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Sidebar Section */}
          <aside className="vmc-sidebar">
            <div className="vmc-summary-card">
              <h2 className="vmc-summary-card__title">Order Summary</h2>
              
              <div className="vmc-summary-card__rows">
                <div className="summary-row">
                  <span className="label">Total Plates</span>
                  <span className="val">{summary.totalPlates}</span>
                </div>
                <div className="summary-row">
                  <span className="label">Total Items</span>
                  <span className="val">₹{summary.subtotal}</span>
                </div>
                <div className="summary-row discount">
                  <span className="label">Online Discount</span>
                  <span className="val">-₹{summary.discount}</span>
                </div>
                <div className="summary-row">
                  <span className="label">Platform Fee</span>
                  <span className="val">₹{summary.platformFee}</span>
                </div>
                <div className="summary-row">
                  <span className="label">GST (18%)</span>
                  <span className="val">₹{summary.gst}</span>
                </div>
              </div>

              <div className="vmc-summary-card__total">
                <span className="label">Total Payable</span>
                <span className="val">₹{summary.totalPayable}</span>
              </div>

              <button className="vmc-summary-card__btn" onClick={handleSubmit}>
                Continue
              </button>

              <div className="vmc-summary-card__notes">
                <p>* Prices will be shared upon enquiry confirmation</p>
                <p>* Customized menu quotes based on requirements</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
