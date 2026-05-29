import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section id="hero" style={{
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: '#050508',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center'
    }}>
      <style>{`
        @keyframes noiseMove {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }
        @keyframes floatUpDownCard {
          0%, 100% { transform: translateY(-8px); }
          50% { transform: translateY(8px); }
        }
        @keyframes scrollLine {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }

        .hero-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(60px, 8vw, 120px);
          font-weight: 800;
          line-height: 0.9;
          letter-spacing: -2px;
          margin: 0;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .floating-card {
            display: none;
          }
        }
      `}</style>

      {/* Static Background Image Div */}
      <div id="hero-bg" style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "url('/bismillah-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 0
      }}></div>

      {/* Dark Cinematic Overlay Gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(105deg, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.85) 40%, rgba(5,5,8,0.5) 70%, rgba(5,5,8,0.2) 100%)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>

      {/* Film Grain Overlay */}
      <div style={{
        position: 'absolute',
        top: '-50%', left: '-50%',
        width: '200%', height: '200%',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
        opacity: 0.05,
        pointerEvents: 'none',
        zIndex: 10,
        animation: 'noiseMove 8s steps(10) infinite'
      }}></div>

      {/* Bismillah Watermark */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: 0.4,
        zIndex: 4,
        pointerEvents: 'none'
      }}>
        <span className="font-amiri" style={{ color: 'var(--gold)', fontSize: '18px' }}>
          بسم الله الرحمن الرحيم
        </span>
      </div>

      {/* Main Content Container */}
      <div style={{
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        padding: '0 5%',
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        
        {/* Left Content Area */}
        <div style={{ maxWidth: '800px' }}>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}
          >
            <span style={{ color: 'var(--gold)', fontSize: '12px' }}>✦</span>
            <span style={{ 
              color: 'var(--gold-dim)', 
              fontSize: '12px', 
              textTransform: 'uppercase', 
              letterSpacing: '3px',
              fontWeight: '600'
            }}>
              Islamic Educational Institution
            </span>
          </motion.div>

          <div style={{ marginBottom: '30px' }}>
            <motion.h1
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="hero-heading"
              style={{ color: '#ffffff' }}
            >
              MADRASA
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="hero-heading"
              style={{ color: 'var(--gold)' }}
            >
              MADEENATUL
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="hero-heading"
              style={{ color: '#ffffff' }}
            >
              ULOOM
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '18px',
              lineHeight: '1.6',
              maxWidth: '450px',
              marginBottom: '40px'
            }}
          >
            Rooted in faith. Built on knowledge. Serving the Muslim community of Ramanagara since our founding.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
          >
            <Link to="admissions" smooth={true} offset={-70} duration={500}>
              <button style={{
                backgroundColor: 'var(--gold)',
                color: '#050508',
                border: 'none',
                padding: '16px 36px',
                borderRadius: '50px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(201,168,76,0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--gold-light)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 25px rgba(201,168,76,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--gold)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 20px rgba(201,168,76,0.2)';
              }}
              >
                Enroll Your Child
              </button>
            </Link>

            <Link to="about" smooth={true} offset={-70} duration={500}>
              <button style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                border: '2px solid var(--gold)',
                color: 'var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(201,168,76,0.1)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </Link>
          </motion.div>

        </div>

        {/* Right Floating Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="floating-card"
          style={{
            position: 'absolute',
            top: '20%',
            right: '5%',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '16px',
            padding: '24px',
            width: '280px',
            animation: 'floatUpDownCard 3s ease-in-out infinite'
          }}
        >
          {/* Top avatars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
            <div style={{ display: 'flex' }}>
              {['M', 'A', 'S'].map((initial, i) => (
                <div key={i} style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--gold)',
                  border: '2px solid #050508',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#050508',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginLeft: i === 0 ? '0' : '-12px',
                  zIndex: 3 - i
                }}>
                  {initial}
                </div>
              ))}
            </div>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', lineHeight: '1.2' }}>
              Trusted by the<br/>Community
            </span>
          </div>

          {/* Middle stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <div style={{ color: 'var(--gold)', fontSize: '14px', letterSpacing: '2px' }}>
              ★★★★★
            </div>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: '600' }}>
              Rated 5.0
            </span>
          </div>

          {/* Bottom location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
            <span style={{ color: 'var(--gold)', fontSize: '16px' }}>📍</span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
              Ramanagara, Karnataka
            </span>
          </div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        zIndex: 6
      }}>
        <span style={{ 
          color: 'var(--gold)', 
          fontSize: '10px', 
          letterSpacing: '3px',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          opacity: 0.6
        }}>
          SCROLL
        </span>
        <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(201,168,76,0.2)', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: '50%',
            backgroundColor: 'var(--gold)',
            animation: 'scrollLine 2s ease-in-out infinite'
          }}></div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
