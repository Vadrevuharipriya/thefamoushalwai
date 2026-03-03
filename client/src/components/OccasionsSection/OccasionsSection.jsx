import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { occasions } from '../../data/homeData';
import { slugify } from '../../utils/slugify';
import './OccasionsSection.scss';

function OccasionCard({ occasion, large = false, eager = false }) {
  return (
    <Link
      to={`/services/${slugify(occasion.name)}`}
      className={`occasions-section__bento-card ${large ? 'aspect-[4/3]' : 'aspect-square'}`}
    >
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

      <div className="occasions-section__bento-card-content">
        <h3 className={`font-heading font-black text-white leading-tight ${large ? 'text-xl' : 'text-sm'}`}>
          {occasion.name}
        </h3>
        <div className="flex items-center justify-between mt-1.5">
          <span className={`font-body text-brand-gold font-semibold ${large ? 'text-sm' : 'text-xs'}`}>
            Starting {occasion.price}/plate
          </span>
          <div className="w-7 h-7 rounded-full bg-brand-red flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
            <ArrowRight size={13} className="text-white" />
          </div>
        </div>
      </div>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {featured.map((occasion) => (
            <div key={occasion.id} className="md:col-span-2 row-span-1">
              <OccasionCard occasion={occasion} large eager />
            </div>
          ))}
          {rest.map((occasion) => (
            <OccasionCard key={occasion.id} occasion={occasion} />
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
