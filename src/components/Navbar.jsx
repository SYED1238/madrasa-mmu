import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Programs', to: 'programs' },
    { name: 'Gallery', to: 'gallery' },
    { name: 'Admissions', to: 'admissions' },
    { name: 'Contact', to: 'contact' },
  ];

  const drawerContainerVariants = {
    hidden: { opacity: 0, y: '-100%' },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.08, delayChildren: 0.1 } 
    },
    exit: { 
      opacity: 0, 
      y: '-100%',
      transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0], staggerChildren: 0.05, staggerDirection: -1 } 
    }
  };

  const drawerItemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 120, damping: 14 } },
    exit: { opacity: 0, y: -20, filter: 'blur(4px)', transition: { duration: 0.2 } }
  };

  return (
    <>
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
          WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
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
                className="cursor-none-desktop"
                style={{
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
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div 
            className="mobile-btn cursor-none-desktop" 
            onClick={() => setMobileMenuOpen(true)}
            style={{ 
              color: 'var(--gold)', 
              fontSize: '28px',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ☰
          </div>
        </div>

        <style>{`
          .active-nav-link { color: var(--gold) !important; }
          .desktop-menu { display: none; }
          .mobile-btn { display: flex; }
          
          @media (min-width: 768px) { 
            .desktop-menu { display: flex !important; } 
            .mobile-btn { display: none !important; } 
          }
        `}</style>
      </nav>

      {/* Full-Screen Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={drawerContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(5, 5, 8, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              zIndex: 99999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden'
            }}
          >
            {/* Islamic Geometric Backdrop inside Drawer */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.03,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M 40 0 L 80 40 L 40 80 L 0 40 Z' fill='none' stroke='%23c9a84c' stroke-width='0.75'/%3E%3Ccircle cx='40' cy='40' r='16' fill='none' stroke='%23c9a84c' stroke-width='0.75'/%3E%3C/svg%3E")`,
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-none-desktop"
              style={{
                position: 'absolute',
                top: '25px',
                right: '25px',
                background: 'transparent',
                border: 'none',
                color: '#c9a84c',
                fontSize: '36px',
                zIndex: 10,
                padding: '10px'
              }}
            >
              ✕
            </button>

            {/* Arabic Calligraphy Watermark */}
            <div style={{ position: 'absolute', top: '12%', opacity: 0.08, zIndex: 1, textAlign: 'center' }}>
              <span className="font-amiri" style={{ color: '#c9a84c', fontSize: '32px' }}>
                طلب العلم فريضة على كل مسلم
              </span>
            </div>

            {/* Navigation List */}
            <div style={{ position: 'relative', zIndex: 5, display: 'flex', flexDirection: 'column', gap: '25px', alignItems: 'center', width: '100%' }}>
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={drawerItemVariants} style={{ width: '100%', textAlign: 'center' }}>
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={() => setMobileMenuOpen(false)}
                    className="drawer-nav-item cursor-none-desktop"
                    style={{
                      display: 'inline-block',
                      color: 'var(--text-primary)',
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '32px',
                      letterSpacing: '3px',
                      textDecoration: 'none',
                      padding: '10px 40px',
                      transition: 'color 0.3s ease'
                    }}
                    activeClass="active-nav-link"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Drawer Footer Details */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{ 
                position: 'absolute', 
                bottom: '8%', 
                color: 'var(--text-muted)', 
                fontSize: '12px', 
                letterSpacing: '4px',
                textTransform: 'uppercase',
                zIndex: 5,
                textAlign: 'center'
              }}
            >
              ✦ Ramanagara, Karnataka ✦
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
