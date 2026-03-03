import { Star, Award } from 'lucide-react';
import { professionals } from '../../data/homeData';
import './ProfessionalsSection.scss';

function ProfCard({ pro }) {
  return (
    <div className="prof-card">
      <div className="prof-card__image-wrap">
        <img
          src={pro.image}
          alt={pro.name}
          className="prof-card__img"
          onError={(e) => { e.target.src = `https://i.pravatar.cc/300?u=${pro.id}-pro`; }}
        />
        <div className="prof-card__overlay" />
        <div className="prof-card__badge">{pro.events}+ events</div>
      </div>

      <div className="prof-card__info">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-heading font-black text-white text-base leading-tight">{pro.name}</h3>
            <p className="font-body text-white/60 text-xs mt-0.5">{pro.role}</p>
          </div>
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1">
            <Star size={11} fill="#DA9100" className="text-brand-gold" />
            <span className="text-white text-xs font-bold">{pro.rating}</span>
          </div>
        </div>
        <div className="flex gap-0.5 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={10}
              fill={i < Math.floor(pro.rating) ? '#DA9100' : 'none'}
              className={i < Math.floor(pro.rating) ? 'text-brand-gold' : 'text-white/30'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProfessionalsSection() {
  return (
    <section className="prof-section">
      <div className="prof-section__glow-left" />
      <div className="prof-section__glow-right" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="section-tag">
              <Award size={12} />
              Top Rated Professionals
            </div>
            <h2 className="font-heading font-black text-4xl md:text-5xl text-white leading-tight">
              Well Trained &<br /><span className="text-gradient">Background Verified</span>
            </h2>
          </div>
          <a href="#" className="btn-outline self-start md:self-auto border-white/20 text-white hover:bg-white hover:text-brand-red">
            View All Professionals
          </a>
        </div>

        <div className="prof-section__scroll-row">
          {professionals.map((pro) => (
            <ProfCard key={pro.id} pro={pro} />
          ))}
        </div>
      </div>
    </section>
  );
}
