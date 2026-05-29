import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Programs', to: 'programs' },
    { name: 'Gallery', to: 'gallery' },
    { name: 'Admissions', to: 'admissions' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(8, 8, 16, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201, 168, 76, 0.1)' : '1px solid transparent',
        padding: scrolled ? '15px 5%' : '25px 5%'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="font-amiri text-gold" style={{ fontSize: '24px', lineHeight: '1.2' }}>م.م.ع</span>
          <span className="font-playfair" style={{ fontSize: '14px', letterSpacing: '2px', color: 'var(--text-primary)' }}>MMU</span>
        </div>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '30px' }} className="desktop-menu">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active-nav-link"
              style={{
                cursor: 'none',
                fontSize: '15px',
                fontWeight: '500',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--gold)'}
              onMouseLeave={(e) => {
                if (!e.target.classList.contains('active-nav-link')) {
                  e.target.style.color = 'var(--text-primary)';
                }
              }}
            >
              {link.name}
              <style>{`
                .active-nav-link { color: var(--gold) !important; }
                .desktop-menu { display: none; }
                @media (min-width: 768px) { .desktop-menu { display: flex !important; } .mobile-btn { display: none; } }
              `}</style>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div 
          className="mobile-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ cursor: 'none', color: 'var(--gold)', fontSize: '24px' }}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--gold-dim)',
        maxHeight: mobileMenuOpen ? '400px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              padding: '15px 0',
              width: '100%',
              textAlign: 'center',
              color: 'var(--text-primary)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              cursor: 'none'
            }}
            activeClass="active-nav-link"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
