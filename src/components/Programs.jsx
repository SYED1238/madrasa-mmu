import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';

// Custom Animated SVGs for Programs
const QuranVisual = () => (
  <svg className="program-visual-svg" viewBox="0 0 100 100" fill="none">
    <rect x="10" y="10" width="80" height="80" rx="4" stroke="#c9a84c" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
    {/* Quran Book pages */}
    <path d="M20 70 C35 65, 50 72, 50 72 C50 72, 65 65, 80 70 L80 25 C65 20, 50 27, 50 27 C50 27, 35 20, 20 25 Z" stroke="#c9a84c" strokeWidth="1.8" fill="rgba(201,168,76,0.06)" />
    <path d="M50 27 L50 72" stroke="#c9a84c" strokeWidth="1.8" />
    <path d="M25 35 H45 M25 45 H45 M25 55 H45 M55 35 H75 M55 45 H75 M55 55 H75" stroke="rgba(201,168,76,0.25)" strokeWidth="0.8" />
    
    {/* Floating stars */}
    <motion.circle cx="48" cy="20" r="1.5" fill="#e8c96d" animate={{ y: [-2, -22], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeOut" }} />
    <motion.circle cx="53" cy="16" r="2" fill="#c9a84c" animate={{ y: [0, -28], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5, ease: "easeOut" }} />
    <motion.circle cx="38" cy="18" r="1" fill="#e8c96d" animate={{ y: [-1, -18], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2.2, delay: 0.8 }} />
  </svg>
);

const AalimVisual = () => (
  <svg className="program-visual-svg" viewBox="0 0 100 100" fill="none">
    {/* Bookcase outlines */}
    <path d="M15 20 L85 20 M15 50 L85 50 M15 80 L85 80" stroke="rgba(201,168,76,0.12)" strokeWidth="1.5" />
    {/* Scroll paper */}
    <path d="M32 28 L68 28 C71 28, 71 36, 68 36 L32 36 C29 36, 29 28, 32 28 Z" stroke="#c9a84c" strokeWidth="1.5" fill="rgba(201,168,76,0.08)" />
    <path d="M35 36 L35 72 C35 75, 65 75, 65 72 L65 36" stroke="#c9a84c" strokeWidth="1.5" fill="rgba(201,168,76,0.04)" />
    <path d="M32 72 L68 72 C71 72, 71 80, 68 80 L32 80 C29 80, 29 72, 32 72 Z" stroke="#c9a84c" strokeWidth="1.5" fill="rgba(201,168,76,0.08)" />
    {/* Inkwell feather */}
    <path d="M72 65 L72 75 M72 65 C75 56, 78 48, 78 38 C75 42, 73 48, 72 52" stroke="#e8c96d" strokeWidth="1" strokeLinecap="round" />
    <circle cx="72" cy="75" r="2.5" fill="#0d0d1a" stroke="#c9a84c" strokeWidth="1.2" />
    {/* Concentric waves */}
    <motion.circle cx="50" cy="54" r="1.5" fill="#e8c96d" animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0.9, 0.3] }} transition={{ repeat: Infinity, duration: 3.5 }} />
  </svg>
);

const MaktabVisual = () => (
  <svg className="program-visual-svg" viewBox="0 0 100 100" fill="none">
    {/* Arch windows backdrop */}
    <path d="M32 75 L32 40 C32 25, 43 16, 50 16 C57 16, 68 25, 68 40 L68 75 Z" stroke="rgba(201,168,76,0.15)" strokeWidth="1.5" />
    {/* Oil lamp body */}
    <path d="M35 68 C35 55, 65 55, 65 68 L65 72 C65 74, 61 76, 50 76 C39 76, 35 74, 35 72 Z" stroke="#c9a84c" strokeWidth="1.8" fill="rgba(201,168,76,0.05)" />
    <path d="M50 76 L50 80 M40 80 L60 80" stroke="#c9a84c" strokeWidth="1.2" />
    {/* Burning Flame */}
    <motion.path 
      d="M50 54 C47 60, 47 66, 50 66 C53 66, 53 60, 50 54 Z" 
      fill="#e8c96d" 
      stroke="#c9a84c" 
      strokeWidth="0.8" 
      animate={{ scaleY: [1, 1.15, 1.05, 1], y: [0, -1, 0.5, 0] }}
      transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
    />
    <motion.circle cx="50" cy="60" r="12" stroke="#e8c96d" strokeWidth="0.4" fill="transparent" opacity="0.3" animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.35, 0.1] }} transition={{ repeat: Infinity, duration: 2.2 }} />
  </svg>
);

const ArabicVisual = () => (
  <svg className="program-visual-svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="32" stroke="rgba(201,168,76,0.08)" strokeWidth="1" strokeDasharray="4 2" />
    {/* Arabic calligraphy curves */}
    <g stroke="#c9a84c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(201,168,76,0.03)">
      {/* Alif */}
      <motion.path d="M36 24 L36 62" animate={{ strokeDasharray: ["0,100", "100,0"] }} transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }} />
      {/* Ain */}
      <motion.path d="M46 40 C46 33, 58 33, 58 40 C58 46, 44 46, 44 54 C44 62, 64 62, 64 54" animate={{ pathLength: [0, 1] }} transition={{ duration: 3.2, repeat: Infinity, repeatType: "reverse" }} />
    </g>
    <circle cx="54" cy="27" r="2.2" fill="#e8c96d" />
    <circle cx="36" cy="18" r="1.5" fill="#e8c96d" />
  </svg>
);

const LanguagesVisual = () => (
  <svg className="program-visual-svg" viewBox="0 0 100 100" fill="none">
    {/* Left Book (Urdu) */}
    <rect x="22" y="32" width="28" height="42" rx="2" stroke="#c9a84c" strokeWidth="1.5" fill="rgba(201,168,76,0.06)" transform="rotate(-8 36 53)" />
    <path d="M24 38 L43 35 M22 45 L41 42 M20 52 L39 49 M18 59 L37 56" stroke="rgba(201, 168, 76, 0.3)" strokeWidth="1" transform="rotate(-8 36 53)" />
    {/* Right Book (Kannada) */}
    <rect x="50" y="30" width="28" height="42" rx="2" stroke="#e8c96d" strokeWidth="1.5" fill="rgba(232,201,109,0.06)" transform="rotate(8 64 51)" />
    <path d="M52 34 L71 37 M54 41 L73 44 M56 48 L75 51 M58 55 L77 58" stroke="rgba(232, 201, 109, 0.3)" strokeWidth="1" transform="rotate(8 64 51)" />
    {/* Connecting sweep */}
    <path d="M42 50 Q50 44 58 50" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" />
    <motion.circle cx="50" cy="47" r="2.2" fill="#e8c96d" animate={{ y: [-1, 2, -1] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }} />
  </svg>
);

const CharacterVisual = () => (
  <svg className="program-visual-svg" viewBox="0 0 100 100" fill="none">
    {/* Islamic arch backdrop */}
    <path d="M26 80 L26 46 C26 31, 38 22, 50 14 C62 22, 74 31, 74 46 L74 80 Z" stroke="rgba(201, 168, 76, 0.12)" strokeWidth="1.5" />
    {/* Glowing Heart */}
    <motion.path 
      d="M50 60 C50 60, 37 49, 37 40 C37 32, 42 27, 48 29 C50 30, 50 30, 50 30 C50 30, 50 30, 52 29 C58 27, 63 32, 63 40 C63 49, 50 60, 50 60 Z" 
      stroke="#c9a84c" 
      strokeWidth="1.8" 
      fill="rgba(201,168,76,0.05)" 
      animate={{ scale: [1, 1.05, 1], fill: ["rgba(201,168,76,0.05)", "rgba(201,168,76,0.18)", "rgba(201,168,76,0.05)"] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    />
    <motion.circle cx="50" cy="41" r="13" stroke="#e8c96d" strokeWidth="0.4" strokeDasharray="2 2" fill="transparent" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }} />
  </svg>
);

// Main Component
const Programs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [wheelTimeout, setWheelTimeout] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const sectionRef = useRef(null);
  const bottomRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const calligraphyY = useTransform(scrollYProgress, [0, 1], [-130, 130]);
  const starRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const isBottomInView = useInView(bottomRef, { once: true, margin: "-10%" });

  // Update width on resize
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  const programs = [
    {
      num: "01",
      tag: "Tahfiz",
      title: "Hifz-ul-Quran",
      subtitle: "Memorization With Tajweed",
      desc: "A dedicated sanctuary for students to memorize the Holy Quran with correct phonetics, beautiful recitation, and daily recitation audits under qualified Huffaz. Focused on long-term retention and daily discipline.",
      outcomes: [
        "Complete Quran Memorization",
        "Perfect Arabic Pronunciation (Tajweed)",
        "Daily Revision Auditing Cycles",
        "Character Alignment & Sunnah Grooming"
      ],
      visualType: "quran"
    },
    {
      num: "02",
      tag: "Scholarship",
      title: "Aalim Course",
      subtitle: "Traditional Islamic Scholarship",
      desc: "An intensive seven-year academic curriculum covering Classical Arabic grammar, Fiqh (Islamic jurisprudence), Tafseer (Quranic exegesis), and Hadith (Prophetic narrations) to groom the next generation of academic guides.",
      outcomes: [
        "Deep Jurisprudential Understanding",
        "Hadith Science Authentication Studies",
        "Classical Arabic Grammatical Mastery",
        "Rhetoric, Logic, & Community Leadership"
      ],
      visualType: "aalim"
    },
    {
      num: "03",
      tag: "Foundation",
      title: "Maktab Classes",
      subtitle: "Elementary Quranic Foundation",
      desc: "Designed for young children beginning their spiritual path. We provide essential instruction in reading the Quran (Nazra), reciting daily prayers, and acquiring core moral principles.",
      outcomes: [
        "Fluent Quranic Reading Skills",
        "Basic Daily Supplications (Duas)",
        "Core Islamic Creed & Belief Systems",
        "Ethical Character Framing (Adab)"
      ],
      visualType: "maktab"
    },
    {
      num: "04",
      tag: "Language",
      title: "Arabic Language",
      subtitle: "Classical Arabic Comprehension",
      desc: "Intensive linguistic training enabling students to read, write, and comprehend Quranic texts in their native syntax. Focusing on Sarf (morphology) and Nahw (syntax) rules.",
      outcomes: [
        "Classical Arabic Grammatical Syntax",
        "Direct Translation Capabilities",
        "Vocabulary Expansion Methodologies",
        "Interpretation of Classical Manuscripts"
      ],
      visualType: "arabic"
    },
    {
      num: "05",
      tag: "Literacy",
      title: "Urdu & Kannada",
      subtitle: "Linguistic Literacy & Bridge",
      desc: "Ensuring our students achieve high-level literacy in regional and local languages. This program facilitates effective communication, social integration, and academic bridging.",
      outcomes: [
        "Regional Literacy & Script Mastery",
        "Community Outreach Communication",
        "Social Bridge Building Competency",
        "Academic & Civic Writing Integration"
      ],
      visualType: "languages"
    },
    {
      num: "06",
      tag: "Tarbiyah",
      title: "Character Building",
      subtitle: "Ethical & Moral Cultivation",
      desc: "The most vital chapter of our educational system. We nurture prophetic ethics, self-restraint, clean manners (Adab), and a deep passion for community service in daily lives.",
      outcomes: [
        "Prophetic Character Cultivation",
        "Daily Sunnah Practice Integration",
        "Community Volunteer Opportunities",
        "Safe Peer Conflict Resolution"
      ],
      visualType: "character"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % programs.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + programs.length) % programs.length);
  };

  // Debounced scroll wheel listener
  const handleWheel = (e) => {
    if (wheelTimeout) return;
    if (Math.abs(e.deltaY) > 40 || Math.abs(e.deltaX) > 40) {
      setWheelTimeout(true);
      setTimeout(() => setWheelTimeout(false), 900); // 900ms debounce
      
      const dir = (e.deltaY || e.deltaX) > 0 ? 1 : -1;
      if (dir > 0) {
        setActiveIndex((prev) => (prev + 1) % programs.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + programs.length) % programs.length);
      }
    }
  };

  // Touch handlers for mobile swiping
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleNext();
    }
    if (touchStart - touchEnd < -75) {
      handlePrev();
    }
  };

  // Math for viewport centering
  const isMobile = viewportWidth < 768;
  const slideWidth = isMobile ? 90 : 82; // vw
  const gapWidth = isMobile ? 4 : 3; // vw
  const offsetPercent = (100 - slideWidth) / 2; // centering offset
  const trackTranslation = -activeIndex * (slideWidth + gapWidth) + offsetPercent;

  return (
    <section
      id="programs"
      ref={sectionRef}
      onWheel={handleWheel}
      style={{
        position: 'relative',
        padding: '120px 0',
        backgroundColor: '#050508',
        backgroundImage: 'radial-gradient(circle at 50% 50%, #0d0d1a 0%, #050508 75%, #020204 100%)',
        overflow: 'hidden'
      }}
    >
      <style>{`
        /* Calligraphy background text */
        .programs-calligraphy-bg {
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
        .programs-light-ray {
          position: absolute;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.035) 0%, transparent 75%);
          pointer-events: none;
          z-index: 1;
        }

        /* Slider Track Viewport */
        .programs-slider-viewport {
          width: 100%;
          overflow: visible;
          position: relative;
          padding: 30px 0;
          z-index: 5;
        }
        .programs-slider-track {
          display: flex;
          transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        /* Slide Card */
        .program-luxury-slide {
          flex-shrink: 0;
          border: 1px solid rgba(201, 168, 76, 0.12);
          background: rgba(18, 18, 31, 0.45);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border-radius: 24px;
          padding: 50px 60px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.55);
          transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
          position: relative;
          opacity: 0.35;
          transform: scale(0.95);
          cursor: none;
        }
        .program-luxury-slide.active {
          opacity: 1;
          transform: scale(1);
          border-color: rgba(201, 168, 76, 0.35);
          box-shadow: 0 30px 65px rgba(201, 168, 76, 0.08);
        }
        .program-card-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 50px;
          align-items: center;
        }

        /* Left Side Content */
        .program-slide-badge {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #c9a84c;
          text-transform: uppercase;
          border: 1px solid rgba(201, 168, 76, 0.25);
          padding: 6px 14px;
          border-radius: 20px;
          background: rgba(201, 168, 76, 0.05);
          display: inline-block;
          margin-bottom: 25px;
        }
        .program-slide-title {
          font-size: clamp(26px, 4.2vw, 42px);
          color: #ffffff;
          margin-bottom: 8px;
          font-weight: 300;
          line-height: 1.2;
        }
        .program-slide-subtitle {
          font-size: 13.5px;
          color: #c9a84c;
          letter-spacing: 1px;
          margin-bottom: 22px;
          text-transform: uppercase;
          font-weight: 600;
        }
        .program-slide-desc {
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 30px;
        }
        
        /* Outcomes Checklist */
        .program-outcomes-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 25px;
        }
        .program-outcome-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13.5px;
          color: #e6e2da;
          line-height: 1.4;
        }
        .program-outcome-bullet {
          color: #c9a84c;
          font-size: 13px;
        }

        /* Right Side Visual Box */
        .program-slide-visual-box {
          height: 300px;
          background: rgba(5, 5, 8, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.015);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .program-visual-svg {
          width: 200px;
          height: 200px;
          filter: drop-shadow(0 0 20px rgba(201,168,76,0.15));
        }

        /* Glowing overlay */
        .program-slide-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 30%, rgba(201, 168, 76, 0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Floating Navigation Chevrons */
        .program-nav-chevron {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(9, 9, 14, 0.7);
          border: 1px solid rgba(201, 168, 76, 0.3);
          color: #c9a84c;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: none;
          z-index: 10;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        }
        .program-nav-chevron:hover {
          background: #c9a84c;
          color: #050508;
          border-color: #c9a84c;
          box-shadow: 0 0 20px rgba(201, 168, 76, 0.5);
        }
        .program-nav-chevron.prev {
          left: 3vw;
        }
        .program-nav-chevron.next {
          right: 3vw;
        }

        /* Progress indicator row */
        .program-progress-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 25px;
          margin-top: 50px;
          position: relative;
          z-index: 5;
        }
        .program-progress-number {
          font-size: 16px;
          color: #ffffff;
          font-weight: 500;
          letter-spacing: 1px;
        }
        .program-progress-track {
          width: 180px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          position: relative;
          overflow: hidden;
        }
        .program-progress-fill {
          height: 100%;
          background: linear-gradient(to right, #c9a84c, #e8c96d);
          border-radius: 2px;
          transform-origin: left;
          transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        @media (max-width: 1024px) {
          .program-nav-chevron {
            display: none !important; /* Hide arrows on touch screen viewports */
          }
        }

        @media (max-width: 900px) {
          .program-card-grid {
            grid-template-columns: 1fr;
            gap: 35px;
          }
          .program-luxury-slide {
            padding: 40px 30px;
          }
          .program-slide-visual-box {
            height: 220px;
            order: -1; /* Display visual at top on mobile stack */
          }
          .program-visual-svg {
            width: 140px;
            height: 140px;
          }
          .program-outcomes-list {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .program-luxury-slide {
            padding: 30px 20px;
          }
          .program-slide-title {
            font-size: 24px;
          }
          .program-progress-track {
            width: 120px;
          }
        }
      `}</style>

      {/* Atmospheric calligraphy */}
      <motion.div style={{ y: calligraphyY, top: '10%', left: '-5%' }} className="programs-calligraphy-bg">
        طلب العلم فريضة
      </motion.div>
      <motion.div style={{ y: calligraphyY, bottom: '15%', right: '-8%' }} className="programs-calligraphy-bg">
        نور على نور
      </motion.div>

      {/* Volumetric light rays */}
      <motion.div style={{ rotate: 18, top: '-5%', left: '15%' }} className="programs-light-ray" />
      <motion.div style={{ rotate: -22, bottom: '5%', right: '12%' }} className="programs-light-ray" />

      {/* Floating gold dust particles */}
      <motion.div style={{ y: calligraphyY, top: '30%', left: '80%', width: '3.5px', height: '3.5px', backgroundColor: '#c9a84c', borderRadius: '50%', boxShadow: '0 0 8px #c9a84c', position: 'absolute', pointerEvents: 'none', zIndex: 1 }} />
      <motion.div style={{ y: calligraphyY, top: '70%', left: '14%', width: '4.5px', height: '4.5px', backgroundColor: '#e8c96d', borderRadius: '50%', boxShadow: '0 0 10px #e8c96d', position: 'absolute', pointerEvents: 'none', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 5 }}>
        
        {/* Section Intro Header */}
        <div style={{ textAlign: 'center', marginBottom: '65px', padding: '0 5%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '18px' }}>
            <motion.div initial={{ width: 0 }} whileInView={{ width: '40px' }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ height: '1px', backgroundColor: '#c9a84c' }} />
            <span style={{ color: '#c9a84c', fontSize: '12px', letterSpacing: '5px', fontWeight: '700', textTransform: 'uppercase' }}>
              Pathways Of Knowledge
            </span>
            <motion.div initial={{ width: 0 }} whileInView={{ width: '40px' }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ height: '1px', backgroundColor: '#c9a84c' }} />
          </div>

          <h2 className="font-playfair" style={{ fontSize: 'clamp(34px, 5.2vw, 56px)', color: '#ffffff', fontWeight: '300', marginBottom: '20px', lineHeight: '1.2' }}>
            Every Student Begins A<br/>Different <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>Journey</span>
          </h2>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '15.5px', maxWidth: '680px', margin: '0 auto', lineHeight: '1.7' }}>
            Discover the programs that nurture faith, knowledge, character, and lifelong learning.
          </p>
        </div>

        {/* Viewport & Horizontal Track */}
        <div 
          className="programs-slider-viewport"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Chevrons */}
          <button onClick={handlePrev} className="program-nav-chevron prev" aria-label="Previous Program">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button onClick={handleNext} className="program-nav-chevron next" aria-label="Next Program">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Slider track translation */}
          <div 
            className="programs-slider-track"
            style={{
              transform: `translateX(${trackTranslation}vw)`,
              width: `${programs.length * (slideWidth + gapWidth)}vw`
            }}
          >
            {programs.map((prog, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div 
                  key={idx}
                  className={`program-luxury-slide ${isActive ? 'active' : ''}`}
                  style={{
                    width: `${slideWidth}vw`,
                    marginRight: `${gapWidth}vw`
                  }}
                  onClick={() => setActiveIndex(idx)}
                >
                  <div className="program-slide-glow" />
                  
                  <div className="program-card-grid">
                    {/* Left Column Content */}
                    <div>
                      <span className="program-slide-badge">Pillar {prog.num} • {prog.tag}</span>
                      <h3 className="font-playfair program-slide-title">{prog.title}</h3>
                      <h4 className="program-slide-subtitle">{prog.subtitle}</h4>
                      <p className="program-slide-desc">{prog.desc}</p>

                      <div className="program-outcomes-list">
                        {prog.outcomes.map((outcome, i) => (
                          <div key={i} className="program-outcome-item">
                            <span className="program-outcome-bullet">✦</span>
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column Visual Box */}
                    <div className="program-slide-visual-box">
                      {prog.visualType === "quran" && <QuranVisual />}
                      {prog.visualType === "aalim" && <AalimVisual />}
                      {prog.visualType === "maktab" && <MaktabVisual />}
                      {prog.visualType === "arabic" && <ArabicVisual />}
                      {prog.visualType === "languages" && <LanguagesVisual />}
                      {prog.visualType === "character" && <CharacterVisual />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Progress indicator */}
        <div className="program-progress-container">
          <span className="program-progress-number">0{activeIndex + 1}</span>
          <div className="program-progress-track">
            <div 
              className="program-progress-fill" 
              style={{
                transform: `scaleX(${(activeIndex + 1) / programs.length})`
              }}
            />
          </div>
          <span className="program-progress-number" style={{ color: 'rgba(255,255,255,0.4)' }}>0{programs.length}</span>
        </div>

        {/* Bottom Statement */}
        <div ref={bottomRef} style={{ marginTop: '110px', textAlign: 'center', padding: '0 5%' }}>
          <AnimatePresence>
            {isBottomInView && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}
              >
                <span 
                  className="font-playfair text-gold" 
                  style={{ 
                    fontSize: 'clamp(22px, 3.5vw, 36px)', 
                    fontWeight: '300', 
                    lineHeight: '1.4',
                    maxWidth: '800px'
                  }}
                >
                  "Every Program. A Different Path. One Destination. Knowledge."
                </span>
                
                {/* Gold divider */}
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

export default Programs;
