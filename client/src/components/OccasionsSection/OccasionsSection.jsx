import { Link } from 'react-router-dom';
import { occasions } from '../../data/homeData';
import { slugify } from '../../utils/slugify';
import './OccasionsSection.scss';

function OccasionCardWithLabel({ occasion, large = false, eager = false }) {
  return (
    <Link
      to={`/services/${slugify(occasion.name)}`}
      className="group block"
    >
      <div className="occasions-section__bento-card aspect-[4/3]">
        <img
          src={occasion.image}
          alt={occasion.name}
          className="w-full h-full object-cover"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={(e) => { e.target.src = `https://picsum.photos/600/450?u=${occasion.id}`; }}
        />
        <div className="occasions-section__bento-card-overlay" />
        <div className="occasions-section__bento-card-hover-overlay" />
      </div>
      <h3 className={`mt-2 text-gray-800 text-center ${large ? 'text-base' : 'text-sm'}`}>
        {occasion.name}
      </h3>
    </Link>
  );
}

export default function OccasionsSection() {
  const featured = occasions.filter((o) => o.featured);
  const rest = occasions.filter((o) => !o.featured);

  return (
    <section className="occasions-section">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-tag mx-auto">🎊 Hire Us For Upcoming Events</div>
          <h2 className="section-heading">
            Best Caterers on <span className="text-brand-red">Any Occasion</span>
          </h2>
          <p className="font-body text-gray-500 mt-4 text-base max-w-xl mx-auto leading-relaxed">
            From intimate poojas to grand weddings — our verified professionals ensure a seamless, joyful experience.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-2 lg:gap-4">
          {featured.map((occasion) => (
            <div key={occasion.id} className="md:col-span-2 md:row-span-2 lg:col-span-1 lg:row-span-1">
              <OccasionCardWithLabel occasion={occasion} large eager />
            </div>
          ))}
          {rest.map((occasion) => (
            <div key={occasion.id} className="col-span-1">
              <OccasionCardWithLabel occasion={occasion} />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          {/* <a href="#" className="btn-outline">
            View All Occasions
            <ArrowRight size={16} />
          </a> */}
        </div>
      </div>
    </section>
  );
}
