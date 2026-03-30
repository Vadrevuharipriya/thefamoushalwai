import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cities } from '../../data/homeData';
import './CitiesSection.scss';

const SCROLL_AMOUNT = 600;

function CityCard({ city }) {
  return (
    <Link to={city.link} className="city-card">
      <div className="city-card__aspect">
        <img
          src={city.image}
          alt={city.name}
          className="city-card__img"
          loading="lazy"
          decoding="async"
          onError={(e) => { e.target.src = `https://picsum.photos/300/400?u=city-${city.id}`; }}
        />
        <div className="city-card__overlay" />
      </div>
      <div className="city-card__info">
        <MapPin size={12} color="#DA9100" style={{ flexShrink: 0 }} />
        <span className="city-card__name">{city.name}</span>
      </div>
    </Link>
  );
}

export default function CitiesSection() {
  const stripRef = useRef(null);

  const scroll = (dir) => {
    if (stripRef.current) {
      stripRef.current.scrollBy({ left: dir * SCROLL_AMOUNT, behavior: 'smooth' });
    }
  };

  return (
    <section className="cities-section">
      <div className="cities-section__glow" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="section-tag">📍 Service Locations</div>
            <h2 className="font-heading font-black text-4xl md:text-5xl text-white leading-tight">
              Serving <span className="text-gradient">15+ Cities</span>
            </h2>
            <p className="font-body text-gray-400 mt-3 text-sm">And expanding to more cities every month!</p>
          </div>

          <div className="cities-section__controls">
            <button
              className="cities-section__nav-btn"
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="cities-section__nav-btn"
              onClick={() => scroll(1)}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
            <a href="#" className="btn-outline self-start md:self-auto border-white/20 text-white hover:bg-white hover:text-brand-red flex-shrink-0">
              View All Cities
              <ArrowRight size={15} />
            </a>
          </div>
        </div>

        <div className="cities-section__filmstrip" ref={stripRef}>
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </div>
    </section>
  );
}
