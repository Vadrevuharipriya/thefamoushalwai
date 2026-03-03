import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Minus, ShoppingBag, X, UtensilsCrossed } from 'lucide-react';
import { menuSections, menuFilterCategories } from '../../data/menuData';
import { cities, navOccasions } from '../../data/homeData';
import './MenuPage.scss';

const VEG_ICON = 'https://www.thefamoushalwai.com/frontEnd/images/veg_icon.png';
const NON_VEG_ICON = 'https://www.thefamoushalwai.com/frontEnd/images/non_veg_icon.png';

const heroImages = [
  'https://images.pexels.com/photos/5775684/pexels-photo-5775684.jpeg',
  'https://images.pexels.com/photos/4331490/pexels-photo-4331490.jpeg',
  'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
];

// Build flat dish lookup (id → dish)
const allDishesMap = {};
menuSections.forEach(s => s.items.forEach(d => { allDishesMap[d.id] = d; }));

// ─── Dish Card ────────────────────────────────────────────────────────────────
function DishCard({ dish, count, onAdd, onRemove }) {
  return (
    <div className="dish-card">
      <div className="dish-card__img-wrap">
        <img
          src={dish.image}
          alt={dish.name}
          className="dish-card__img"
          loading="lazy"
          onError={e => { e.target.src = `https://picsum.photos/200/200?u=dish-${dish.id}`; }}
        />
        {count > 0 ? (
          <div className="dish-card__counter">
            <button
              onClick={() => onRemove(dish.id)}
              className="dish-card__counter-btn"
              aria-label="Remove one"
            >
              <Minus size={10} />
            </button>
            <span>{count}</span>
            <button
              onClick={() => onAdd(dish)}
              className="dish-card__counter-btn"
              aria-label="Add one more"
            >
              <Plus size={10} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAdd(dish)}
            className="dish-card__add-btn"
            aria-label={`Add ${dish.name}`}
          >
            <Plus size={14} />
          </button>
        )}
      </div>
      <div className="dish-card__info">
        <img
          src={dish.veg ? VEG_ICON : NON_VEG_ICON}
          alt={dish.veg ? 'Veg' : 'Non-Veg'}
          className="dish-card__veg-icon"
        />
        <p className="dish-card__name">{dish.name}</p>
      </div>
    </div>
  );
}

// ─── Cuisine Section ──────────────────────────────────────────────────────────
function CuisineSection({ section, activeCategory, vegOnly, nonVegOnly, plateMap, onAdd, onRemove }) {
  const items = section.items.filter(dish => {
    if (activeCategory !== 'all' && dish.category !== activeCategory) return false;
    if (vegOnly && !dish.veg) return false;
    if (nonVegOnly && dish.veg) return false;
    return true;
  });

  if (items.length === 0) return null;

  return (
    <div className="menu-section" id={`section-${section.id}`}>
      <div className="menu-section__header">
        <span className="menu-section__emoji">{section.emoji}</span>
        <h2 className="menu-section__title">{section.name}</h2>
        <span className="menu-section__count">{items.length} dishes</span>
      </div>
      <div className="menu-section__grid">
        {items.map(dish => (
          <DishCard
            key={dish.id}
            dish={dish}
            count={plateMap[dish.id] || 0}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="menu-empty">
      <UtensilsCrossed size={48} className="menu-empty__icon" />
      <h3 className="menu-empty__title">No dishes found</h3>
      <p className="menu-empty__text">Try changing your filters to see more options.</p>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function MenuPage() {
  const [searchParams] = useSearchParams();
  const cuisineParam = searchParams.get('cuisine');

  const [activeCategory, setActiveCategory] = useState('all');
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVegOnly, setNonVegOnly] = useState(false);
  const [plate, setPlate] = useState({});
  const [isPlateOpen, setIsPlateOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedPeople, setSelectedPeople] = useState('');

  const totalItems = Object.values(plate).reduce((sum, c) => sum + c, 0);
  const plateEntries = Object.entries(plate).filter(([, c]) => c > 0);

  // Check if any sections have visible items
  const hasVisibleItems = menuSections.some(section =>
    section.items.some(dish => {
      if (activeCategory !== 'all' && dish.category !== activeCategory) return false;
      if (vegOnly && !dish.veg) return false;
      if (nonVegOnly && dish.veg) return false;
      return true;
    })
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (cuisineParam) {
      setTimeout(() => {
        const el = document.getElementById(`section-${cuisineParam}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  }, [cuisineParam]);

  const handleAdd = dish => {
    setPlate(prev => ({ ...prev, [dish.id]: (prev[dish.id] || 0) + 1 }));
  };

  const handleRemove = id => {
    setPlate(prev => {
      const next = { ...prev };
      if (next[id] > 1) next[id]--;
      else delete next[id];
      return next;
    });
  };

  const toggleVeg = () => {
    setVegOnly(v => {
      if (!v) setNonVegOnly(false);
      return !v;
    });
  };

  const toggleNonVeg = () => {
    setNonVegOnly(v => {
      if (!v) setVegOnly(false);
      return !v;
    });
  };

  return (
    <div className="menu-page">

      {/* ── Hero ── */}
      <div className="menu-hero">
        <div className="menu-hero__collage">
          {heroImages.map((src, i) => (
            <div key={i} className="menu-hero__panel">
              <img src={src} alt="" className="menu-hero__panel-img" />
            </div>
          ))}
        </div>
        <div className="menu-hero__overlay" />
        <div className="menu-hero__content">
          <div className="section-tag" style={{ margin: '0 auto 10px' }}>🍽️ Customize Your Plate</div>
          <h1 className="menu-hero__title">
            Our <span className="text-gradient">Menu</span>
          </h1>
          <p className="menu-hero__subtitle">
            Handpick your favourite dishes and build a customised plate for your occasion
          </p>
        </div>
      </div>

      {/* ── Sticky Filters ── */}
      <div className="menu-filters">
        <div className="menu-filters__inner">
          <div className="menu-filters__selects">
            <select
              className="menu-filter-select"
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
            >
              <option value="">📍 Service Location</option>
              {cities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>

            <select
              className="menu-filter-select"
              value={selectedOccasion}
              onChange={e => setSelectedOccasion(e.target.value)}
            >
              <option value="">🎉 Your Occasion</option>
              {navOccasions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>

            <select
              className="menu-filter-select menu-filter-select--people"
              value={selectedPeople}
              onChange={e => setSelectedPeople(e.target.value)}
            >
              <option value="">👥 No. of People</option>
              {Array.from({ length: 500 }, (_, i) => i + 1).map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
              ))}
            </select>
          </div>

          <div className="menu-filters__toggles">
            <button
              onClick={toggleVeg}
              className={`veg-toggle${vegOnly ? ' veg-toggle--active' : ''}`}
            >
              <span className="veg-toggle__dot veg-toggle__dot--green" />
              Veg
            </button>
            <button
              onClick={toggleNonVeg}
              className={`veg-toggle${nonVegOnly ? ' veg-toggle--active veg-toggle--red' : ''}`}
            >
              <span className="veg-toggle__dot veg-toggle__dot--red" />
              Non-Veg
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="menu-filters__tabs">
          {menuFilterCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`menu-tab${activeCategory === cat.id ? ' menu-tab--active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Menu Content ── */}
      <div className="menu-content">
        <div className="menu-content__inner">
          {hasVisibleItems ? (
            menuSections.map(section => (
              <CuisineSection
                key={section.id}
                section={section}
                activeCategory={activeCategory}
                vegOnly={vegOnly}
                nonVegOnly={nonVegOnly}
                plateMap={plate}
                onAdd={handleAdd}
                onRemove={handleRemove}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {/* ── My Plate Floating Button ── */}
      {totalItems > 0 && (
        <button className="my-plate-btn" onClick={() => setIsPlateOpen(true)}>
          <ShoppingBag size={20} />
          <span>My Plate</span>
          <span className="my-plate-btn__badge">{totalItems}</span>
        </button>
      )}

      {/* ── My Plate Drawer ── */}
      {isPlateOpen && (
        <>
          <div className="plate-backdrop" onClick={() => setIsPlateOpen(false)} />
          <div className="plate-drawer">
            <div className="plate-drawer__header">
              <div>
                <h3 className="plate-drawer__title">My Plate 🍽️</h3>
                <p className="plate-drawer__subtitle">
                  {totalItems} item{totalItems !== 1 ? 's' : ''} selected
                </p>
              </div>
              <button onClick={() => setIsPlateOpen(false)} className="plate-drawer__close">
                <X size={18} />
              </button>
            </div>

            <div className="plate-drawer__items">
              {plateEntries.map(([id, count]) => {
                const dish = allDishesMap[Number(id)] || allDishesMap[id];
                if (!dish) return null;
                return (
                  <div key={id} className="plate-item">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="plate-item__img"
                      onError={e => { e.target.src = `https://picsum.photos/52/52?u=dish-${id}`; }}
                    />
                    <div className="plate-item__info">
                      <img
                        src={dish.veg ? VEG_ICON : NON_VEG_ICON}
                        alt=""
                        className="plate-item__veg-icon"
                      />
                      <p className="plate-item__name">{dish.name}</p>
                    </div>
                    <div className="plate-item__controls">
                      <button
                        onClick={() => handleRemove(Number(id))}
                        className="plate-item__btn"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="plate-item__count">{count}</span>
                      <button onClick={() => handleAdd(dish)} className="plate-item__btn">
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="plate-drawer__footer">
              <a
                href="tel:+918926262674"
                className="btn-red"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                📞 Send Enquiry
              </a>
              <button
                className="plate-drawer__clear"
                onClick={() => setPlate({})}
              >
                Clear Plate
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
