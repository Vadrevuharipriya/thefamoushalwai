import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const LOGO = 'https://www.thefamoushalwai.com/frontEnd/images/logo.png';

const footerLinks = {
  Occasions: ['Wedding Functions', 'Birthday Party', 'Corporate Event', 'House Party', 'Kids Party', 'Pooja at Home', 'Baby Shower'],
  Services: ['Book Halwai & Chefs', 'Our Packages', 'Cloud Kitchen', 'Bhaji Box', 'Tiffin Services', 'Venue Booking'],
  Company: ['About Us', 'Top Professionals', 'Register as Partner', 'Customized Plate', 'Our Menu', 'Contact Us'],
};

const contactItems = [
  { icon: Phone, text: '+91-8926262674', href: 'tel:+918926262674' },
  { icon: Mail, text: 'info@thefamoushalwai.com', href: 'mailto:info@thefamoushalwai.com' },
  { icon: MapPin, text: 'Delhi NCR, India', href: '#' },
];

const socialIcons = [Facebook, Instagram, Youtube, Twitter];

export default function Footer() {
  return (
    <footer className="footer">
      {/* Partner CTA */}
      <div className="footer__partner-cta">
        <div className="footer__partner-cta-inner">
          <div className="footer__partner-cta-card">
            <div className="footer__partner-cta-glow" />
            <div className="relative">
              <h2 className="font-heading font-black text-3xl text-white mb-1">Register as a Partner</h2>
              <p className="font-body text-white/70 text-sm">
                Join our network of 500+ verified chefs &amp; caterers across India
              </p>
            </div>
            <a
              href="#"
              className="relative flex-shrink-0 bg-white text-brand-red px-8 py-3.5 rounded-full font-heading font-black text-sm hover:bg-cream hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
            >
              Register Now
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="footer__main">
        {/* Brand column */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <img src={LOGO} alt="The Famous Halwai" className="h-12 w-auto" />
            <div>
              <p className="font-heading font-black text-white text-base leading-tight">The Famous Halwai</p>
              <p className="font-body text-xs text-gray-500">Book Halwai & Catering Services</p>
            </div>
          </div>
          <p className="font-body text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
            India's most trusted platform to book verified halwais, chefs & catering services for all your occasions across 15+ cities.
          </p>

          <div className="space-y-3 mb-6">
            {contactItems.map(({ icon: Icon, text, href }) => (
              <a key={text} href={href} className="flex items-center gap-3 hover:text-brand-gold transition-colors text-sm font-body">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="text-brand-red" />
                </div>
                {text}
              </a>
            ))}
          </div>

          <div className="flex gap-2">
            {socialIcons.map((Icon, i) => (
              <a key={i} href="#" className="footer__social-icon">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-heading font-black text-white text-sm uppercase tracking-wider mb-5">{title}</h4>
            <ul className="space-y-2.5">
            {links.map((link) => {
                const to = link === 'About Us' ? '/about' : '#';
                return (
                  <li key={link}>
                    <Link to={to} className="font-body text-sm text-gray-400 hover:text-brand-gold transition-colors inline-flex items-center gap-1 group">
                      <span className="group-hover:translate-x-0.5 transition-transform">{link}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p className="font-body text-xs text-gray-600">
            © {new Date().getFullYear()} The Famous Halwai. All rights reserved.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((l) => (
              <a key={l} href="#" className="font-body text-xs text-gray-600 hover:text-gray-400 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
