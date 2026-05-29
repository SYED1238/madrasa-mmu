import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--gold-dim)', position: 'relative' }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 5% 40px 5%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '50px',
          marginBottom: '60px'
        }}>
          
          {/* Column 1: Brand */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
              <span className="font-amiri text-gold" style={{ fontSize: '32px', lineHeight: '1.2' }}>م.م.ع</span>
              <span className="font-playfair" style={{ fontSize: '18px', letterSpacing: '2px', color: 'var(--text-primary)' }}>
                Madrasa e Madeenatul Uloom
              </span>
            </div>
            <p style={{ color: 'var(--gold)', fontStyle: 'italic', marginBottom: '15px' }}>
              "Where Knowledge Meets Taqwa"
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
              Operating under the distinguished M.M.U. Trust (Madras-E-Madinathul-Uloom Trust), founded by Shri Haji Syed Muneer.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '18px', marginBottom: '25px', position: 'relative' }}>
              Quick Links
              <div style={{ position: 'absolute', bottom: '-8px', left: 0, width: '40px', height: '2px', background: 'var(--gold)' }}></div>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {['Home', 'About', 'Programs', 'Gallery', 'Admissions', 'Contact'].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.toLowerCase()} 
                    smooth={true} 
                    offset={-70} 
                    duration={500}
                    style={{ color: 'var(--text-muted)', textDecoration: 'none', cursor: 'none', transition: 'color 0.3s ease' }}
                    onMouseOver={(e) => e.target.style.color = 'var(--gold)'}
                    onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
                  >
                    ➔ {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Social */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '18px', marginBottom: '25px', position: 'relative' }}>
              Visit Us
              <div style={{ position: 'absolute', bottom: '-8px', left: 0, width: '40px', height: '2px', background: 'var(--gold)' }}></div>
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
              📍 Ramanagara, Karnataka 562159<br/>
              India
            </p>
            
            {/* Social Icons (Placeholders) */}
            <div style={{ display: 'flex', gap: '15px' }}>
              {['FB', 'IG', 'YT'].map((platform, idx) => (
                <a key={idx} href="#" style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  cursor: 'none',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'var(--gold)';
                  e.target.style.color = 'var(--bg-primary)';
                  e.target.style.borderColor = 'var(--gold)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.05)';
                  e.target.style.color = 'var(--text-primary)';
                  e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', backgroundColor: '#050508' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 5%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          textAlign: 'center'
        }}>
          <p className="font-amiri" style={{ color: 'var(--gold)', fontSize: '20px', direction: 'rtl' }}>
            "وَقُل رَّبِّ زِدْنِي عِلْمًا" — Surah Ta-Ha 20:114
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            © 2025 Madrasa e Madeenatul Uloom | All Rights Reserved
          </p>
        </div>
      </div>


      
      <div style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        zIndex: 99
      }}>
        {showTopBtn && (
          <button 
            onClick={scrollToTop}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--gold)',
              color: 'var(--gold)',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease',
              opacity: showTopBtn ? 1 : 0
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'var(--gold)';
              e.target.style.color = 'var(--bg-primary)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'var(--bg-card)';
              e.target.style.color = 'var(--gold)';
            }}
          >
            ↑
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
