import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const FloatingVerseParticles = () => {
  const particles = useRef(
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.5 + 1.5,
      dur: Math.random() * 14 + 10,
      del: Math.random() * 8,
      op: Math.random() * 0.3 + 0.15
    }))
  ).current;

  return (
    <div className="verse-particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="verse-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.del}s`,
            opacity: p.op
          }}
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const calligraphyY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const mosqueY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const starRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const isContentInView = useInView(contentRef, { once: true, margin: "-10%" });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '120px 5%',
        backgroundColor: '#050508',
        backgroundImage: 'radial-gradient(circle at 50% 50%, #0c0c16 0%, #050508 70%, #020204 100%)',
        overflow: 'hidden'
      }}
    >
      <style>{`
        /* Calligraphy background text */
        .testimonials-calligraphy-bg {
          position: absolute;
          font-family: 'Amiri', serif;
          font-size: 14vw;
          color: rgba(201, 168, 76, 0.02);
          user-select: none;
          pointer-events: none;
          white-space: nowrap;
          z-index: 1;
        }

        /* Light Rays */
        .testimonials-light-ray {
          position: absolute;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.03) 0%, transparent 75%);
          pointer-events: none;
          z-index: 1;
        }

        /* Particles */
        .verse-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 2;
        }
        .verse-particle {
          position: absolute;
          background-color: #c9a84c;
          border-radius: 50%;
          box-shadow: 0 0 6px #c9a84c;
          animation: floatUpVerse linear infinite;
        }
        @keyframes floatUpVerse {
          0% { transform: translateY(20vh) scale(0.8); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(-120vh) scale(0.4); opacity: 0; }
        }

        /* Mosque silhouette vector */
        .mosque-silhouette-svg {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          pointer-events: none;
          z-index: 2;
        }

        /* Quran Quote Card Container */
        .quran-verse-card {
          max-width: 900px;
          margin: 0 auto;
          background: rgba(18, 18, 31, 0.35);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(201, 168, 76, 0.15);
          border-radius: 24px;
          padding: 60px 40px;
          text-align: center;
          position: relative;
          z-index: 5;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
        }
        .quran-verse-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.03) 0%, transparent 100%);
          border-radius: 24px;
          pointer-events: none;
        }

        /* Arabic Calligraphy Style */
        .quran-arabic-text {
          font-family: 'Amiri', serif;
          font-size: clamp(32px, 5.5vw, 64px);
          color: #ffffff;
          line-height: 1.6;
          margin-bottom: 25px;
          background: linear-gradient(to right, #ffffff 10%, #f3dec2 40%, #c9a84c 60%, #ffffff 90%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 40px rgba(201,168,76,0.35);
          font-weight: normal;
        }

        /* Calligraphy divider */
        .quran-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          gap: 20px;
          margin: 30px auto;
          max-width: 320px;
        }
        .quran-divider-line {
          height: 1px;
          flex: 1;
          background: linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent);
        }
        .quran-divider-star {
          color: #c9a84c;
          opacity: 0.8;
          display: flex;
          align-items: center;
        }

        /* English Translation Style */
        .quran-english-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(20px, 2.5vw, 28px);
          line-height: 1.6;
          color: #e6e2da;
          font-style: italic;
          margin-bottom: 12px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.6);
        }
        .quran-reference-text {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #c9a84c;
          opacity: 0.85;
          text-shadow: 0 0 10px rgba(201,168,76,0.25);
        }

        /* Impact strip styles */
        .impact-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1050px;
          margin: 60px auto 0 auto;
          background: rgba(255, 255, 255, 0.015);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(201, 168, 76, 0.1);
          border-radius: 16px;
          padding: 24px;
          position: relative;
          z-index: 5;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .impact-item {
          text-align: center;
          border-right: 1px solid rgba(201, 168, 76, 0.12);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .impact-item:last-child {
          border-right: none;
        }
        .impact-stat {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 400;
          color: #c9a84c;
          margin-bottom: 2px;
          text-shadow: 0 0 10px rgba(201,168,76,0.2);
        }
        .impact-label {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .quran-verse-card {
            padding: 45px 25px;
          }
          .impact-strip {
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          .impact-item {
            border-right: none;
            padding: 10px 0;
          }
          .impact-item:nth-child(2n) {
            border-left: 1px solid rgba(201, 168, 76, 0.1);
          }
        }

        @media (max-width: 480px) {
          .impact-strip {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          .impact-item:nth-child(2n) {
            border-left: none;
          }
        }
      `}</style>

      {/* Floating calligraphy */}
      <motion.div style={{ y: calligraphyY, top: '10%', left: '-5%' }} className="testimonials-calligraphy-bg">
        وقل رب زدني علما
      </motion.div>
      <motion.div style={{ y: calligraphyY, bottom: '15%', right: '-8%' }} className="testimonials-calligraphy-bg">
        إنما يخشى الله من عباده العلماء
      </motion.div>

      {/* Volumetric light ray */}
      <motion.div style={{ rotate: 15, top: '-10%', left: '20%' }} className="testimonials-light-ray" />
      <motion.div style={{ rotate: -25, bottom: '-5%', right: '10%' }} className="testimonials-light-ray" />

      {/* Mosque silhouette vector */}
      <motion.div style={{ y: mosqueY }} className="mosque-silhouette-svg">
        <svg style={{ width: '100%', height: '280px', opacity: 0.6 }} viewBox="0 0 1440 300" preserveAspectRatio="none">
          <path
            d="M 0 300 L 0 250 
               C 100 250, 150 240, 200 220 
               L 200 120 Q 210 110, 220 120 L 220 220
               C 250 230, 280 230, 310 210
               L 310 50 Q 320 30, 330 50 L 330 210
               C 380 230, 430 230, 480 200
               L 480 150 C 510 120, 570 120, 600 150
               L 600 200
               C 650 220, 700 220, 750 190
               L 750 70 Q 760 50, 770 70 L 770 190
               C 830 210, 890 210, 950 180
               L 950 130 C 980 100, 1040 100, 1070 130
               L 1070 180
               C 1130 200, 1190 200, 1250 180
               L 1250 80 Q 1260 60, 1270 80 L 1270 180
               C 1330 210, 1380 210, 1440 200
               L 1440 300 Z"
            fill="rgba(201, 168, 76, 0.015)"
            stroke="rgba(201, 168, 76, 0.035)"
            strokeWidth="0.8"
          />
        </svg>
      </motion.div>

      {/* Floating gold dust particles */}
      <FloatingVerseParticles />

      <div ref={contentRef} style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
        
        {/* Header Introduction */}
        <div style={{ textAlign: 'center', marginBottom: '55px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '18px' }}>
            <motion.div initial={{ width: 0 }} whileInView={{ width: '45px' }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ height: '1px', backgroundColor: '#c9a84c' }} />
            <span style={{ color: '#c9a84c', fontSize: '12px', letterSpacing: '5px', fontWeight: '700', textTransform: 'uppercase' }}>
              Divine Wisdom
            </span>
            <motion.div initial={{ width: 0 }} whileInView={{ width: '45px' }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ height: '1px', backgroundColor: '#c9a84c' }} />
          </div>

          <h2 className="font-playfair" style={{ fontSize: 'clamp(32px, 5vw, 50px)', color: '#ffffff', fontWeight: '300', marginBottom: '15px', lineHeight: '1.2' }}>
            Nurturing Minds With <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>Sacred Light</span>
          </h2>
        </div>

        {/* Quran Quote Card */}
        {isContentInView && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="quran-verse-card"
          >
            <h3 className="quran-arabic-text">
              وَقُلْ رَبِّ زِدْنِي عِلْمًا
            </h3>

            {/* Elegant Calligraphy Divider */}
            <div className="quran-divider">
              <div className="quran-divider-line" />
              <motion.div 
                className="quran-divider-star"
                style={{ rotate: starRotate }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
              </motion.div>
              <div className="quran-divider-line" />
            </div>

            <p className="quran-english-text">
              “And say: My Lord, increase me in knowledge.”
            </p>
            <span className="quran-reference-text">
              (Surah Taha 20:114)
            </span>
          </motion.div>
        )}

        {/* Compact Educational Impact strip */}
        <div className="impact-strip">
          <div className="impact-item">
            <span className="impact-stat">500+</span>
            <span className="impact-label">Students Educated</span>
          </div>
          <div className="impact-item">
            <span className="impact-stat">15+</span>
            <span className="impact-label">Years of Service</span>
          </div>
          <div className="impact-item">
            <span className="impact-stat">Quran & Hadith</span>
            <span className="impact-label">Studies Focus</span>
          </div>
          <div className="impact-item">
            <span className="impact-stat">Community</span>
            <span className="impact-label">Focused Reach</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
