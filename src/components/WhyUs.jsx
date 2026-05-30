import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Custom Animated SVGs for Visuals
const ManuscriptVisual = () => {
  return (
    <svg className="pillar-visual-svg" viewBox="0 0 100 100" fill="none">
      {/* Book outline */}
      <path d="M20 75 C35 70, 50 78, 50 78 C50 78, 65 70, 80 75 L80 25 C65 20, 50 28, 50 28 C50 28, 35 20, 20 25 Z" stroke="#c9a84c" strokeWidth="1.5" fill="rgba(201,168,76,0.05)" />
      {/* Book center seam */}
      <path d="M50 28 L50 78" stroke="#c9a84c" strokeWidth="1.5" />
      {/* Text lines */}
      <path d="M25 35 Q35 32 45 35 M25 45 Q35 42 45 45 M25 55 Q35 52 45 55 M25 65 Q35 62 45 65" stroke="rgba(201,168,76,0.4)" strokeWidth="1" strokeLinecap="round" />
      <path d="M55 35 Q65 32 75 35 M55 45 Q65 42 75 45 M55 55 Q65 52 75 55 M55 65 Q65 62 75 65" stroke="rgba(201,168,76,0.4)" strokeWidth="1" strokeLinecap="round" />
      {/* Floating pages/sparks */}
      <motion.circle cx="48" cy="20" r="1.5" fill="#e8c96d" animate={{ y: [-5, -25], opacity: [0, 0.8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }} />
      <motion.circle cx="53" cy="15" r="2" fill="#c9a84c" animate={{ y: [0, -30], opacity: [0, 0.8, 0], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5, ease: "easeOut" }} />
      <motion.circle cx="40" cy="18" r="1" fill="#e8c96d" animate={{ y: [-2, -20], opacity: [0, 0.8, 0] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.8 }} />
    </svg>
  );
};

const DoorwayVisual = () => {
  return (
    <svg className="pillar-visual-svg" viewBox="0 0 100 100" fill="none">
      {/* Archway Frame */}
      <path d="M30 80 L30 45 C30 30, 40 20, 50 20 C60 20, 70 30, 70 45 L70 80 Z" stroke="#c9a84c" strokeWidth="1.5" fill="rgba(201,168,76,0.05)" />
      {/* Inner Glowing Arch */}
      <path d="M36 80 L36 47 C36 35, 42 27, 50 27 C58 27, 64 35, 64 47 L64 80 Z" stroke="rgba(232, 201, 109, 0.3)" strokeWidth="1" />
      {/* Glowing light beam rays emerging from the bottom center */}
      <motion.polygon 
        points="50,80 20,95 80,95" 
        fill="url(#goldGrad)" 
        opacity="0.15" 
        animate={{ opacity: [0.1, 0.25, 0.1] }} 
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} 
      />
      {/* Light rays at the top */}
      <motion.path d="M50 20 L50 10 M35 25 L25 15 M65 25 L75 15" stroke="#c9a84c" strokeWidth="1" strokeLinecap="round" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2.2 }} />
      <defs>
        <radialGradient id="goldGrad" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#e8c96d" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
    </svg>
  );
};

const RoadmapVisual = () => {
  return (
    <svg className="pillar-visual-svg" viewBox="0 0 100 100" fill="none">
      {/* Winding path */}
      <path d="M20 70 Q40 85 50 50 T80 30" stroke="rgba(201, 168, 76, 0.2)" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 70 Q40 85 50 50 T80 30" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" />
      {/* Milestones (circles) */}
      <circle cx="20" cy="70" r="4" fill="#0d0d1a" stroke="#c9a84c" strokeWidth="1.5" />
      <circle cx="47" cy="56" r="4" fill="#0d0d1a" stroke="#c9a84c" strokeWidth="1.5" />
      <circle cx="80" cy="30" r="4" fill="#0d0d1a" stroke="#c9a84c" strokeWidth="1.5" />
      {/* Glowing pulsing markers */}
      <motion.circle cx="20" cy="70" r="6" stroke="#e8c96d" strokeWidth="0.8" fill="transparent" animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }} transition={{ repeat: Infinity, duration: 2 }} />
      <motion.circle cx="47" cy="56" r="6" stroke="#e8c96d" strokeWidth="0.8" fill="transparent" animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }} />
      <motion.circle cx="80" cy="30" r="6" stroke="#e8c96d" strokeWidth="0.8" fill="transparent" animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }} transition={{ repeat: Infinity, duration: 2, delay: 1.2 }} />
    </svg>
  );
};

const CharacterVisual = () => {
  return (
    <svg className="pillar-visual-svg" viewBox="0 0 100 100" fill="none">
      {/* Islamic Arch outline */}
      <path d="M25 80 L25 50 C25 35, 38 25, 50 15 C62 25, 75 35, 75 50 L75 80 Z" stroke="rgba(201, 168, 76, 0.2)" strokeWidth="1.5" />
      {/* Star outline in center */}
      <g transform="translate(50, 50)">
        <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }}>
          <rect x="-15" y="-15" width="30" height="30" rx="1" stroke="#c9a84c" strokeWidth="1.2" fill="rgba(201, 168, 76, 0.05)" />
          <rect x="-15" y="-15" width="30" height="30" rx="1" stroke="#c9a84c" strokeWidth="1.2" fill="rgba(201, 168, 76, 0.05)" transform="rotate(45)" />
        </motion.g>
      </g>
      {/* Center glowing circle */}
      <circle cx="50" cy="50" r="4" fill="#e8c96d" />
      <motion.circle cx="50" cy="50" r="8" stroke="#e8c96d" strokeWidth="0.5" fill="transparent" animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ repeat: Infinity, duration: 3 }} />
    </svg>
  );
};

// Monumental Pillar Card Component
const PillarCard = ({ pillar, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="pillar-luxury-card"
      style={{
        width: '100%',
        textAlign: isUrdu ? 'right' : 'left',
        background: 'rgba(18, 18, 31, 0.4)',
        border: '1px solid rgba(201, 168, 76, 0.12)',
        display: 'block'
      }}
    >
      <div className="pillar-glow-overlay" style={{ opacity: isHovered ? 1 : 0 }} />
      <div className={`pillar-border-glow ${isHovered ? 'active' : ''}`} />

      <div style={{ position: 'relative', zIndex: 5 }}>
        {/* Top Row: Number & Label */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px', flexDirection: isUrdu ? 'row-reverse' : 'row' }}>
          <span className="font-playfair pillar-num">{pillar.num}</span>
          <span className="pillar-label">{pillar.label}</span>
        </div>

        {/* Custom SVG Visual Box */}
        <div className="pillar-visual-box">
          {pillar.visualType === "manuscript" && <ManuscriptVisual />}
          {pillar.visualType === "doorway" && <DoorwayVisual />}
          {pillar.visualType === "roadmap" && <RoadmapVisual />}
          {pillar.visualType === "character" && <CharacterVisual />}
        </div>

        {/* Headings */}
        <h3 className={`font-playfair pillar-heading ${isUrdu ? "ur-text" : ""}`}>{pillar.title}</h3>
        <h4 className={`pillar-subtitle ${isUrdu ? "ur-text" : ""}`}>{pillar.subtitle}</h4>
        <p className={`pillar-desc ${isUrdu ? "ur-text" : ""}`}>{pillar.desc}</p>

        {/* Metrics Grid */}
        <div className="pillar-metrics-grid" style={{ direction: isUrdu ? 'rtl' : 'ltr' }}>
          {(pillar.metrics || []).map((metric, i) => (
            <div key={i} className="pillar-metric-item">
              <span className="pillar-metric-val">{metric.value}</span>
              <span className={`pillar-metric-lbl ${isUrdu ? "ur-text" : ""}`}>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Main Component
const WhyUs = () => {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);
  const calligraphyY = useTransform(scrollYProgress, [0, 1], [-130, 130]);
  const starRotate = useTransform(scrollYProgress, [0, 1], [0, 75]);

  const isBottomInView = useInView(bottomRef, { once: true, margin: "-10%" });

  const translatedPillars = t('whyUs.pillars', { returnObjects: true }) || [];
  const pillarsData = [
    {
      num: "01",
      visualType: "manuscript",
      ...(translatedPillars[0] || {})
    },
    {
      num: "02",
      visualType: "doorway",
      ...(translatedPillars[1] || {})
    },
    {
      num: "03",
      visualType: "roadmap",
      ...(translatedPillars[2] || {})
    },
    {
      num: "04",
      visualType: "character",
      ...(translatedPillars[3] || {})
    }
  ];

  const calligraphyData = [
    { arabic: "العلم", english: "ILM" },
    { arabic: "الإيمان", english: "IMAAN" },
    { arabic: "الإخلاص", english: "IKHLAAS" }
  ];

  return (
    <section
      id="whyus"
      ref={containerRef}
      style={{
        position: 'relative',
        padding: '120px 5%',
        backgroundColor: '#050508',
        backgroundImage: 'radial-gradient(circle at 50% 50%, #0d0d1a 0%, #050508 75%, #020204 100%)',
        overflow: 'hidden'
      }}
    >
      <style>{`
        /* Calligraphy background text */
        .pillars-calligraphy-bg {
          position: absolute;
          font-family: 'Amiri', serif;
          font-size: 15vw;
          color: rgba(201, 168, 76, 0.02);
          user-select: none;
          pointer-events: none;
          white-space: nowrap;
          z-index: 1;
        }

        /* Light Rays */
        .pillars-light-ray {
          position: absolute;
          width: 55vw;
          height: 55vw;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.03) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        /* Connected Journey Timeline Line */
        .pillars-timeline-wrapper {
          position: relative;
          max-width: 1050px;
          margin: 90px auto 0 auto;
        }
        .pillars-path-background {
          position: absolute;
          left: 50%;
          top: 50px;
          bottom: 50px;
          width: 2px;
          background: rgba(201, 168, 76, 0.08);
          transform: translateX(-50%);
          z-index: 1;
        }
        .pillars-path-foreground {
          position: absolute;
          left: 50%;
          top: 50px;
          bottom: 50px;
          width: 2px;
          background: linear-gradient(to bottom, #c9a84c, #e8c96d, #c9a84c);
          transform: translateX(-50%);
          transform-origin: top;
          z-index: 2;
          box-shadow: 0 0 12px rgba(201, 168, 76, 0.5);
        }

        /* Alternating grid rows */
        .pillars-timeline-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 90px;
          margin-bottom: 90px;
          position: relative;
        }
        .pillars-timeline-row:last-child {
          margin-bottom: 0;
        }
        .pillars-row-half {
          position: relative;
          z-index: 5;
        }

        /* Center Calligraphy badges */
        .timeline-badge-container {
          position: absolute;
          left: 50%;
          bottom: -45px;
          transform: translate(-50%, 50%);
          z-index: 10;
        }
        .calligraphy-center-badge {
          background: #090914;
          border: 1px solid rgba(201, 168, 76, 0.35);
          border-radius: 50%;
          width: 76px;
          height: 76px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 25px rgba(201, 168, 76, 0.25), inset 0 0 10px rgba(201, 168, 76, 0.15);
          transition: all 0.4s ease;
        }
        .calligraphy-center-badge:hover {
          transform: scale(1.1);
          border-color: #e8c96d;
          box-shadow: 0 0 35px rgba(201, 168, 76, 0.5);
        }
        .badge-calligraphy-text {
          font-family: 'Amiri', serif;
          font-size: 20px;
          color: #c9a84c;
          line-height: 1;
        }
        .badge-english-text {
          font-size: 8px;
          letter-spacing: 1.5px;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-top: 1px;
        }

        /* Pillar Card Details */
        .pillar-luxury-card {
          background: rgba(18, 18, 31, 0.4);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(201, 168, 76, 0.12);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .pillar-luxury-card:hover {
          transform: translateY(-6px);
          border-color: rgba(201, 168, 76, 0.35);
          box-shadow: 0 20px 45px rgba(201, 168, 76, 0.08);
        }
        .pillar-glow-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 30%, rgba(201, 168, 76, 0.06) 0%, transparent 60%);
          pointer-events: none;
          transition: opacity 0.5s ease;
          z-index: 1;
        }
        .pillar-border-glow {
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: conic-gradient(from 0deg, transparent 65%, rgba(201, 168, 76, 0.18) 85%, transparent 100%);
          animation: rotateGlow 6s linear infinite;
          pointer-events: none;
          z-index: 2;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .pillar-border-glow.active {
          opacity: 1;
        }

        /* Visual Box container */
        .pillar-visual-box {
          width: 100%;
          height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
          background: rgba(5, 5, 8, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.015);
          border-radius: 12px;
          position: relative;
        }
        .pillar-visual-svg {
          width: 90px;
          height: 90px;
        }

        /* Card Typography */
        .pillar-num {
          font-size: 32px;
          font-weight: 300;
          color: rgba(201, 168, 76, 0.3);
          letter-spacing: 1px;
        }
        .pillar-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #c9a84c;
          text-transform: uppercase;
        }
        .pillar-heading {
          font-size: 25px;
          color: #ffffff;
          margin-bottom: 6px;
          font-weight: 400;
        }
        .pillar-subtitle {
          font-size: 13px;
          color: #c9a84c;
          margin-bottom: 16px;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        .pillar-desc {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 30px;
        }

        /* Metrics Grid inside card */
        .pillar-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 25px;
        }
        .pillar-metric-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: rgba(5, 5, 8, 0.25);
          padding: 10px 5px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.03);
          transition: all 0.3s ease;
        }
        .pillar-luxury-card:hover .pillar-metric-item {
          border-color: rgba(201, 168, 76, 0.15);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        .pillar-metric-val {
          font-size: 14.5px;
          font-weight: 700;
          color: #ffffff;
        }
        .pillar-metric-lbl {
          font-size: 9.5px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 2px;
        }

        @keyframes rotateGlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Manuscript Modal Styles */
        .manuscript-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(2, 2, 4, 0.8);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
        }
        .manuscript-modal-content {
          background: radial-gradient(circle at 50% 50%, #0e0e1a 0%, #06060c 100%);
          border: 1px solid rgba(201, 168, 76, 0.35);
          border-radius: 24px;
          width: 100%;
          max-width: 650px;
          padding: 50px 40px;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.85), 0 0 40px rgba(201, 168, 76, 0.12);
          position: relative;
          overflow: hidden;
        }

        /* Corner accents */
        .manuscript-corner {
          position: absolute;
          font-size: 14px;
          color: rgba(201, 168, 76, 0.3);
          pointer-events: none;
          user-select: none;
        }
        .manuscript-corner.top-left { top: 15px; left: 15px; }
        .manuscript-corner.top-right { top: 15px; right: 15px; }
        .manuscript-corner.bottom-left { bottom: 15px; left: 15px; }
        .manuscript-corner.bottom-right { bottom: 15px; right: 15px; }

        /* Header */
        .manuscript-header {
          text-align: center;
          margin-bottom: 25px;
        }
        .manuscript-pillar-num {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #c9a84c;
          text-transform: uppercase;
        }
        .manuscript-title {
          font-size: 30px;
          color: #ffffff;
          margin-top: 5px;
          margin-bottom: 8px;
          font-weight: 300;
        }
        .manuscript-calligraphy-icon {
          font-family: 'Amiri', serif;
          font-size: 26px;
          color: rgba(201, 168, 76, 0.5);
          line-height: 1;
        }

        /* Tab buttons */
        .manuscript-tabs-row {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 35px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 15px;
        }
        .manuscript-tab-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 11.5px;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 6px 12px;
          cursor: none;
          transition: all 0.3s ease;
          position: relative;
        }
        .manuscript-tab-btn:hover {
          color: #c9a84c;
        }
        .manuscript-tab-btn.active {
          color: #c9a84c;
          font-weight: 700;
        }
        .manuscript-tab-btn.active::after {
          content: "";
          position: absolute;
          bottom: -16px;
          left: 0;
          right: 0;
          height: 2px;
          background: #c9a84c;
          box-shadow: 0 0 10px #c9a84c;
        }

        /* Content pane */
        .manuscript-body {
          min-height: 230px;
        }
        .manuscript-arabic-verse {
          font-size: 24px;
          text-align: center;
          color: #e8c96d;
          line-height: 1.8;
          margin-bottom: 20px;
          text-shadow: 0 0 15px rgba(232, 201, 109, 0.25);
          font-family: 'Amiri', serif;
        }
        .manuscript-translation {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          line-height: 1.6;
          color: #f0ede4;
          text-align: center;
          font-style: italic;
          margin-bottom: 8px;
        }
        .manuscript-citation {
          font-size: 12px;
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 25px;
          letter-spacing: 0.5px;
        }
        .manuscript-explanation {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.65;
          text-align: justify;
        }
        .manuscript-reflection-heading {
          font-family: 'Playfair Display', serif;
          font-size: 19px;
          color: #ffffff;
          margin-bottom: 12px;
          text-align: center;
        }
        .manuscript-reflection-text {
          font-size: 14.5px;
          color: #e6e2da;
          line-height: 1.7;
          text-align: justify;
        }

        /* Close button */
        .manuscript-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.4);
          cursor: none;
          transition: all 0.3s ease;
        }
        .manuscript-close-btn:hover {
          color: #c9a84c;
          transform: scale(1.1);
        }

        @media (max-width: 900px) {
          .pillars-path-background,
          .pillars-path-foreground {
            left: 20px !important;
            transform: none !important;
            top: 40px;
            bottom: 40px;
          }
          .pillars-timeline-row {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            margin-bottom: 50px !important;
            padding-left: 45px !important;
          }
          .pillars-row-half.empty {
            display: none !important;
          }
          .timeline-badge-container {
            display: none !important; /* Hide center badges on mobile to prevent clutter */
          }
        }

        @media (max-width: 768px) {
          .manuscript-modal-content {
            height: 100%;
            max-height: 100vh;
            border-radius: 0;
            padding: 70px 20px 40px 20px;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
          }
          .manuscript-modal-overlay {
            padding: 0;
          }
          .manuscript-close-btn {
            top: 25px;
            right: 25px;
          }
        }

        @media (max-width: 480px) {
          .pillars-timeline-row {
            padding-left: 35px !important;
          }
          .pillars-path-background,
          .pillars-path-foreground {
            left: 15px !important;
          }
          .pillar-metrics-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }
        }
      `}</style>

      {/* Atmospheric calligraphy */}
      <motion.div style={{ y: calligraphyY, top: '8%', left: '-6%' }} className="pillars-calligraphy-bg">
        العلم نور
      </motion.div>
      <motion.div style={{ y: calligraphyY, bottom: '10%', right: '-8%' }} className="pillars-calligraphy-bg">
        نور على نور
      </motion.div>

      {/* Volumetric light rays */}
      <motion.div style={{ rotate: 12, top: '-5%', right: '15%' }} className="pillars-light-ray" />
      <motion.div style={{ rotate: -18, bottom: '5%', left: '8%' }} className="pillars-light-ray" />

      {/* Floating particles */}
      <motion.div style={{ y: calligraphyY, top: '22%', left: '78%', width: '3px', height: '3px', backgroundColor: '#c9a84c', borderRadius: '50%', boxShadow: '0 0 6px #c9a84c', position: 'absolute', pointerEvents: 'none', zIndex: 1 }} />
      <motion.div style={{ y: calligraphyY, top: '68%', left: '16%', width: '4px', height: '4px', backgroundColor: '#e8c96d', borderRadius: '50%', boxShadow: '0 0 8px #e8c96d', position: 'absolute', pointerEvents: 'none', zIndex: 1 }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
        
        {/* Section Intro */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '18px' }}>
            <motion.div initial={{ width: 0 }} whileInView={{ width: '40px' }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ height: '1px', backgroundColor: '#c9a84c' }} />
            <span style={{ color: '#c9a84c', fontSize: '12px', letterSpacing: '5px', fontWeight: '700', textTransform: 'uppercase' }}>
              {t('whyUs.eyebrow')}
            </span>
            <motion.div initial={{ width: 0 }} whileInView={{ width: '40px' }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ height: '1px', backgroundColor: '#c9a84c' }} />
          </div>

          {isUrdu ? (
            <h2 className="font-playfair ur-text" style={{ fontSize: 'clamp(34px, 5.2vw, 56px)', color: '#ffffff', fontWeight: '300', marginBottom: '20px', lineHeight: '1.4' }}>
              {t('whyUs.heading')}
            </h2>
          ) : (
            <h2 className="font-playfair" style={{ fontSize: 'clamp(34px, 5.2vw, 56px)', color: '#ffffff', fontWeight: '300', marginBottom: '20px', lineHeight: '1.2' }}>
              Built Upon Four<br/>Timeless <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>Pillars</span>
            </h2>
          )}
          
          <p className={isUrdu ? "ur-text" : ""} style={{ color: 'var(--text-muted)', fontSize: '15.5px', maxWidth: '720px', margin: '0 auto', lineHeight: '1.7', padding: '0 15px' }}>
            {t('whyUs.description')}
          </p>
        </div>

        {/* Alternate connected timeline wrapper */}
        <div className="pillars-timeline-wrapper">
          
          {/* Timeline lines */}
          <div className="pillars-path-background" />
          <motion.div 
            style={{ scaleY: pathScale }}
            className="pillars-path-foreground" 
          />

          {/* Render Timeline Rows */}
          {pillarsData.map((pillar, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <TimelineRow 
                key={idx}
                pillar={pillar}
                index={idx}
                isLeft={isLeft}
                calligraphyData={calligraphyData}
              />
            );
          })}

        </div>

        {/* Bottom Statement */}
        <div ref={bottomRef} style={{ marginTop: '120px', textAlign: 'center' }}>
          <AnimatePresence>
            {isBottomInView && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}
              >
                <span 
                  className={`font-playfair text-gold ${isUrdu ? "ur-text" : ""}`} 
                  style={{ 
                    fontSize: 'clamp(24px, 3.8vw, 38px)', 
                    fontWeight: '300', 
                    lineHeight: '1.4',
                    maxWidth: '850px',
                    letterSpacing: '0.5px'
                  }}
                >
                  {t('whyUs.bottomStatement')}
                </span>
                
                <span 
                  className={isUrdu ? "ur-text" : ""}
                  style={{ 
                    color: 'var(--text-muted)', 
                    fontSize: '16px', 
                    fontStyle: 'italic',
                    marginTop: '8px'
                  }}
                >
                  {t('whyUs.bottomTagline')}
                </span>
                
                {/* Scroll-reveal divider */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '20px', marginTop: '45px' }}>
                  <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.25))' }} />
                  <motion.svg style={{ rotate: starRotate, color: '#c9a84c', opacity: 0.8 }} width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="12" cy="12" r="3.5" fill="currentColor" />
                  </motion.svg>
                  <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.25))' }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

// Timeline Row helper component to isolate layout states
const TimelineRow = ({ pillar, index, isLeft, calligraphyData }) => {
  const rowRef = useRef(null);
  const isInView = useInView(rowRef, { once: true, margin: "-100px" });

  return (
    <div ref={rowRef} className="pillars-timeline-row">
      
      {/* Left Column half */}
      <div className={`pillars-row-half left-half ${isLeft ? '' : 'empty'}`}>
        {isLeft && <PillarCard pillar={pillar} isInView={isInView} />}
      </div>

      {/* Right Column half */}
      <div className={`pillars-row-half right-half ${!isLeft ? '' : 'empty'}`}>
        {!isLeft && <PillarCard pillar={pillar} isInView={isInView} />}
      </div>

      {/* Center Calligraphy Badge (positioned between rows 1-2, 2-3, 3-4) */}
      {index < 3 && (
        <div className="timeline-badge-container">
          <div 
            className="calligraphy-center-badge"
          >
            <span className="badge-calligraphy-text">{calligraphyData[index].arabic}</span>
            <span className="badge-english-text">{calligraphyData[index].english}</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default WhyUs;
