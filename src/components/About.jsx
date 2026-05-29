import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';

const CounterUp = ({ value, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.replace(/[,+]/g, ''));
      if (start === end) return;

      const totalDuration = 2000; // 2 seconds
      const incrementTime = Math.max(Math.floor(totalDuration / end), 15);
      
      const timer = setInterval(() => {
        start += Math.ceil(end / 80); // increment steps
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

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="metric-card"
    >
      <h3 className="font-playfair text-gold metric-number">
        {formatNumber(count)}{suffix}
      </h3>
      <p className="metric-label">
        {label}
      </p>
    </motion.div>
  );
};

// Illuminated Islamic Manuscript Modal Component
const ManuscriptModal = ({ index, onClose, referenceData }) => {
  const [activeTab, setActiveTab] = useState('quran'); // 'quran' | 'hadith' | 'reflection'
  const data = referenceData[index];

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="manuscript-modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 15, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="manuscript-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating background particles */}
        <div className="manuscript-particles" />
        
        {/* Close Button */}
        <button className="manuscript-close-btn" onClick={onClose} aria-label="Close Reference">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Modal Header */}
        <div className="manuscript-header">
          <span className="manuscript-pillar-num">Pillar {data.num}</span>
          <h2 className="font-playfair manuscript-title">{data.name}</h2>
          <div className="manuscript-calligraphy-icon">{data.arabicName}</div>
        </div>

        {/* Tab Selection */}
        <div className="manuscript-tabs-row">
          {['quran', 'hadith', 'reflection'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`manuscript-tab-btn ${activeTab === tab ? 'active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Content Pane */}
        <div className="manuscript-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="manuscript-tab-pane"
            >
              {activeTab === 'quran' && (
                <div>
                  <div className="manuscript-arabic-verse font-amiri">{data.quran.arabic}</div>
                  <div className="manuscript-translation">"{data.quran.translation}"</div>
                  <div className="manuscript-citation">{data.quran.citation}</div>
                  <p className="manuscript-explanation">{data.quran.explanation}</p>
                </div>
              )}

              {activeTab === 'hadith' && (
                <div>
                  <div className="manuscript-arabic-verse font-amiri">{data.hadith.arabic}</div>
                  <div className="manuscript-translation">"{data.hadith.translation}"</div>
                  <div className="manuscript-citation">{data.hadith.citation}</div>
                  <p className="manuscript-explanation">{data.hadith.explanation}</p>
                </div>
              )}

              {activeTab === 'reflection' && (
                <div>
                  <div className="manuscript-reflection-heading">MMU Spiritual Integration</div>
                  <p className="manuscript-reflection-text">{data.reflection.text}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Ornate corner vectors for Islamic Manuscript look */}
        <div className="manuscript-corner top-left">✦</div>
        <div className="manuscript-corner top-right">✦</div>
        <div className="manuscript-corner bottom-left">✦</div>
        <div className="manuscript-corner bottom-right">✦</div>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const bottomRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax calculations
  const calligraphyY = useTransform(scrollYProgress, [0, 1], [-180, 180]);
  const starRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const particleY = useTransform(scrollYProgress, [0, 1], [80, -220]);
  const rayRotate = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  const isTitleInView = useInView(titleRef, { once: true, margin: "-10%" });
  const isBottomInView = useInView(bottomRef, { once: true, margin: "-10%" });

  const [activeModal, setActiveModal] = useState(null);

  const referenceData = [
    {
      num: "01",
      name: "Ilm (Knowledge)",
      arabicName: "العلم",
      quran: {
        arabic: "قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ",
        translation: "Say, 'Are those who know equal to those who do not know?'",
        citation: "Surah Az-Zumar 39:9",
        explanation: "Knowledge elevates a believer. The Quran repeatedly emphasizes that those endowed with knowledge possess a deeper understanding of reality, spiritual direction, and a higher standing before Allah."
      },
      hadith: {
        arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
        translation: "Seeking knowledge is an obligation upon every Muslim.",
        citation: "Sunan Ibn Majah",
        explanation: "Acquiring knowledge is not a luxury or optional pursuit in Islam; it is an active spiritual duty binding on every individual, regardless of gender or social status."
      },
      reflection: {
        text: "Knowledge (Ilm) is the foundation of action. Without understanding, worship lacks depth and character lacks direction. At MMU, we make high-quality Islamic learning accessible to everyone through professional scholars."
      }
    },
    {
      num: "02",
      name: "Imaan (Faith)",
      arabicName: "الإيمان",
      quran: {
        arabic: "إِنَّمَا الْمُؤْمِنُونَ الَّذِينَ إِذَا ذُكِرَ اللَّهُ وَجِلَتْ قُلُوبُهُمْ",
        translation: "The believers are only those who, when Allah is mentioned, their hearts become fearful.",
        citation: "Surah Al-Anfal 8:2",
        explanation: "True faith (Imaan) is not merely a verbal statement; it is a profound emotional state that softens the heart, creating awe and reverence whenever Allah is remembered."
      },
      hadith: {
        arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
        translation: "None of you truly believes until he loves for his brother what he loves for himself.",
        citation: "Sahih Al-Bukhari & Sahih Muslim",
        explanation: "Genuine faith is inextricably linked to how we treat others. Seeking success, safety, and guidance for our fellow brothers and sisters is a core parameter of Imaan."
      },
      reflection: {
        text: "Faith (Imaan) is a seed that must be watered with action and community service. We foster a supportive environment where students cultivate deep personal connection with their Creator and display empathy for humanity."
      }
    },
    {
      num: "03",
      name: "Ikhlaas (Sincerity)",
      arabicName: "الإخلاص",
      quran: {
        arabic: "وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ",
        translation: "And they were not commanded except to worship Allah, being sincere to Him in religion.",
        citation: "Surah Al-Bayyinah 98:5",
        explanation: "Every act of worship must be directed solely to Allah. Sincerity (Ikhlaas) is the spiritual filter that ensures our religious deeds are accepted and free from ostentation."
      },
      hadith: {
        arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
        translation: "Actions are judged by intentions.",
        citation: "Sahih Al-Bukhari",
        explanation: "The value of any deed lies in the underlying intention. A simple worldly action performed with a pure intention can earn immense reward, while a spiritual deed done for show has no value."
      },
      reflection: {
        text: "Sincerity (Ikhlaas) is the soul of our actions. We teach our students to continuously audit their intentions, seeking only the pleasure of Allah in their learning, teaching, and serving journeys."
      }
    }
  ];

  const titleWords = [
    { text: "More", gold: false },
    { text: "Than", gold: false },
    { text: "A", gold: false },
    { text: "Madrasa.", gold: true, italic: true },
    { text: "A", gold: false },
    { text: "Legacy", gold: true },
    { text: "Of", gold: false },
    { text: "Knowledge.", gold: true }
  ];

  const titleContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const titleWordVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="about" 
      ref={containerRef}
      style={{
        position: 'relative',
        padding: '120px 5%',
        backgroundColor: '#080810',
        backgroundImage: 'radial-gradient(circle at 50% 0%, #0c0c1a 0%, #080810 70%, #050508 100%)',
        overflow: 'hidden'
      }}
    >
      <style>{`
        /* Calligraphy backdrop */
        .calligraphy-bg-text {
          position: absolute;
          font-family: 'Amiri', serif;
          font-size: 15vw;
          color: rgba(201, 168, 76, 0.04);
          user-select: none;
          pointer-events: none;
          white-space: nowrap;
          z-index: 1;
        }

        /* Ambient Rays */
        .ambient-light-ray {
          position: absolute;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        /* Metric card styling */
        .metric-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(201, 168, 76, 0.12);
          border-radius: 16px;
          padding: 30px 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease;
        }
        .metric-card:hover {
          border-color: rgba(201, 168, 76, 0.35);
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(201, 168, 76, 0.1);
        }
        .metric-number {
          font-size: 42px;
          font-weight: 600;
          margin-bottom: 5px;
          text-shadow: 0 0 15px rgba(201, 168, 76, 0.25);
        }
        .metric-label {
          color: var(--text-muted);
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* Value cards styling */
        .value-card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 80px;
          position: relative;
          z-index: 2;
        }
        .value-card {
          position: relative;
          background: rgba(255, 255, 255, 0.015);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(201, 168, 76, 0.12);
          border-radius: 16px;
          padding: 45px 30px;
          text-align: center;
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          overflow: hidden;
        }
        .value-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(201, 168, 76, 0.06) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .value-card:hover {
          transform: translateY(-8px);
          border-color: rgba(201, 168, 76, 0.45);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(201, 168, 76, 0.15);
        }
        .value-card:hover::before {
          opacity: 1;
        }
        .value-icon-container {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(201, 168, 76, 0.05);
          border: 1px solid rgba(201, 168, 76, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px auto;
          color: #c9a84c;
          transition: background 0.4s ease, border-color 0.4s ease;
        }
        .value-card:hover .value-icon-container {
          background: rgba(201, 168, 76, 0.12);
          border-color: rgba(201, 168, 76, 0.5);
          box-shadow: 0 0 15px rgba(201, 168, 76, 0.3);
        }

        /* Centerpiece visual traveling light border */
        .border-light-card {
          position: relative;
          border-radius: 20px;
          padding: 2px;
          background: rgba(201, 168, 76, 0.12);
          overflow: hidden;
          transition: background 0.5s ease, box-shadow 0.5s ease;
        }
        .border-light-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
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
        .border-light-card:hover::before {
          opacity: 1;
        }
        .border-light-card:hover {
          background: transparent;
          box-shadow: 0 0 35px rgba(201, 168, 76, 0.22);
        }
        @keyframes rotateBorder {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Timeline and content split */
        .about-split-container {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          margin-top: 60px;
          align-items: start;
        }

        .about-sanctuary-container {
          position: sticky;
          top: 120px;
        }

        /* Parallax stars */
        .star-decor {
          position: absolute;
          color: rgba(201, 168, 76, 0.1);
          pointer-events: none;
          z-index: 1;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .timeline-container-custom {
          position: relative;
          padding-left: 20px;
        }
        .timeline-line-custom {
          position: absolute;
          left: 20px;
          top: 10px;
          bottom: 10px;
          width: 1px;
          background: linear-gradient(to bottom, rgba(201, 168, 76, 0.1), rgba(201,168,76,0.65) 50%, rgba(201, 168, 76, 0.1));
        }
        .timeline-item-custom {
          position: relative;
          margin-bottom: 40px;
        }
        .timeline-diamond-custom {
          position: absolute;
          left: -5px;
          top: 8px;
          width: 11px;
          height: 11px;
          background-color: #080810;
          border: 2px solid #c9a84c;
          box-shadow: 0 0 10px rgba(201,168,76,0.7);
          transform: rotate(45deg);
          z-index: 3;
        }
        .timeline-card-custom {
          margin-left: 28px;
          background: rgba(255,255,255,0.015);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(201,168,76,0.12);
          padding: 22px 28px;
          borderRadius: 12px;
          box-shadow: 0 8px 32px 0 rgba(0,0,0,0.3);
        }

        @media (max-width: 1024px) {
          .about-split-container {
            grid-template-columns: 1fr;
            gap: 50px;
          }
          .about-sanctuary-container {
            position: relative !important;
            top: 0 !important;
            max-width: 500px;
            margin: 40px auto 0 auto;
          }
          .value-card-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
        @media (max-width: 768px) {
          .value-card-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .metrics-grid-container {
            grid-template-columns: 1fr 1fr !important;
            gap: 15px !important;
          }
          .metric-number {
            font-size: 32px !important;
          }
          .timeline-card-custom {
            margin-left: 20px !important;
            padding: 16px 18px !important;
          }
          .timeline-container-custom {
            padding-left: 10px !important;
          }
          .timeline-line-custom {
            left: 10px !important;
          }
        }

        /* Explore Indicator on Cards */
        .explore-indicator {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 20px;
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(201, 168, 76, 0.5);
          transition: all 0.3s ease;
          opacity: 0.7;
        }
        .value-card:hover .explore-indicator {
          color: #e8c96d;
          opacity: 1;
          text-shadow: 0 0 8px rgba(201, 168, 76, 0.4);
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

        /* Card Background Artworks */
        .value-card > *:not(.card-bg-art) {
          position: relative;
          z-index: 2;
        }
        .card-bg-art {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          pointer-events: none;
          z-index: 0;
          mix-blend-mode: color-dodge;
          opacity: 0.08;
          transform: scale(1.0);
          transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          mask-image: radial-gradient(circle, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 80%);
          -webkit-mask-image: radial-gradient(circle, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 80%);
        }
        .value-card:hover .card-bg-art {
          opacity: 0.16;
          transform: scale(1.04);
        }
        .ilm-art {
          background-image: url('/ilm-bg.png');
        }
        .imaan-art {
          background-image: url('/imaan-bg.png');
        }
        .ikhlaas-art {
          background-image: url('/ikhlaas-bg.png');
        }
      `}</style>

      {/* Parallax background calligraphy */}
      <motion.div style={{ y: calligraphyY, top: '10%', left: '-10%' }} className="calligraphy-bg-text">
        العلم نور والجهل ظلام
      </motion.div>
      <motion.div style={{ y: calligraphyY, bottom: '5%', right: '-15%' }} className="calligraphy-bg-text">
        إقرأ باسم ربك الذي خلق
      </motion.div>

      {/* Parallax ambient rays */}
      <motion.div style={{ rotate: rayRotate, top: '-5%', right: '10%' }} className="ambient-light-ray" />
      <motion.div style={{ rotate: rayRotate, bottom: '15%', left: '5%' }} className="ambient-light-ray" />

      {/* Star decorations */}
      <motion.div style={{ rotate: starRotate, top: '25%', left: '80%' }} className="star-decor">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          <rect x="25" y="25" width="50" height="50" rx="1" />
          <rect x="25" y="25" width="50" height="50" rx="1" transform="rotate(45 50 50)" />
        </svg>
      </motion.div>
      <motion.div style={{ rotate: starRotate, bottom: '30%', left: '5%' }} className="star-decor">
        <svg width="90" height="90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6">
          <circle cx="50" cy="50" r="30" />
          <rect x="30" y="30" width="40" height="40" rx="1" transform="rotate(30 50 50)" />
          <rect x="30" y="30" width="40" height="40" rx="1" transform="rotate(60 50 50)" />
        </svg>
      </motion.div>

      {/* Floating particles */}
      <motion.div style={{ y: particleY, top: '40%', left: '20%', width: '4px', height: '4px', backgroundColor: '#c9a84c', borderRadius: '50%', boxShadow: '0 0 10px #c9a84c', position: 'absolute', pointerEvents: 'none', zIndex: 1 }} />
      <motion.div style={{ y: particleY, top: '70%', left: '75%', width: '3px', height: '3px', backgroundColor: '#e8c96d', borderRadius: '50%', boxShadow: '0 0 8px #e8c96d', position: 'absolute', pointerEvents: 'none', zIndex: 1 }} />
      <motion.div style={{ y: particleY, top: '15%', left: '45%', width: '5px', height: '5px', backgroundColor: '#c9a84c', borderRadius: '50%', boxShadow: '0 0 12px #c9a84c', position: 'absolute', pointerEvents: 'none', zIndex: 1 }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
        
        {/* Top Header Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <motion.div initial={{ width: 0 }} whileInView={{ width: '40px' }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ height: '1px', backgroundColor: '#c9a84c' }} />
            <span style={{ color: '#c9a84c', fontSize: '13px', letterSpacing: '5px', fontWeight: '600', textTransform: 'uppercase' }}>
              Our Legacy
            </span>
            <motion.div initial={{ width: 0 }} whileInView={{ width: '40px' }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ height: '1px', backgroundColor: '#c9a84c' }} />
          </div>
        </div>

        {/* Word reveal Title */}
        <div style={{ textAlign: 'center', marginBottom: '25px', padding: '0 10px' }}>
          <motion.div ref={titleRef} variants={titleContainerVariants} initial="hidden" animate={isTitleInView ? "visible" : "hidden"} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', rowGap: '5px' }}>
            {titleWords.map((word, idx) => (
              <motion.span
                key={idx}
                variants={titleWordVariants}
                className="font-playfair"
                style={{
                  fontSize: 'clamp(34px, 5.5vw, 56px)',
                  fontWeight: '300',
                  marginRight: '12px',
                  display: 'inline-block',
                  fontStyle: word.italic ? 'italic' : 'normal',
                  color: word.gold ? '#c9a84c' : '#ffffff',
                  textShadow: word.gold ? '0 0 20px rgba(201,168,76,0.2)' : 'none'
                }}
              >
                {word.text}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            maxWidth: '780px',
            margin: '0 auto 60px auto',
            textAlign: 'center',
            fontSize: '16px',
            lineHeight: '1.8',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            padding: '0 15px'
          }}
        >
          "For years, Madrasa-e-Madeenatul Uloom has served as a sanctuary of Quranic scholarship, Islamic values, character development, and selfless community empowerment in Ramanagara."
        </motion.p>

        {/* Split Section: Timeline & Centerpiece visual */}
        <div className="about-split-container">
          
          {/* Left Column: Timeline */}
          <div style={{ position: 'relative', paddingLeft: '15px' }}>
            <h3 className="font-playfair text-gold" style={{ fontSize: '28px', fontWeight: '400', marginBottom: '35px', paddingLeft: '15px' }}>
              Spiritual Milestones
            </h3>

            <div className="timeline-container-custom">
              {/* Vertical line */}
              <div className="timeline-line-custom" />

              {/* Timeline Items */}
              {[
                { year: '2007', title: 'Foundation of MMU Trust', desc: 'Founded under the noble guidance of Shri Haji Syed Muneer to build a strong educational foundation and welfare network in Ramanagara.' },
                { year: '2009', title: 'Beginning of Quranic Education', desc: 'Commenced dedicated Nazira and Hifz classes, introducing a rigorous curriculum of Tajweed (pronunciation) and spiritual refinement.' },
                { year: '2014', title: 'Hundreds of Students Educated', desc: 'Expanded capacity to host hundreds of children. Our doors remain open to all students, offering education, lodging, and books entirely free.' },
                { year: '2020', title: 'Community Development Initiatives', desc: 'Launched extensive community outreach drives, distributing food packets, support resources, and hosting civic engagement programs.' },
                { year: 'Present & Future', title: 'Modern Digital Integration', desc: 'Incorporating modern computer literacy programs and digital tools alongside our traditional curriculum, preparing scholars for contemporary leadership.' }
              ].map((item, idx) => (
                <div key={idx} className="timeline-item-custom">
                  {/* Diamond Node */}
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0.3 }}
                    whileInView={{ scale: 1.1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 150, damping: 12 }}
                    className="timeline-diamond-custom"
                  />
                  
                  {/* Glassmorphic card */}
                  <motion.div
                    initial={{ opacity: 0, x: 25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="timeline-card-custom"
                  >
                    <span style={{ color: '#c9a84c', fontFamily: '"Cormorant Garamond", serif', fontSize: '15px', letterSpacing: '2px', fontWeight: '600' }}>
                      {item.year}
                    </span>
                    <h4 className="font-playfair" style={{ fontSize: '20px', color: '#ffffff', marginTop: '4px', marginBottom: '8px', fontWeight: 'normal' }}>
                      {item.title}
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
                      {item.desc}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Centerpiece Visual */}
          <div className="about-sanctuary-container">
            <h3 className="font-playfair text-gold" style={{ fontSize: '28px', fontWeight: '400', marginBottom: '35px', textAlign: 'center' }}>
              The Sanctuary
            </h3>
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="border-light-card">
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '18px', overflow: 'hidden', background: '#040408', zIndex: 2 }}>
                <img src="/about-madrasa.png" alt="Madrasa Sanctuary" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, filter: 'contrast(1.05) brightness(0.95)' }} />
                <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 35px rgba(201,168,76,0.3)', zIndex: 3, pointerEvents: 'none' }} />
                
                {/* Mihrab Arch Overlay SVG */}
                <svg style={{ position: 'absolute', inset: 12, width: 'calc(100% - 24px)', height: 'calc(100% - 24px)', pointerEvents: 'none', zIndex: 5 }} viewBox="0 0 100 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="cardGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e8c96d" />
                      <stop offset="50%" stopColor="#c9a84c" />
                      <stop offset="100%" stopColor="#8c702b" />
                    </linearGradient>
                  </defs>
                  <path d="M 5 115 L 5 40 C 5 20 30 10 50 2 C 70 10 95 20 95 40 L 95 115 Z" fill="none" stroke="url(#cardGoldGrad)" strokeWidth="1.2" opacity="0.65" />
                  <path d="M 8 115 L 8 42 C 8 24 32 14 50 6 C 68 14 92 24 92 42 L 92 115 Z" fill="none" stroke="url(#cardGoldGrad)" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.4" />
                  <circle cx="50" cy="2" r="1.5" fill="#e8c96d" />
                </svg>

                {/* Twinkling stars */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }}>
                  <div style={{ position: 'absolute', top: '20%', left: '30%', width: '4px', height: '4px', backgroundColor: '#e8c96d', borderRadius: '50%', boxShadow: '0 0 8px #e8c96d', animation: 'twinkle 4s infinite' }} />
                  <div style={{ position: 'absolute', top: '45%', left: '70%', width: '3px', height: '3px', backgroundColor: '#c9a84c', borderRadius: '50%', boxShadow: '0 0 6px #c9a84c', animation: 'twinkle 5s infinite', animationDelay: '1s' }} />
                  <div style={{ position: 'absolute', top: '75%', left: '40%', width: '5px', height: '5px', backgroundColor: '#fff', borderRadius: '50%', boxShadow: '0 0 10px #fff', opacity: 0.5, animation: 'twinkle 3s infinite', animationDelay: '2s' }} />
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Metrics/Impact Section */}
        <div style={{ marginTop: '100px', position: 'relative', zIndex: 10 }}>
          <h3 className="font-playfair text-gold" style={{ fontSize: '28px', fontWeight: '400', marginBottom: '40px', textAlign: 'center' }}>
            Educational Impact
          </h3>
          <div className="metrics-grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            <CounterUp value="500" suffix="+" label="Students Educated" />
            <CounterUp value="15" suffix="+" label="Years Of Service" />
            <CounterUp value="10" suffix="+" label="Quran Memorization Programs" />
            <CounterUp value="10000" suffix="+" label="Community Reach" />
          </div>
        </div>

        {/* Core Pillars Section */}
        <div style={{ marginTop: '120px' }}>
          <h3 className="font-playfair text-gold" style={{ fontSize: '28px', fontWeight: '400', marginBottom: '15px', textAlign: 'center' }}>
            Core Pillars
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', marginBottom: '50px', letterSpacing: '1px' }}>
            The spiritual foundations guiding every student and scholar.
          </p>

          <div className="value-card-grid">
            {/* ILM */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-80px" }} 
              transition={{ duration: 0.6, delay: 0.1 }} 
              className="value-card"
              onClick={() => setActiveModal(0)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveModal(0);
                }
              }}
              role="button"
              tabIndex={0}
              style={{ cursor: 'none' }}
            >
              <div className="card-bg-art ilm-art" />
              <div className="value-icon-container">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  <path d="M8 6h8M8 10h8M8 14h5" />
                </svg>
              </div>
              <h4 className="font-playfair" style={{ fontSize: '22px', color: '#ffffff', letterSpacing: '2px', marginBottom: '15px', fontWeight: 'normal' }}>
                ILM
              </h4>
              <span style={{ display: 'block', color: '#c9a84c', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '15px' }}>
                — Knowledge —
              </span>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '15px' }}>
                The foundation of all action and insight. We cultivate rigorous Quranic scholarship alongside secular wisdom to develop enlightened minds.
              </p>
              <span className="explore-indicator">Click to Explore ✦</span>
            </motion.div>

            {/* IMAAN */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-80px" }} 
              transition={{ duration: 0.6, delay: 0.25 }} 
              className="value-card"
              onClick={() => setActiveModal(1)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveModal(1);
                }
              }}
              role="button"
              tabIndex={0}
              style={{ cursor: 'none' }}
            >
              <div className="card-bg-art imaan-art" />
              <div className="value-icon-container">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M6 20 V 10 C 6 6 12 3 12 3 C 12 3 18 6 18 10 V 20 Z" />
                  <path d="M 12 8 A 4 4 0 1 0 15 12 A 4.5 4.5 0 1 1 12 8 Z" fill="currentColor" />
                  <circle cx="12" cy="17" r="1.5" fill="#e8c96d" />
                </svg>
              </div>
              <h4 className="font-playfair" style={{ fontSize: '22px', color: '#ffffff', letterSpacing: '2px', marginBottom: '15px', fontWeight: 'normal' }}>
                IMAAN
              </h4>
              <span style={{ display: 'block', color: '#c9a84c', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '15px' }}>
                — Faith —
              </span>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '15px' }}>
                Connecting the heart to the Creator. We nurture deep spiritual conviction and moral integrity, modeling life after the beautiful Sunnah.
              </p>
              <span className="explore-indicator">Click to Explore ✦</span>
            </motion.div>

            {/* IKHLAAS */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-80px" }} 
              transition={{ duration: 0.6, delay: 0.4 }} 
              className="value-card"
              onClick={() => setActiveModal(2)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveModal(2);
                }
              }}
              role="button"
              tabIndex={0}
              style={{ cursor: 'none' }}
            >
              <div className="card-bg-art ikhlaas-art" />
              <div className="value-icon-container">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="5" y="5" width="14" height="14" rx="1.5" transform="rotate(45 12 12)" />
                  <circle cx="12" cy="12" r="5.5" strokeWidth="0.8" strokeDasharray="2 2" />
                  <polygon points="12,8 13.5,11 16.5,12 13.5,13 12,16 10.5,13 7.5,12 10.5,11" fill="currentColor" />
                </svg>
              </div>
              <h4 className="font-playfair" style={{ fontSize: '22px', color: '#ffffff', letterSpacing: '2px', marginBottom: '15px', fontWeight: 'normal' }}>
                IKHLAAS
              </h4>
              <span style={{ display: 'block', color: '#c9a84c', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '15px' }}>
                — Sincerity —
              </span>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '15px' }}>
                Purity of intent in every endeavor. We instill the mindset that all study, teaching, and community service must be performed solely for the sake of Allah.
              </p>
              <span className="explore-indicator">Click to Explore ✦</span>
            </motion.div>
          </div>
        </div>

        {/* Bottom Reveal Tagline */}
        <div ref={bottomRef} style={{ marginTop: '130px', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <motion.span initial={{ opacity: 0, y: 15 }} animate={isBottomInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="font-playfair" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '300', color: '#ffffff', lineHeight: '1.3' }}>
              Seeking Knowledge.
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 15 }} animate={isBottomInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }} className="font-playfair" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '300', color: '#c9a84c', lineHeight: '1.3' }}>
              Strengthening Faith.
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 15 }} animate={isBottomInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.6 }} className="font-playfair" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '300', color: '#ffffff', lineHeight: '1.3' }}>
              Serving Humanity.
            </motion.span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '20px', marginTop: '60px' }}>
            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.25))' }} />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" opacity="0.8">
              <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" stroke="#c9a84c" strokeWidth="1.2" />
              <circle cx="12" cy="12" r="3.5" fill="#c9a84c" />
            </svg>
            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.25))' }} />
          </div>
        </div>

      </div>

      {/* Render the Interactive Modal */}
      <AnimatePresence>
        {activeModal !== null && (
          <ManuscriptModal 
            key="manuscript-modal"
            index={activeModal} 
            onClose={() => setActiveModal(null)} 
            referenceData={referenceData}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
