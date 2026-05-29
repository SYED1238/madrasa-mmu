import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Programs from './components/Programs';
import WhyUs from './components/WhyUs';
import Gallery from './components/Gallery';
import Admissions from './components/Admissions';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

const CinematicLoader = () => {
  const [particles, setParticles] = useState([]);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1 + 'px', // 1-4px
      opacity: Math.random() * 0.4 + 0.3, // 0.3-0.7
      animationDuration: Math.random() * 4 + 3 + 's', // slow rise
      delay: Math.random() * 2 + 's',
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    // Start counting at 2.0s
    const timer = setTimeout(() => {
      let startTimestamp;
      const duration = 2500; // 2.5 seconds to fill
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const currentProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(Math.floor(currentProgress));
        if (elapsed < duration) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const letterContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 1.3 }
    }
  };

  const letter = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const renderName = () => {
    const parts = [
      { text: "Madrasa ", style: {} },
      { text: "e", style: { fontStyle: 'italic', color: '#c9a84c' } },
      { text: " Madeenatul Uloom", style: {} }
    ];
    let globalIdx = 0;
    return parts.map((part) => 
      part.text.split('').map((char) => {
        globalIdx++;
        return (
          <motion.span key={globalIdx} variants={letter} style={part.style}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })
    );
  };

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 1, ease: "easeInOut" } }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "url('/loader-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

        @keyframes floatUpLoader {
          0% { transform: translateY(100vh); opacity: 0; }
          20% { opacity: var(--target-opacity); }
          100% { transform: translateY(-20vh); opacity: 0; }
        }
        @keyframes textShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatUpDownIcon {
          0%, 100% { transform: translateY(-4px); }
          50% { transform: translateY(4px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes barGlint {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500px); }
        }
        @keyframes glim {
          0% { left: -100% }
          100% { left: 150% }
        }

        .glim-container {
          position: relative;
          overflow: hidden;
          padding: 10px 0; /* padding to prevent text shadow clipping */
        }
        
        .glim-container::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.15) 40%,
            rgba(255,220,120,0.25) 50%,
            rgba(255,255,255,0.15) 60%,
            transparent 100%
          );
          animation: glim 3s ease-in-out infinite;
          animation-delay: 2s;
          pointer-events: none;
        }
      `}</style>

      {/* Dark Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        zIndex: 1
      }}></div>
      
      {/* Background Particles */}
      {particles.map((p) => (
        <div key={p.id} style={{
          position: 'absolute',
          left: p.left,
          bottom: '-10%',
          width: p.size,
          height: p.size,
          backgroundColor: 'var(--gold)',
          borderRadius: '50%',
          opacity: 0,
          '--target-opacity': p.opacity,
          animation: `floatUpLoader ${p.animationDuration} ease-in infinite`,
          animationDelay: p.delay,
          boxShadow: '0 0 5px var(--gold)',
          zIndex: 2
        }} />
      ))}

      {/* Main Content Container */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Arabic Text (Bismillah) with glim container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ marginBottom: '15px' }}
        >
          <div className="glim-container">
            <h1 className="font-amiri" style={{ 
              fontSize: '38px', 
              fontWeight: 'normal',
              margin: 0,
              background: 'linear-gradient(to right, #c9a84c 20%, #fff 40%, #c9a84c 60%, #e8c96d 80%, #c9a84c 100%)',
              backgroundSize: '200% auto',
              color: 'transparent',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              animation: 'textShimmer 4s linear infinite',
              textShadow: '0 0 30px rgba(201,168,76,0.8)'
            }}>
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </h1>
          </div>
        </motion.div>

        {/* Detailed Golden Mosque SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.8 }}
          style={{ 
            marginBottom: '35px', 
            position: 'relative',
            animation: 'floatUpDownIcon 3s ease-in-out infinite'
          }}
        >
          {/* Radial glow */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '180px', height: '180px',
            background: 'radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 60%)',
            animation: 'pulseGlow 4s infinite ease-in-out',
            zIndex: 1
          }}></div>
          
          <svg width="140" height="140" viewBox="0 0 200 200" style={{ 
            position: 'relative', 
            zIndex: 2,
            filter: 'drop-shadow(0 0 15px rgba(201,168,76,0.5))'
          }}>
            {/* Mihrab Arch */}
            <path d="M 60 160 L 60 90 C 60 60 85 40 100 20 C 115 40 140 60 140 90 L 140 160 Z" fill="none" stroke="#c9a84c" strokeWidth="3"/>
            <path d="M 66 160 L 66 92 C 66 65 88 48 100 30 C 112 48 134 65 134 92 L 134 160 Z" fill="none" stroke="#c9a84c" strokeWidth="1" strokeDasharray="3 3"/>
            
            {/* Geometric Pattern inside arch */}
            <g opacity="0.4" stroke="#c9a84c" strokeWidth="1" fill="none">
              <path d="M 100 60 L 85 80 L 100 100 L 115 80 Z" />
              <path d="M 100 100 L 85 120 L 100 140 L 115 120 Z" />
              <path d="M 85 80 L 70 100 L 85 120 L 100 100 Z" />
              <path d="M 115 80 L 100 100 L 115 120 L 130 100 Z" />
            </g>

            {/* Left Minaret */}
            <rect x="30" y="80" width="12" height="80" fill="none" stroke="#c9a84c" strokeWidth="2"/>
            <path d="M 26 80 L 46 80 L 36 40 Z" fill="#c9a84c"/>
            <rect x="25" y="100" width="22" height="4" fill="#c9a84c"/>
            <rect x="25" y="130" width="22" height="4" fill="#c9a84c"/>
            
            {/* Right Minaret */}
            <rect x="158" y="80" width="12" height="80" fill="none" stroke="#c9a84c" strokeWidth="2"/>
            <path d="M 154 80 L 174 80 L 164 40 Z" fill="#c9a84c"/>
            <rect x="153" y="100" width="22" height="4" fill="#c9a84c"/>
            <rect x="153" y="130" width="22" height="4" fill="#c9a84c"/>

            {/* Crescent and Star */}
            <path d="M 100 15 A 8 8 0 1 0 108 23 A 10 10 0 1 1 100 15 Z" fill="#c9a84c" />
            <polygon points="108,12 110,16 114,16 111,19 112,23 108,21 104,23 105,19 102,16 106,16" fill="#c9a84c"/>

            {/* Base line */}
            <rect x="20" y="160" width="160" height="4" fill="#c9a84c"/>
          </svg>
        </motion.div>

        {/* English Text Reveal with glim container */}
        <motion.div
          variants={letterContainer}
          initial="hidden"
          animate="visible"
          className="glim-container"
          style={{ 
            fontFamily: '"Cormorant Garamond", serif', 
            color: '#f0ede4', 
            fontSize: '52px',
            fontWeight: '300',
            letterSpacing: '3px',
            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
            display: 'flex',
            marginBottom: '15px'
          }}
        >
          {renderName()}
        </motion.div>

        {/* Tagline 1 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          style={{
            color: '#c9a84c',
            fontSize: '13px',
            letterSpacing: '8px',
            marginBottom: '50px',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}
        >
          <span>——</span>
          <span>ILM • IMAAN • IKHLAAS</span>
          <span>——</span>
        </motion.div>

        {/* Loading Bar Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            style={{
              color: 'rgba(201,168,76,0.7)',
              fontSize: '12px',
              letterSpacing: '6px',
              marginBottom: '12px',
              animation: 'pulseGlow 2s infinite'
            }}
          >
            L O A D I N G . . .
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}
          >
            {/* Left Diamond */}
            <span style={{ color: 'var(--gold)', fontSize: '10px' }}>◆</span>

            {/* Outer Bar */}
            <div style={{
              width: '500px',
              height: '28px',
              border: '1px solid rgba(201,168,76,0.5)',
              borderRadius: '4px',
              background: 'rgba(0,0,0,0.4)',
              position: 'relative',
              padding: '2px', // space for inner bar
            }}>
              {/* Corner Decorations */}
              <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '6px', height: '6px', borderTop: '2px solid #c9a84c', borderLeft: '2px solid #c9a84c' }}></div>
              <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '6px', height: '6px', borderTop: '2px solid #c9a84c', borderRight: '2px solid #c9a84c' }}></div>
              <div style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '6px', height: '6px', borderBottom: '2px solid #c9a84c', borderLeft: '2px solid #c9a84c' }}></div>
              <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '6px', height: '6px', borderBottom: '2px solid #c9a84c', borderRight: '2px solid #c9a84c' }}></div>

              {/* Inner Fill Bar */}
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, delay: 2.0, ease: "linear" }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, rgba(201,168,76,0.3) 0%, #c9a84c 50%, #e8c96d 70%, #c9a84c 100%)',
                  borderRadius: '3px',
                  boxShadow: '0 0 20px rgba(201,168,76,0.7), 0 0 40px rgba(201,168,76,0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Glint traveling along bar */}
                <div style={{
                  position: 'absolute',
                  top: 0, bottom: 0, width: '150px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                  animation: 'barGlint 1.5s linear infinite'
                }} />
              </motion.div>
            </div>

            {/* Right Diamond */}
            <span style={{ color: 'var(--gold)', fontSize: '10px' }}>◆</span>
          </motion.div>

          {/* Percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.0 }}
            className="font-playfair"
            style={{
              color: '#ffffff',
              fontSize: '22px',
              fontWeight: '500',
              marginBottom: '30px'
            }}
          >
            {progress}%
          </motion.div>

          {/* Bottom Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <span style={{
              color: 'rgba(201,168,76,0.6)',
              fontSize: '11px',
              letterSpacing: '5px',
              marginBottom: '10px'
            }}>
              ✦ SEEKING KNOWLEDGE • SERVING UMMAH ✦
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(201,168,76,0.4)' }}></div>
              <span style={{ color: 'var(--gold)', fontSize: '10px' }}>❖</span>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(201,168,76,0.4)' }}></div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 2.0s delay + 2.5s fill + small buffer = 4.6s total loader duration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <CinematicLoader />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        style={{ position: 'relative', width: '100%', overflow: 'hidden' }}
      >
        {/* Mouse Lighting Effect */}
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0) 70%)',
            pointerEvents: 'none',
            transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
            zIndex: 1,
            transition: 'transform 0.1s ease-out'
          }}
        />
        
        <CustomCursor />
        <Navbar />
        <Hero />
        <Stats />
        <About />
        <Programs />
        <WhyUs />
        <Gallery />
        <Admissions />
        <Testimonials />
        <Contact />
        <Footer />
      </motion.div>
    </>
  );
}

export default App;
