import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';

const StatCounter = ({ value, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.replace(/[,+]/g, ''));
      if (start === end) return;

      const totalDuration = 2000;
      const incrementTime = Math.max(Math.floor(totalDuration / end), 15);
      
      const timer = setInterval(() => {
        start += Math.ceil(end / 80);
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="gallery-stat-box">
      <h3 className="font-playfair text-gold stat-count-num">
        {count.toLocaleString()}{suffix}
      </h3>
      <p className="stat-count-lbl">
        {label}
      </p>
    </div>
  );
};

const Gallery = () => {
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' or 'timeline'
  const [activePhoto, setActivePhoto] = useState(null); // index or null
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const ctaRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const calligraphyY = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const starRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rayRotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  const isTitleInView = useInView(titleRef, { once: true, margin: "-10%" });
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-10%" });

  // Mouse move event listeners for parallax & spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePos({ x: clientX, y: clientY });
      setMouseOffset({
        x: (clientX - innerWidth / 2) / (innerWidth / 2),
        y: (clientY - innerHeight / 2) / (innerHeight / 2)
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhoto === null) return;
      if (e.key === 'Escape') setActivePhoto(null);
      if (e.key === 'ArrowRight') navigatePhoto(1);
      if (e.key === 'ArrowLeft') navigatePhoto(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  const navigatePhoto = (direction) => {
    setActivePhoto((prev) => {
      if (prev === null) return null;
      let next = prev + direction;
      if (next < 0) next = galleryItems.length - 1;
      if (next >= galleryItems.length) next = 0;
      return next;
    });
  };

  const galleryItems = [
    {
      id: 0,
      title: "Quranic Learning",
      src: "/gallery-1.jpg",
      sizeClass: "grid-item-large-tall",
      story: "Students gather daily in concentric circles (Halaqa) to recite and memorize the Holy Quran under the guidance of certified scholars, refining Tajweed and understanding deep Tafseer.",
      animationDir: "up"
    },
    {
      id: 1,
      title: "Daily Prayers",
      src: "/gallery-2.jpg",
      sizeClass: "grid-item-medium-wide",
      story: "The spiritual focal point of Madrasa MMU. In the grand prayer hall, students stand shoulder to shoulder five times a day, cultivating discipline, congregation, and devotion.",
      animationDir: "left"
    },
    {
      id: 2,
      title: "Student Gatherings",
      src: "/gallery-3.jpg",
      sizeClass: "grid-item-normal",
      story: "Weekly assemblies provide a platform for students to practice public speaking, recite Islamic poetry (Naat), and absorb moral lectures that build community leaders.",
      animationDir: "right"
    },
    {
      id: 3,
      title: "Community Events",
      src: "/gallery-4.jpg",
      sizeClass: "grid-item-normal",
      story: "MMU serves as a neighborhood hub. We hold regular food distribution drives and charitable programs to support local families, cultivating active social responsibility.",
      animationDir: "up"
    },
    {
      id: 4,
      title: "Islamic Celebrations",
      src: "/bismillah-bg.jpg",
      sizeClass: "grid-item-large-wide",
      story: "Moments of joy and reflection. Blessed days like Eid Milad-un-Nabi are celebrated with illuminated decorations, historic narration circles, and warm gatherings.",
      animationDir: "left"
    },
    {
      id: 5,
      title: "Knowledge Sessions",
      src: "/loader-bg.jpg",
      sizeClass: "grid-item-medium-tall",
      story: "Seminars dedicated to classical theology, jurisprudence, and modern moral sciences. Students learn to contextualize Islamic teachings to solve today's challenges.",
      animationDir: "right"
    }
  ];

  const timelineEvents = [
    {
      time: "08:00 AM",
      title: "Morning Quran Memorization (Hifz)",
      desc: "Our day starts in the serene quiet of early morning. Students recite new memorizations, concentrating on proper articulation and reflection.",
      category: "Student Activities"
    },
    {
      time: "11:00 AM",
      title: "Modern Integrated Studies",
      desc: "Scholars transition to modern classrooms, covering computer literacy, science, and mathematics to equip them for both academic and professional success.",
      category: "School Events"
    },
    {
      time: "02:00 PM",
      title: "Congregational Zuhr & Ethics Lecture",
      desc: "Following congregation prayer, teachers hold open lectures focusing on Islamic character, integrity, and building community empathy.",
      category: "Religious Gatherings"
    },
    {
      time: "04:30 PM",
      title: "Evening Charity & Social Welfare",
      desc: "Putting faith into action. Students engage in packing essential relief goods and organizing welfare drives for the underprivileged in Ramanagara.",
      category: "Community Programs"
    },
    {
      time: "08:00 PM",
      title: "Isha Prayer & Weekly Spiritual Circle",
      desc: "We conclude the day under minaret lights. Students gather in the main hall for spiritual self-reflection, supplication, and community bonding.",
      category: "Religious Gatherings"
    }
  ];

  const getAnimationProps = (dir) => {
    switch (dir) {
      case "up": return { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 } };
      case "left": return { initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 } };
      case "right": return { initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 } };
      default: return { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 } };
    }
  };

  return (
    <section 
      id="gallery" 
      ref={sectionRef} 
      style={{ 
        position: 'relative', 
        padding: '120px 5%', 
        backgroundColor: '#030305',
        overflow: 'hidden' 
      }}
    >
      <style>{`
        /* Calligraphy background layer */
        .gallery-calligraphy-bg {
          position: absolute;
          font-family: 'Amiri', serif;
          font-size: 14vw;
          color: rgba(201, 168, 76, 0.035);
          user-select: none;
          pointer-events: none;
          white-space: nowrap;
          z-index: 1;
        }

        /* Ambient spotlight ray */
        .gallery-light-ray {
          position: absolute;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        /* Floating gold dust particles */
        .gallery-dust-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
        }

        /* Mode Switcher Toggle */
        .mode-toggle-btn {
          background: transparent;
          border: 1px solid rgba(201, 168, 76, 0.2);
          color: rgba(240, 237, 228, 0.6);
          padding: 10px 24px;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: none;
          transition: all 0.4s ease;
        }
        .mode-toggle-btn.active {
          background: rgba(201, 168, 76, 0.15);
          border-color: #c9a84c;
          color: #ffffff;
          box-shadow: 0 0 15px rgba(201, 168, 76, 0.25);
        }

        /* Masonry Grid */
        .gallery-masonry-container {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: 155px;
          gap: 20px;
          margin-top: 50px;
        }
        .grid-item-large-tall { grid-column: span 7; grid-row: span 3; }
        .grid-item-medium-wide { grid-column: span 5; grid-row: span 2; }
        .grid-item-normal { grid-column: span 5; grid-row: span 2; }
        .grid-item-large-wide { grid-column: span 8; grid-row: span 2; }
        .grid-item-medium-tall { grid-column: span 4; grid-row: span 3; }

        /* Gallery Item Styling */
        .gallery-cinematic-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: #080810;
          padding: 2px;
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          cursor: none;
          height: 100%;
        }
        .gallery-cinematic-card::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: conic-gradient(
            from 0deg,
            transparent 60%,
            #c9a84c 85%,
            #e8c96d 90%,
            #c9a84c 95%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          animation: rotateBorder 4s linear infinite;
        }
        .gallery-cinematic-card:hover::before {
          opacity: 1;
        }
        .gallery-cinematic-card:hover {
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(201, 168, 76, 0.15);
        }
        .gallery-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 14px;
          overflow: hidden;
          z-index: 2;
        }
        .gallery-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .gallery-cinematic-card:hover .gallery-card-img {
          transform: scale(1.06);
        }

        /* Hover Overlay Details */
        .gallery-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(3,3,5,0.95) 0%, rgba(3,3,5,0.4) 50%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 3;
        }
        .gallery-cinematic-card:hover .gallery-card-overlay {
          opacity: 1;
        }
        .gallery-overlay-lbl {
          color: #c9a84c;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .gallery-overlay-ttl {
          color: #ffffff;
          font-size: 20px;
          margin-bottom: 8px;
          font-weight: 400;
        }
        .gallery-overlay-story {
          color: rgba(240, 237, 228, 0.7);
          font-size: 12px;
          line-height: 1.5;
          margin: 0;
        }

        /* Lightbox styling */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(3, 3, 5, 0.9);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justifyContent: center;
          padding: 30px;
        }
        .lightbox-modal {
          position: relative;
          background: rgba(15, 15, 26, 0.7);
          border: 1px solid rgba(201, 168, 76, 0.25);
          border-radius: 20px;
          max-width: 900px;
          width: 100%;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.8), 0 0 40px rgba(201, 168, 76, 0.15);
          overflow: hidden;
          z-index: 10;
        }
        .lightbox-img-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          background: #000000;
        }
        .lightbox-desc-panel {
          padding: 25px 35px;
          background: rgba(8, 8, 16, 0.95);
          border-top: 1px solid rgba(201, 168, 76, 0.15);
        }

        /* Timeline view styling */
        .timeline-view-track {
          position: relative;
          max-width: 800px;
          margin: 60px auto 0 auto;
          padding: 20px 0;
        }
        .timeline-view-track::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, rgba(201,168,76,0.1), rgba(201,168,76,0.65) 50%, rgba(201,168,76,0.1));
          transform: translateX(-50%);
        }
        .timeline-event-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          margin-bottom: 50px;
          position: relative;
        }
        .timeline-event-row.left-oriented {
          flex-direction: row-reverse;
        }
        .timeline-event-side {
          width: 45%;
        }
        .timeline-center-bullet {
          position: absolute;
          left: 50%;
          top: 12px;
          width: 12px;
          height: 12px;
          background: #030305;
          border: 2px solid #c9a84c;
          box-shadow: 0 0 10px rgba(201, 168, 76, 0.7);
          transform: translate(-50%, 0) rotate(45deg);
          z-index: 5;
        }

        /* Floating statistics row */
        .gallery-stats-floatbar {
          background: rgba(255, 255, 255, 0.015);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(201, 168, 76, 0.15);
          border-radius: 20px;
          padding: 40px 30px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.4);
          margin: 90px 0;
          position: relative;
          z-index: 10;
        }
        .gallery-stat-box {
          text-align: center;
        }
        .stat-count-num {
          font-size: 36px;
          font-weight: 500;
          margin-bottom: 5px;
        }
        .stat-count-lbl {
          color: var(--text-muted);
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* Centerpiece showcase card */
        .showcase-centerpiece {
          position: relative;
          width: 100%;
          border-radius: 24px;
          overflow: hidden;
          background: #000;
          margin: 100px 0 50px 0;
          border: 1px solid rgba(201,168,76,0.25);
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
        }
        .showcase-inner {
          position: relative;
          width: 100%;
          aspect-ratio: 21/9;
          overflow: hidden;
        }
        .showcase-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(201,168,76,0.1) 0%, rgba(3,3,5,0.85) 75%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justifyContent: center;
          padding: 40px;
          z-index: 3;
        }

        /* Custom Scrollbar in Modal */
        .lightbox-desc-panel::-webkit-scrollbar {
          width: 4px;
        }
        .lightbox-desc-panel::-webkit-scrollbar-thumb {
          background: var(--gold);
          border-radius: 2px;
        }

        @media (max-width: 1024px) {
          .gallery-masonry-container {
            grid-auto-rows: 120px;
          }
          .showcase-inner {
            aspect-ratio: 16/9;
          }
        }
        @media (max-width: 768px) {
          .gallery-masonry-container {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
          }
          .grid-item-large-tall, .grid-item-medium-wide, .grid-item-normal, .grid-item-large-wide, .grid-item-medium-tall {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
            aspect-ratio: 4/3;
          }
          .gallery-stats-floatbar {
            grid-template-columns: 1fr 1fr;
            padding: 30px 15px;
          }
          .timeline-view-track::before {
            left: 20px;
            transform: none;
          }
          .timeline-event-row {
            flex-direction: column !important;
            padding-left: 45px;
            margin-bottom: 35px;
          }
          .timeline-event-side {
            width: 100%;
          }
          .timeline-center-bullet {
            left: 20px;
            transform: translate(-50%, 0) rotate(45deg);
          }
          .lightbox-overlay {
            padding: 10px !important;
          }
          .lightbox-modal {
            border-radius: 12px !important;
            max-width: 90vw !important;
            width: 90vw !important;
            max-height: 85vh !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .lightbox-img-wrapper {
            aspect-ratio: auto !important;
            max-height: 40vh !important;
            height: 40vh !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .lightbox-img-wrapper img {
            max-height: 100% !important;
            width: 100% !important;
            object-fit: contain !important;
          }
          .lightbox-desc-panel {
            padding: 15px 20px !important;
            flex: 1 1 auto !important;
            overflow-y: auto !important;
          }
          .lightbox-desc-panel h4 {
            font-size: 18px !important;
          }
          .lightbox-desc-panel p {
            font-size: 13px !important;
            line-height: 1.5 !important;
          }
          .lightbox-nav-btn {
            width: 50px !important;
            height: 50px !important;
            font-size: 24px !important;
          }
          .lightbox-prev {
            left: 10px !important;
          }
          .lightbox-next {
            right: 10px !important;
          }
          .lightbox-close {
            top: 10px !important;
            right: 15px !important;
            font-size: 32px !important;
          }
        }
      `}</style>

      {/* Floating Calligraphy Layer (Parallax) */}
      <motion.div 
        style={{ y: calligraphyY, top: '8%', left: '-5%' }}
        className="gallery-calligraphy-bg"
      >
        من سلك طريقا يلتمس فيه علما
      </motion.div>
      <motion.div 
        style={{ y: calligraphyY, bottom: '6%', right: '-10%' }}
        className="gallery-calligraphy-bg"
      >
        سهل الله له به طريقا إلى الجنة
      </motion.div>

      {/* Volumetric spotlight ray */}
      <motion.div 
        style={{ rotate: rayRotate, top: '-5%', left: '15%' }}
        className="gallery-light-ray"
      />
      <motion.div 
        style={{ rotate: rayRotate, bottom: '20%', right: '15%' }}
        className="gallery-light-ray"
      />

      {/* Rotating Background Star Polygons */}
      <motion.div 
        style={{ rotate: starRotate, top: '25%', left: '85%' }}
        className="star-decor"
        style={{ position: 'absolute', color: 'rgba(201, 168, 76, 0.08)', pointerEvents: 'none', zIndex: 1, top: '20%', right: '5%' }}
      >
        <svg width="110" height="110" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          <rect x="25" y="25" width="50" height="50" rx="1.5" />
          <rect x="25" y="25" width="50" height="50" rx="1.5" transform="rotate(45 50 50)" />
        </svg>
      </motion.div>

      {/* Twinkling Gold Particles */}
      <motion.div 
        style={{ y: calligraphyY, top: '35%', left: '10%', width: '4px', height: '4px', backgroundColor: '#c9a84c', borderRadius: '50%', boxShadow: '0 0 8px #c9a84c', position: 'absolute', pointerEvents: 'none', zIndex: 1 }}
      />
      <motion.div 
        style={{ y: calligraphyY, top: '75%', left: '80%', width: '3px', height: '3px', backgroundColor: '#e8c96d', borderRadius: '50%', boxShadow: '0 0 6px #e8c96d', position: 'absolute', pointerEvents: 'none', zIndex: 1 }}
      />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
        
        {/* Section Intro */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '40px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ height: '1px', backgroundColor: 'var(--gold)' }} 
            />
            <span style={{ color: 'var(--gold)', fontSize: '13px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
              Our Journey
            </span>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '40px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ height: '1px', backgroundColor: 'var(--gold)' }} 
            />
          </div>
          
          <h2 ref={titleRef} className="font-playfair" style={{ fontSize: 'clamp(34px, 5vw, 52px)', color: '#ffffff', fontWeight: '300', marginBottom: '15px' }}>
            {isTitleInView ? (
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Every Image Tells A Story
              </motion.span>
            ) : (
              "Every Image Tells A Story"
            )}
          </h2>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '640px', margin: '0 auto', lineHeight: '1.7', fontStyle: 'italic' }}>
            "Step inside the classrooms, prayer halls, gatherings, and moments that shape future generations of scholarship and faith."
          </p>
        </div>

        {/* View Mode Switcher Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '50px' }}>
          <button 
            className={`mode-toggle-btn ${viewMode === 'gallery' ? 'active' : ''}`}
            onClick={() => setViewMode('gallery')}
            style={{ borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px' }}
          >
            Gallery View
          </button>
          <button 
            className={`mode-toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`}
            onClick={() => setViewMode('timeline')}
            style={{ borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }}
          >
            Timeline View
          </button>
        </div>

        {/* View Rendering Container */}
        <AnimatePresence mode="wait">
          {viewMode === 'gallery' ? (
            <motion.div
              key="gallery-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="gallery-masonry-container"
              style={{
                transform: `translate(${mouseOffset.x * 6}px, ${mouseOffset.y * 4}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              {galleryItems.map((item, idx) => {
                const animProps = getAnimationProps(item.animationDir);
                return (
                  <motion.div
                    key={item.id}
                    className={item.sizeClass}
                    initial={animProps.initial}
                    whileInView={animProps.whileInView}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7 }}
                    onClick={() => setActivePhoto(idx)}
                  >
                    <div className="gallery-cinematic-card">
                      <div className="gallery-card-inner">
                        <img 
                          className="gallery-card-img"
                          src={item.src} 
                          alt={item.title} 
                        />
                        {/* Hover Overlay */}
                        <div className="gallery-card-overlay">
                          <span className="gallery-overlay-lbl">MMU Moments</span>
                          <h4 className="font-playfair gallery-overlay-ttl">{item.title}</h4>
                          <p className="gallery-overlay-story">{item.story.substring(0, 80)}...</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="timeline-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="timeline-view-track"
            >
              {timelineEvents.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div key={idx} className={`timeline-event-row ${isLeft ? 'left-oriented' : ''}`}>
                    
                    {/* Bullet diamond */}
                    <div className="timeline-center-bullet" />
                    
                    {/* Time block */}
                    <div className="timeline-event-side" style={{ display: 'flex', justifyContent: isLeft ? 'flex-end' : 'flex-start', padding: '5px 15px' }}>
                      <span className="font-playfair text-gold" style={{ fontSize: '24px', fontWeight: 'bold', textShadow: '0 0 10px rgba(201,168,76,0.3)' }}>
                        {item.time}
                      </span>
                    </div>

                    {/* Card block */}
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6 }}
                      className="timeline-event-side"
                    >
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.015)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(201, 168, 76, 0.12)',
                        borderRadius: '12px',
                        padding: '20px 24px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                      }}>
                        <span style={{ color: '#c9a84c', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>
                          {item.category}
                        </span>
                        <h4 className="font-playfair" style={{ fontSize: '18px', color: '#ffffff', marginBottom: '8px', fontWeight: 'normal' }}>
                          {item.title}
                        </h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', lineHeight: '1.6', margin: 0 }}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Statistics Floating Counters Section */}
        <div className="gallery-stats-floatbar">
          <StatCounter value="25000" suffix="+" label="Hours Of Learning" />
          <StatCounter value="500" suffix="+" label="Students Educated" />
          <StatCounter value="15" suffix="+" label="Years Of Service" />
          <StatCounter value="12000" suffix="+" label="Community Impact" />
        </div>

        {/* Featured Showcase Centerpiece Section */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="showcase-centerpiece"
          style={{
            transform: `translate(${mouseOffset.x * -4}px, ${mouseOffset.y * -4}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="showcase-inner">
            <img 
              src="/bismillah-bg.jpg" 
              alt="Where Faith Meets Knowledge" 
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.45
              }}
            />
            {/* Ambient soft glow overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              boxShadow: 'inset 0 0 60px rgba(201, 168, 76, 0.45)',
              zIndex: 2,
              pointerEvents: 'none'
            }} />
            
            {/* Cinematic text overlay */}
            <div className="showcase-overlay">
              
              {/* Ornate calligraphy border accents */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', opacity: 0.7 }}>
                <div style={{ width: '30px', height: '1px', backgroundColor: '#c9a84c' }} />
                <span className="font-amiri" style={{ color: '#c9a84c', fontSize: '20px' }}>الحكمة</span>
                <div style={{ width: '30px', height: '1px', backgroundColor: '#c9a84c' }} />
              </div>

              <h3 className="font-playfair text-gold" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 'normal', textAlign: 'center', margin: 0, textShadow: '0 0 25px rgba(201,168,76,0.45)' }}>
                Where Faith Meets Knowledge
              </h3>
              
              <p style={{ color: 'rgba(240, 237, 228, 0.7)', fontSize: '13px', letterSpacing: '4px', textTransform: 'uppercase', marginTop: '15px' }}>
                ✦ Madrasa e Madeenatul Uloom Ramanagara ✦
              </p>
              
            </div>
          </div>
        </motion.div>

        {/* Bottom Reveal CTA */}
        <div ref={ctaRef} style={{ marginTop: '100px', textAlign: 'center' }}>
          <AnimatePresence>
            {isCtaInView && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="font-playfair" style={{ fontSize: 'clamp(26px, 4.5vw, 42px)', fontWeight: '300', color: '#ffffff', lineHeight: '1.4', marginBottom: '10px' }}>
                  Every Generation Leaves A Legacy.
                </h3>
                <h3 className="font-playfair text-gold" style={{ fontSize: 'clamp(26px, 4.5vw, 42px)', fontWeight: '300', lineHeight: '1.4', marginBottom: '40px' }}>
                  Every Student Carries It Forward.
                </h3>
                
                {/* Luxury Gold Button linking to programs */}
                <a 
                  href="#programs" 
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96d 50%, #c9a84c 100%)',
                    color: '#050508',
                    border: 'none',
                    padding: '16px 42px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    borderRadius: '50px',
                    cursor: 'none',
                    transition: 'all 0.4s ease',
                    boxShadow: '0 8px 24px rgba(201, 168, 76, 0.25)',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 30px rgba(201, 168, 76, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 24px rgba(201, 168, 76, 0.25)';
                  }}
                >
                  Explore Our Programs
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Lightbox Experience Overlay */}
      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setActivePhoto(null)}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="lightbox-modal"
              onClick={(e) => e.stopPropagation()} // prevent overlay click from closing
            >
              
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="lightbox-close"
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '20px',
                  background: 'transparent',
                  border: 'none',
                  color: '#c9a84c',
                  fontSize: '28px',
                  cursor: 'none',
                  zIndex: 20
                }}
              >
                &times;
              </button>

              {/* Navigation Left Arrow */}
              <button
                onClick={() => navigatePhoto(-1)}
                className="lightbox-nav-btn lightbox-prev"
                style={{
                  position: 'absolute',
                  left: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(3,3,5,0.6)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  color: '#c9a84c',
                  fontSize: '20px',
                  cursor: 'none',
                  zIndex: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(201,168,76,0.2)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(3,3,5,0.6)'}
              >
                &#10094;
              </button>

              {/* Navigation Right Arrow */}
              <button
                onClick={() => navigatePhoto(1)}
                className="lightbox-nav-btn lightbox-next"
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(3,3,5,0.6)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  color: '#c9a84c',
                  fontSize: '20px',
                  cursor: 'none',
                  zIndex: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(201,168,76,0.2)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(3,3,5,0.6)'}
              >
                &#10095;
              </button>

              {/* Image Frame */}
              <div className="lightbox-img-wrapper">
                <img
                  src={galleryItems[activePhoto].src}
                  alt={galleryItems[activePhoto].title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>

              {/* Details Panel */}
              <div className="lightbox-desc-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 className="font-playfair" style={{ color: '#ffffff', fontSize: '22px', margin: 0, fontWeight: 'normal' }}>
                    {galleryItems[activePhoto].title}
                  </h4>
                  <span style={{ color: '#c9a84c', fontSize: '13px', fontWeight: '500', letterSpacing: '1px' }}>
                    Photo {activePhoto + 1} of {galleryItems.length}
                  </span>
                </div>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: '1.6', margin: 0 }}>
                  {galleryItems[activePhoto].story}
                </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Gallery;
