import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const isUrdu = currentLanguage === 'ur';

  const [isOpen, setIsOpen] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true); // Open by default on desktop, closed on mobile
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Detect mobile vs desktop viewports
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock scroll on mobile only when menu is open
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);

  const navLinks = [
    { name: 'Home', key: 'home', to: 'hero' },
    { name: 'About', key: 'about', to: 'about' },
    { name: 'Programs', key: 'programs', to: 'programs' },
    { name: 'Gallery', key: 'gallery', to: 'gallery' },
    { name: 'Admissions', key: 'admissions', to: 'admissions' },
    { name: 'Contact', key: 'contact', to: 'contact' },
  ];

  return (
    <>
      {/* ─────────────────────────────────────────────
         MMU BRANDING (Always visible on the left)
      ───────────────────────────────────────────── */}
      <div 
        style={{
          position: 'fixed',
          top: '25px',
          left: isMobile ? '20px' : '5%',
          zIndex: 99,
          pointerEvents: 'auto',
          transition: 'all 0.3s ease'
        }}
      >
        <Link
          to="hero"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          onSetActive={() => setActiveSection('hero')}
          className="cursor-none-desktop"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            background: 'transparent',
            border: 'none',
            padding: '4px'
          }}
        >
          <span className="font-amiri text-gold" style={{ fontSize: '24px', lineHeight: '1.2' }}>م.م.ع</span>
          <span className="font-playfair" style={{ fontSize: '14px', letterSpacing: '2px', color: 'var(--text-primary)' }}>MMU</span>
        </Link>
      </div>

      {/* ─────────────────────────────────────────────
         DESKTOP NAVIGATION SYSTEM
      ───────────────────────────────────────────── */}
      {!isMobile && (
        <AnimatePresence mode="wait">
          {isOpen ? (
            /* Open Centered Floating Pill */
            <motion.div
              key="desktop-pill"
              initial={{ y: -50, opacity: 0, x: '-50%' }}
              animate={{ y: 0, opacity: 1, x: '-50%' }}
              exit={{ y: -50, opacity: 0, x: '-50%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                position: 'fixed',
                top: '25px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                padding: '8px 24px 8px 16px',
                borderRadius: '999px',
                background: 'rgba(8, 8, 16, 0.85)',
                border: '1px solid rgba(201, 168, 76, 0.3)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(201, 168, 76, 0.1)',
                zIndex: 100,
              }}
            >
              {/* Circular Close Button */}
              <motion.button
                onClick={() => setIsOpen(false)}
                className="cursor-none-desktop"
                whileHover={{ scale: 1.1, backgroundColor: 'var(--gold)', color: '#080810', borderColor: 'var(--gold)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid rgba(201, 168, 76, 0.4)',
                  background: 'rgba(201, 168, 76, 0.05)',
                  color: 'var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'none',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  outline: 'none',
                  transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
                }}
              >
                ✕
              </motion.button>

              {/* Vertical Divider */}
              <div 
                style={{ 
                  width: '1px', 
                  height: '20px', 
                  backgroundColor: 'rgba(201, 168, 76, 0.2)', 
                  margin: '0 16px' 
                }} 
              />

              {/* Nav Items */}
              <div style={{ display: 'flex', gap: '4px', position: 'relative' }}>
                {navLinks.map((link) => {
                  const isActive = activeSection === link.to;
                  return (
                    <div key={link.key} style={{ position: 'relative' }}>
                      <Link
                        to={link.to}
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        onSetActive={() => setActiveSection(link.to)}
                        activeClass="active-nav-link"
                        className="cursor-none-desktop"
                        style={{
                          display: 'block',
                          padding: isUrdu ? '4px 18px 8px' : '8px 18px',
                          fontSize: isUrdu ? '15px' : '14px',
                          fontWeight: '500',
                          color: isActive ? '#f0ede4' : 'rgba(240, 237, 228, 0.7)',
                          textDecoration: 'none',
                          textTransform: 'uppercase',
                          letterSpacing: '1.5px',
                          transition: 'color 0.3s ease, text-shadow 0.3s ease',
                          position: 'relative',
                          zIndex: 2,
                          textShadow: isActive ? '0 0 8px rgba(201, 168, 76, 0.6)' : 'none',
                          fontFamily: isUrdu ? "'Noto Nastaliq Urdu', 'Amiri', serif" : undefined
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) e.target.style.color = 'var(--gold)';
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) e.target.style.color = 'rgba(240, 237, 228, 0.7)';
                        }}
                      >
                        {t(`navbar.${link.key}`)}
                      </Link>

                      {/* Sliding active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="desktopActiveIndicator"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(135deg, rgba(201, 168, 76, 0.18) 0%, rgba(201, 168, 76, 0.05) 100%)',
                            border: '1px solid rgba(201, 168, 76, 0.35)',
                            borderRadius: '999px',
                            boxShadow: '0 0 12px rgba(201, 168, 76, 0.25)',
                            zIndex: 1,
                            pointerEvents: 'none',
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* Closed State - Small Gold Hamburger Button */
            <motion.button
              key="desktop-hamburger"
              onClick={() => setIsOpen(true)}
              className="cursor-none-desktop"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(201, 168, 76, 0.8)', boxShadow: '0 12px 30px rgba(201, 168, 76, 0.25)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'fixed',
                top: '25px',
                right: '5%',
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: '1px solid rgba(201, 168, 76, 0.3)',
                background: 'rgba(8, 8, 16, 0.85)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 100,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5), 0 0 10px rgba(201, 168, 76, 0.15)',
                cursor: 'none',
                outline: 'none',
              }}
            >
              <span style={{ width: '20px', height: '2px', backgroundColor: 'var(--gold)', borderRadius: '2px' }} />
              <span style={{ width: '20px', height: '2px', backgroundColor: 'var(--gold)', borderRadius: '2px' }} />
              <span style={{ width: '20px', height: '2px', backgroundColor: 'var(--gold)', borderRadius: '2px' }} />
            </motion.button>
          )}
        </AnimatePresence>
      )}

      {/* ─────────────────────────────────────────────
         MOBILE NAVIGATION SYSTEM
      ───────────────────────────────────────────── */}
      {isMobile && (
        <>
          {/* Main Mobile Header closed state trigger */}
          <AnimatePresence>
            {!isOpen && (
              <motion.button
                key="mobile-hamburger"
                onClick={() => setIsOpen(true)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: 'fixed',
                  top: '25px',
                  right: '20px',
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  border: '1px solid rgba(201, 168, 76, 0.3)',
                  background: 'rgba(8, 8, 16, 0.85)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 100,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5), 0 0 10px rgba(201, 168, 76, 0.15)',
                  outline: 'none',
                }}
              >
                <span style={{ width: '20px', height: '2px', backgroundColor: 'var(--gold)', borderRadius: '2px' }} />
                <span style={{ width: '20px', height: '2px', backgroundColor: 'var(--gold)', borderRadius: '2px' }} />
                <span style={{ width: '20px', height: '2px', backgroundColor: 'var(--gold)', borderRadius: '2px' }} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Floating Mobile Card Drawer (slides in from right) */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Subtle dark underlay to keep focus on drawer, without hiding the hero section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(5, 5, 8, 0.3)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    zIndex: 100,
                  }}
                />

                {/* Floating Glassmorphism Navigation Card */}
                <motion.div
                  key="mobile-card"
                  initial={{ x: '120%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '120%', opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                  style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    bottom: '20px',
                    width: 'calc(100% - 100px)',
                    maxWidth: '280px',
                    background: 'rgba(8, 8, 16, 0.94)',
                    border: '1px solid rgba(201, 168, 76, 0.3)',
                    borderRadius: '24px',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 20px rgba(201, 168, 76, 0.15)',
                    zIndex: 101,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}
                >
                  {/* Islamic Geometric Backdrop inside Card */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0.03,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M 40 0 L 80 40 L 40 80 L 0 40 Z' fill='none' stroke='%23c9a84c' stroke-width='0.75'/%3E%3Ccircle cx='40' cy='40' r='16' fill='none' stroke='%23c9a84c' stroke-width='0.75'/%3E%3C/svg%3E")`,
                      pointerEvents: 'none',
                      zIndex: 0,
                    }}
                  />

                  {/* Islamic watermark letter mark top-left */}
                  <div 
                    style={{ 
                      fontFamily: "'Amiri', serif", 
                      color: 'var(--gold)', 
                      opacity: 0.15, 
                      fontSize: '18px', 
                      position: 'absolute', 
                      top: '28px', 
                      left: '20px',
                      zIndex: 1
                    }}
                  >
                    م.م.ع
                  </div>

                  {/* Circular Close Button at top-right */}
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      border: '1px solid rgba(201, 168, 76, 0.35)',
                      background: 'rgba(201, 168, 76, 0.05)',
                      color: 'var(--gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      zIndex: 2,
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    ✕
                  </motion.button>

                  {/* Stacked Navigation Links */}
                  <div 
                    style={{ 
                      position: 'relative', 
                      zIndex: 1, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '8px', 
                      alignItems: 'center', 
                      width: '100%',
                      marginTop: '80px',
                      padding: '0 16px'
                    }}
                  >
                    {navLinks.map((link) => {
                      const isActive = activeSection === link.to;
                      return (
                        <div key={link.key} style={{ position: 'relative', width: '100%' }}>
                          <Link
                            to={link.to}
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            onClick={() => setIsOpen(false)}
                            onSetActive={() => setActiveSection(link.to)}
                            activeClass="active-nav-link"
                            style={{
                              display: 'block',
                              color: isActive ? '#f0ede4' : 'rgba(240, 237, 228, 0.7)',
                              fontFamily: isUrdu ? "'Noto Nastaliq Urdu', 'Amiri', serif" : '"Cormorant Garamond", serif',
                              fontSize: isUrdu ? '18px' : '22px',
                              letterSpacing: '2px',
                              textTransform: 'uppercase',
                              textDecoration: 'none',
                              padding: '8px 20px',
                              textAlign: 'center',
                              transition: 'color 0.3s ease, text-shadow 0.3s ease',
                              textShadow: isActive ? '0 0 8px rgba(201, 168, 76, 0.5)' : 'none',
                            }}
                          >
                            {t(`navbar.${link.key}`)}
                          </Link>

                          {/* Vertical active indicator */}
                          {isActive && (
                            <motion.div
                              layoutId="mobileActiveIndicator"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                              style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(135deg, rgba(201, 168, 76, 0.15) 0%, rgba(201, 168, 76, 0.05) 100%)',
                                border: '1px solid rgba(201, 168, 76, 0.25)',
                                borderRadius: '12px',
                                boxShadow: '0 0 10px rgba(201, 168, 76, 0.2)',
                                zIndex: -1,
                                pointerEvents: 'none',
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Language Switcher inside mobile card */}
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0', zIndex: 10, position: 'relative' }}>
                    <LanguageSwitcher />
                  </div>

                  {/* Arabic Calligraphy Watermark */}
                  <div 
                    className="font-amiri"
                    style={{ 
                      marginTop: 'auto', 
                      marginBottom: '10px', 
                      textAlign: 'center', 
                      width: '100%', 
                      padding: '0 10px',
                      color: 'var(--gold)',
                      opacity: 0.2,
                      fontSize: '18px',
                      zIndex: 1,
                      pointerEvents: 'none',
                    }}
                  >
                    {t('navbar.motto')}
                  </div>

                  {/* Drawer Footer Details */}
                  <div 
                    style={{ 
                      textAlign: 'center', 
                      width: '100%', 
                      color: 'var(--text-muted)', 
                      fontSize: '9px', 
                      letterSpacing: '2px', 
                      textTransform: 'uppercase',
                      marginBottom: '20px',
                      opacity: 0.6,
                      zIndex: 1,
                      pointerEvents: 'none',
                    }}
                  >
                    {t('navbar.location')}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Global CSS overrides */}
      <style>{`
        .active-nav-link { 
          color: #f0ede4 !important; 
          text-shadow: 0 0 8px rgba(201, 168, 76, 0.6) !important;
        }
      `}</style>
    </>
  );
};

export default Navbar;
