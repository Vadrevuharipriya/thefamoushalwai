import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter, ArrowUpRight, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.scss';

import tfhLogo from '../../assets/logo/thf-white.svg';

const LOGO = tfhLogo;

const footerLinks = {
  Occasions: [
    { label: 'Wedding Functions', to: '/services/wedding-functions' },
    { label: 'Birthday Party', to: '/services/birthday-party' },
    { label: 'Corporate Event', to: '/services/corporate-event' },
    { label: 'House Party', to: '/services/house-party' },
    { label: 'Kids Party', to: '/services/kids-party' },
    { label: 'Pooja at Home', to: '/services/pooja-at-home' },
    { label: 'Baby Shower', to: '/services/baby-shower' },
  ],
  Services: [
    { label: 'Book Halwai & Chefs', to: '/enquiry' },
    { label: 'Our Packages', to: '/our-packages' },
    { label: 'Cloud Kitchen', to: '/cloud-kitchen' },
    { label: 'Bhaji Box', to: '/bhaji' },
    { label: 'Tiffin Services', to: '/tiffin-services' },
    { label: 'Venue Booking', to: '/venue' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Top Professionals', to: '/professionals' },
    { label: 'Testimonials', to: '/testimonials' },
    { label: 'Blog', to: '/blog' },
    { label: 'Customized Plate', to: '/our-menu' },
    { label: 'Our Menu', to: '/our-menu' },
    { label: 'Contact Us', to: '/enquiry' },
  ],
};

const contactItems = [
  { icon: Phone, text: '+91-8926262674', href: 'tel:+918926262674' },
  { icon: Mail, text: 'info@thefamoushalwai.com', href: 'mailto:info@thefamoushalwai.com' },
  { icon: MapPin, text: 'Delhi NCR, India', href: '#' },
];

const socialIcons = [Facebook, Instagram, Youtube, Twitter];

export default function Footer({ showPartnerCTA = true }) {
  const { pathname } = useLocation();
  const showPartnerLink = pathname === '/';
  
  const companyLinks = showPartnerLink 
    ? [...footerLinks.Company, { label: 'Register as Partner', to: '/partner' }]
    : footerLinks.Company;
  
  const linkSections = [
    { title: 'Occasions', links: footerLinks.Occasions },
    { title: 'Services', links: footerLinks.Services },
    { title: 'Company', links: companyLinks },
  ];

  return (
    <footer className="footer">
      {/* Partner CTA */}
      {showPartnerCTA && (
        <div className="footer__partner-cta">
          <div className="footer__partner-cta-inner">
            <div className="footer__partner-cta-card">
              <div className="footer__partner-cta-glow" />
              <div className="relative">
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mb-1">Register as a Partner</h2>
                <p className="font-body text-white/70 text-sm">
                  Join our network of 500+ verified chefs &amp; caterers across India
                </p>
              </div>
              <a
                href="/partner"
                className="relative flex-shrink-0 bg-white text-brand-red px-8 py-3.5 rounded-full font-heading font-black text-sm hover:bg-cream hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
              >
                Register Now
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main grid */}
      <div className="footer__main">
        {/* Brand column */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img src={LOGO} alt="The Famous Halwai" className="h-12 w-auto" />
            <div>
              {/* <p className="font-heading font-black text-white text-base leading-tight">The Famous Halwai</p>
              <p className="font-body text-xs text-gray-500">Book Halwai & Catering Services</p> */}
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
        {linkSections.map(({ title, links }) => (
          <div key={title}>
            <h4 className="font-heading font-black text-white text-sm uppercase tracking-wider mb-5">{title}</h4>
            <ul className="space-y-2.5">
            {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="font-body text-sm text-gray-400 hover:text-brand-gold transition-colors inline-flex items-center gap-1 group">
                      <span className="group-hover:translate-x-0.5 transition-transform">{label}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Map section */}
      <div className="footer__map">
        <div className="footer__map-inner">
          <div className="footer__map-container">
            <iframe
              title="The Famous Halwai Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0123456789!2d77.123456!3d28.654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM5JzE1LjYiTiA3N8KwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="footer__map-info">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={18} className="text-brand-red flex-shrink-0" />
              <span className="font-heading font-black text-white text-sm">Our Head Office</span>
            </div>
            <p className="font-body text-gray-400 text-sm leading-relaxed mb-4">
              B-191, Kushak No. 2, Kadhi Pur,<br />
              Near Saint Sujan Singh Gurudwara,<br />
              Delhi — 110036
            </p>
            <div className="space-y-2">
              <a href="tel:+918926262674" className="flex items-center gap-2 font-body text-sm text-gray-400 hover:text-brand-gold transition-colors">
                <Phone size={14} className="text-brand-red" />
                +91-8926262674
              </a>
              <a href="tel:+918926262675" className="flex items-center gap-2 font-body text-sm text-gray-400 hover:text-brand-gold transition-colors">
                <Phone size={14} className="text-brand-red" />
                +91-8926262675
              </a>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=B-191+Kushak+No+2+Kadhi+Pur+Delhi+110036" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm text-brand-red hover:text-brand-gold transition-colors"
              >
                <ExternalLink size={14} />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p className="font-body text-xs text-gray-600">
            © {new Date().getFullYear()} The Famous Halwai. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 pr-14 sm:pr-0">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((l) => (
              <a key={l} href="#" className="font-body text-xs text-gray-600 hover:text-gray-400 transition-colors whitespace-nowrap">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
