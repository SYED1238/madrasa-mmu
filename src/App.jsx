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

const CinematicLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTimestamp;
    const duration = 2200; // 2.2 seconds to fill
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(currentProgress));
      if (elapsed < duration) {
        window.requestAnimationFrame(step);
      } else {
        if (onComplete) onComplete();
      }
    };
    window.requestAnimationFrame(step);
  }, [onComplete]);

  const letterContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.4 }
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
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#050508',
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

        @keyframes textShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
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
          padding: 10px 0;
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

      {/* Main Content Container */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Arabic Text (Bismillah) with glim container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ marginBottom: '15px' }}
        >
          <div className="glim-container">
            <h1 className="font-amiri loader-bismillah" style={{ 
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

        {/* English Text Reveal with glim container */}
        <motion.div
          variants={letterContainer}
          initial="hidden"
          animate="visible"
          className="glim-container loader-name"
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
          transition={{ duration: 0.8, delay: 0.6 }}
          className="loader-tagline"
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
            transition={{ duration: 0.5, delay: 0.8 }}
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
            transition={{ duration: 0.5, delay: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}
          >
            {/* Left Diamond */}
            <span style={{ color: 'var(--gold)', fontSize: '10px' }}>◆</span>

            {/* Outer Bar */}
            <div className="loader-bar-outer" style={{
              width: '500px',
              height: '28px',
              border: '1px solid rgba(201, 168, 76, 0.5)',
              borderRadius: '4px',
              background: 'rgba(0,0,0,0.4)',
              position: 'relative',
              padding: '2px',
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
                transition={{ duration: 2.2, delay: 0.0, ease: "linear" }}
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
            transition={{ duration: 0.5, delay: 0.7 }}
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
            transition={{ duration: 0.8, delay: 0.9 }}
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
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <CinematicLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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
