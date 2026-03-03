import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cuisines } from '../../data/homeData';
import { slugify } from '../../utils/slugify';
import './CuisinesSection.scss';

function CuisineCard({ cuisine, large = false }) {
  return (
    <Link
      to={`/our-menu?cuisine=${slugify(cuisine.name)}`}
      className="cuisine-card"
    >
      <div className={`cuisine-card__media ${large ? 'cuisine-card__media--large' : 'cuisine-card__media--normal'}`}>
        <img
          src={cuisine.image}
          alt={cuisine.name}
          className="cuisine-card__img"
          onError={(e) => { e.target.src = `https://picsum.photos/400/300?u=cuisine-${cuisine.id}`; }}
        />
        <div className="cuisine-card__overlay" />
        <div className="cuisine-card__hover-tint" />

        <div className="cuisine-card__footer">
          <h3 className="cuisine-card__name">{cuisine.name}</h3>
          <div className="cuisine-card__arrow">
            <ChevronRight size={11} color="white" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CuisinesSection() {
  return (
    <section className="cuisines-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="section-tag mx-auto">🍽️ Worldwide Cuisines</div>
          <h2 className="section-heading">
            15+ Menus &amp; <span className="text-brand-red">Cuisines</span>
          </h2>
          <p className="font-body text-gray-500 mt-4 text-base">
            From North Indian comfort food to exotic continental spreads
          </p>
        </div>

        <div className="cuisines-section__grid">
          {cuisines.map((cuisine, i) => (
            <div key={cuisine.id} className={i < 2 ? 'cuisines-section__featured' : ''}>
              <CuisineCard cuisine={cuisine} large={i < 2} />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/our-menu" className="btn-red">
            Explore Full Menu
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
