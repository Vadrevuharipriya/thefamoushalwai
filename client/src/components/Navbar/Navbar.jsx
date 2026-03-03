import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X, Phone, ChevronRight } from 'lucide-react';
import { navOccasions } from '../../data/homeData';
import { slugify } from '../../utils/slugify';
import logoImage from '../../assets/logo/logo.png';
import './Navbar.scss';

const services = {
  Cater: ['Our Packages', 'Cloud Kitchen', 'Bhaji Box', 'Venue Booking'],
  Halwai: ['Chef & Halwai', 'Bhaji Box', 'Venue Booking'],
  "Mom's Magic": ['Chutney Services', 'Pickle / Achhar', 'Tiffin Services'],
};

function MegaDropdown({ open, onClose }) {
  if (!open) return null;
  const cols = [navOccasions.slice(0, 6), navOccasions.slice(6, 12), navOccasions.slice(12, 18)];
  return (
    <div
      className="mega-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-glass border border-border z-50 p-6 w-[640px]"
      onMouseLeave={onClose}
    >
      <p className="text-xs font-heading font-bold uppercase tracking-widest text-gray-400 mb-4">
        Browse by Occasion
      </p>
      <div className="grid grid-cols-3 gap-1">
        {cols.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-0.5">
            {col.map((occ) => (
              <Link
                key={occ}
                to={`/services/${slugify(occ)}`}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-cream hover:text-brand-red rounded-lg transition-all duration-150 group font-body"
              >
                {occ}
                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesDropdown({ open, onClose }) {
  const [sub, setSub] = useState(null);
  if (!open) return null;
  return (
    <div
      className="services-dropdown absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-glass border border-border z-50 w-56 py-2"
      onMouseLeave={() => { setSub(null); onClose(); }}
    >
      {Object.entries(services).map(([group, items]) => (
        <div key={group} className="relative">
          <button
            onMouseEnter={() => setSub(group)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-cream hover:text-brand-red rounded-lg mx-1 transition-colors font-body"
            style={{ width: 'calc(100% - 8px)' }}
          >
            {group}
            <ChevronRight size={13} className="text-gray-400" />
          </button>
          {sub === group && (
            <div
              onMouseEnter={() => setSub(group)}
              className="absolute left-full top-0 bg-white rounded-2xl shadow-glass border border-border z-50 w-48 py-2 ml-1"
            >
              {items.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-cream hover:text-brand-red transition-colors font-body"
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const open = (name) => { clearTimeout(closeTimer.current); setOpenDropdown(name); };
  const close = () => { closeTimer.current = setTimeout(() => setOpenDropdown(null), 200); };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.1)]'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2.5">
            <img src={logoImage} alt="The Famous Halwai" className="h-11 w-auto" />
            {/* <span className="hidden sm:block font-heading font-black text-gray-900 text-base leading-tight">
              The Famous<br /><span className="text-brand-red">Halwai</span>
            </span> */}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <div className="relative" onMouseEnter={() => open('occasion')} onMouseLeave={close}>
              <button
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-body font-semibold rounded-xl transition-all duration-200 ${
                  openDropdown === 'occasion' ? 'bg-cream text-brand-red' : 'text-gray-700 hover:bg-cream hover:text-brand-red'
                }`}
              >
                Occasion
                <ChevronDown size={14} className={`transition-transform ${openDropdown === 'occasion' ? 'rotate-180' : ''}`} />
              </button>
              <MegaDropdown open={openDropdown === 'occasion'} onClose={close} />
            </div>

            <div className="relative" onMouseEnter={() => open('services')} onMouseLeave={close}>
              <button
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-body font-semibold rounded-xl transition-all duration-200 ${
                  openDropdown === 'services' ? 'bg-cream text-brand-red' : 'text-gray-700 hover:bg-cream hover:text-brand-red'
                }`}
              >
                Our Services
                <ChevronDown size={14} className={`transition-transform ${openDropdown === 'services' ? 'rotate-180' : ''}`} />
              </button>
              <ServicesDropdown open={openDropdown === 'services'} onClose={close} />
            </div>

            {[
              { label: 'Customized Plate', to: '/our-menu' },
              { label: 'Book Halwai & Chefs', to: '#' },
              { label: 'Register as Partner', to: '#' },
            ].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="px-4 py-2 text-sm font-body font-semibold text-gray-700 hover:bg-cream hover:text-brand-red rounded-xl transition-all duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+918926262674"
              className="hidden md:flex items-center gap-1.5 text-sm font-heading font-bold text-gray-700 hover:text-brand-red transition-colors"
            >
              <Phone size={15} className="text-brand-red" />
              +91-89262 62674
            </a>
            <a
              href="#"
              className="hidden lg:inline-flex items-center gap-2 bg-red-gradient text-white px-5 py-2.5 rounded-full text-sm font-heading font-bold shadow-red hover:shadow-[0_8px_24px_rgba(193,39,45,0.5)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Book Now
            </a>
            <button
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-cream transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu lg:hidden bg-white border-t border-border shadow-glass">
          <div className="px-5 py-5 space-y-4 max-h-[80vh] overflow-y-auto">
            <a href="#" className="block px-2 py-2 text-sm font-semibold text-gray-700 hover:text-brand-red font-body">
              Occasions
            </a>
            {[
              { label: 'Customized Plate', to: '/our-menu' },
              { label: 'Book Halwai & Chefs', to: '#' },
              { label: 'Register as Partner', to: '#' },
            ].map(({ label, to }) => (
              <Link key={label} to={to} className="block px-2 py-2 text-sm font-semibold text-gray-700 hover:text-brand-red font-body">
                {label}
              </Link>
            ))}
            <a href="#" className="block bg-red-gradient text-white text-center px-4 py-3 rounded-full text-sm font-heading font-bold shadow-red">
              Book Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
