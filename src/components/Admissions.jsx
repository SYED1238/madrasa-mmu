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

  return (
    <div ref={ref} className="admissions-stat-box">
      <h4 className="font-playfair text-gold admissions-stat-num">
        {count.toLocaleString()}{suffix}
      </h4>
      <p className="admissions-stat-lbl">
        {label}
      </p>
    </div>
  );
};

const FloatingInput = ({ type = "text", label, value, onChange, id }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.toString().length > 0;

  return (
    <div style={{ position: 'relative', marginBottom: '25px', width: '100%' }}>
      <label
        htmlFor={id}
        style={{
          position: 'absolute',
          left: '15px',
          top: '0',
          color: isFocused || hasValue ? '#c9a84c' : '#8a8070',
          pointerEvents: 'none',
          fontFamily: 'Inter',
          fontSize: isFocused || hasValue ? '11px' : '15px',
          transform: isFocused || hasValue ? 'translateY(-8px)' : 'translateY(15px)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          background: isFocused || hasValue ? '#12121f' : 'transparent',
          padding: isFocused || hasValue ? '0 6px' : '0',
          zIndex: 2
        }}
      >
        {label}
      </label>
      
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: '100%',
          background: 'rgba(5, 5, 8, 0.4)',
          border: '1px solid rgba(201, 168, 76, 0.15)',
          padding: '15px',
          borderRadius: '8px',
          color: '#f0ede4',
          fontSize: '15px',
          outline: 'none',
          transition: 'all 0.3s ease',
          boxShadow: isFocused ? '0 0 15px rgba(201, 168, 76, 0.12)' : 'none',
          position: 'relative',
          zIndex: 1
        }}
      />
      
      {/* Underline sweep line */}
      <motion.div
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: '#c9a84c',
          transformOrigin: 'center',
          zIndex: 2
        }}
      />
    </div>
  );
};

const Admissions = () => {
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const formRef = useRef(null);
  const bottomRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const calligraphyY = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const starRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rayRotate = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-10%" });
  const isFormInView = useInView(formRef, { once: true, margin: "-10%" });
  const isBottomInView = useInView(bottomRef, { once: true, margin: "-10%" });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMouseOffset({
        x: (clientX - innerWidth / 2) / (innerWidth / 2),
        y: (clientY - innerHeight / 2) / (innerHeight / 2)
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const timelineSteps = [
    { step: "Step 1", title: "Submit Enquiry", desc: "Fill out our luxury online form or tap directly to discuss on WhatsApp with our enrollment desk." },
    { step: "Step 2", title: "Student Assessment", desc: "A soft, supportive evaluation session to determine the student's baseline Tajweed and learning level." },
    { step: "Step 3", title: "Parent Interaction", desc: "A brief conversation discussing expectations, the curriculum, and onboarding into the MMU family." },
    { step: "Step 4", title: "Admission Confirmation", desc: "Submit the required documents (birth certificate, IDs) to complete registration and reserve a seat." },
    { step: "Step 5", title: "Begin Learning Journey", desc: "The student is formally inducted, assigned to their Ustaad, and begins their spiritual path free of cost." }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    alert(`Enquiry Submitted Successfully!\nParent: ${parentName}\nChild: ${childName}`);
    setParentName('');
    setChildName('');
    setChildAge('');
    setPhoneNumber('');
  };

  return (
    <section
      id="admissions"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '120px 5%',
        backgroundColor: '#050508',
        backgroundImage: 'radial-gradient(circle at 50% 0%, #0d0d1a 0%, #050508 70%, #020204 100%)',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(0.98); opacity: 1; }
          100% { transform: scale(1.15); opacity: 0; }
        }

        /* Calligraphy backdrop */
        .admissions-calligraphy-bg {
          position: absolute;
          font-family: 'Amiri', serif;
          font-size: 15vw;
          color: rgba(201, 168, 76, 0.03);
          user-select: none;
          pointer-events: none;
          white-space: nowrap;
          z-index: 1;
        }

        /* Ambient volumetric light ray */
        .admissions-light-ray {
          position: absolute;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.05) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        /* Trust stats strip style */
        .admissions-stats-bar {
          background: rgba(255, 255, 255, 0.015);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(201, 168, 76, 0.15);
          border-radius: 20px;
          padding: 30px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.5);
          margin-bottom: 70px;
          position: relative;
          z-index: 5;
        }
        .admissions-stat-box {
          text-align: center;
        }
        .admissions-stat-num {
          font-size: 38px;
          font-weight: 500;
          margin-bottom: 5px;
          text-shadow: 0 0 15px rgba(201, 168, 76, 0.25);
        }
        .admissions-stat-lbl {
          color: var(--text-muted);
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* Split layouts */
        .admissions-split-container {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: start;
        }

        /* Golden timeline */
        .enroll-timeline-container {
          position: relative;
          padding-left: 25px;
          margin-bottom: 50px;
        }
        .enroll-timeline-line {
          position: absolute;
          left: 20px;
          top: 10px;
          bottom: 10px;
          width: 1px;
          background: linear-gradient(to bottom, rgba(201, 168, 76, 0.1), rgba(201,168,76,0.65) 50%, rgba(201, 168, 76, 0.1));
        }
        .enroll-timeline-item {
          position: relative;
          margin-bottom: 35px;
        }
        .enroll-timeline-diamond {
          position: absolute;
          left: -10px;
          top: 8px;
          width: 11px;
          height: 11px;
          background-color: #080810;
          border: 2px solid #c9a84c;
          box-shadow: 0 0 10px rgba(201,168,76,0.6);
          transform: rotate(45deg);
          z-index: 3;
          transition: all 0.3s ease;
        }
        .enroll-timeline-item:hover .enroll-timeline-diamond {
          background-color: #c9a84c;
          box-shadow: 0 0 15px rgba(201,168,76,0.9);
          transform: rotate(45deg) scale(1.2);
        }
        .enroll-timeline-card {
          margin-left: 28px;
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(201, 168, 76, 0.1);
          padding: 20px 24px;
          border-radius: 12px;
          transition: all 0.4s ease;
        }
        .enroll-timeline-card:hover {
          background: rgba(255, 255, 255, 0.02);
          border-color: rgba(201, 168, 76, 0.35);
          box-shadow: 0 8px 30px rgba(201, 168, 76, 0.08);
          transform: translateX(4px);
        }

        /* Glassmorphic Form Card */
        .enroll-form-card {
          background: rgba(18, 18, 31, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(201, 168, 76, 0.15);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          position: relative;
          overflow: hidden;
          transition: all 0.5s ease;
        }
        .enroll-form-card::after {
          content: "";
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: conic-gradient(from 0deg, transparent 65%, rgba(201, 168, 76, 0.25) 85%, transparent 100%);
          animation: rotateGlow 6s linear infinite;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .enroll-form-card:hover::after {
          opacity: 1;
        }
        .enroll-form-card:hover {
          border-color: rgba(201, 168, 76, 0.35);
          box-shadow: 0 25px 60px rgba(201, 168, 76, 0.1);
        }
        @keyframes rotateGlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Badge Grid */
        .badge-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 25px;
        }
        .trust-badge-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(201, 168, 76, 0.1);
          padding: 12px 15px;
          border-radius: 8px;
          font-size: 12.5px;
          color: var(--text-primary);
          transition: all 0.3s ease;
        }
        .trust-badge-item:hover {
          background: rgba(201, 168, 76, 0.05);
          border-color: rgba(201, 168, 76, 0.3);
        }

        /* Parallax featured image */
        .cinematic-visual-box {
          position: relative;
          border-radius: 20px;
          padding: 2px;
          background: rgba(201, 168, 76, 0.12);
          overflow: hidden;
          transition: all 0.5s ease;
          margin-top: 40px;
        }
        .cinematic-visual-box::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: conic-gradient(from 0deg, transparent 60%, #c9a84c 85%, #e8c96d 90%, #c9a84c 95%, transparent 100%);
          animation: rotateGlow 4s linear infinite;
          opacity: 0.3;
        }
        .cinematic-visual-inner {
          position: relative;
          width: 100%;
          height: 250px;
          border-radius: 18px;
          overflow: hidden;
          background: #040408;
          z-index: 2;
        }
        .cinematic-visual-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.75;
          filter: contrast(1.05) brightness(0.95);
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .cinematic-visual-box:hover .cinematic-visual-img {
          transform: scale(1.04);
        }

        /* Sweep glow effect */
        .sweep-effect {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%);
          transform: skewX(-25deg);
          pointer-events: none;
          z-index: 3;
        }
        .cinematic-visual-box:hover .sweep-effect {
          animation: sweepAction 1.8s ease-in-out infinite;
        }
        @keyframes sweepAction {
          0% { left: -100%; }
          100% { left: 150%; }
        }

        @media (max-width: 1024px) {
          .admissions-split-container {
            grid-template-columns: 1fr;
            gap: 50px;
          }
        }
        @media (max-width: 768px) {
          .admissions-stats-bar {
            grid-template-columns: 1fr 1fr;
            padding: 20px 10px;
            gap: 15px;
          }
          .admissions-stat-num {
            font-size: 28px !important;
          }
          .badge-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .enroll-form-card {
            padding: 24px 20px !important;
          }
          .enroll-timeline-card {
            margin-left: 20px !important;
            padding: 16px 18px !important;
          }
          .enroll-timeline-container {
            padding-left: 10px !important;
          }
          .enroll-timeline-line {
            left: 10px !important;
          }
        }
      `}</style>

      {/* Background calligraphy */}
      <motion.div style={{ y: calligraphyY, top: '8%', left: '-8%' }} className="admissions-calligraphy-bg">
        طلب العلم فريضة على كل مسلم
      </motion.div>
      <motion.div style={{ y: calligraphyY, bottom: '8%', right: '-12%' }} className="admissions-calligraphy-bg">
        العلم في الصغر كالنقش على الحجر
      </motion.div>

      {/* Volumetric light ray */}
      <motion.div style={{ rotate: rayRotate, top: '-5%', right: '15%' }} className="admissions-light-ray" />
      <motion.div style={{ rotate: rayRotate, bottom: '10%', left: '5%' }} className="admissions-light-ray" />

      {/* Background star shapes */}
      <motion.div style={{ rotate: starRotate, position: 'absolute', color: 'rgba(201, 168, 76, 0.08)', pointerEvents: 'none', zIndex: 1, top: '22%', right: '5%' }} className="star-decor">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          <rect x="25" y="25" width="50" height="50" rx="1.5" />
          <rect x="25" y="25" width="50" height="50" rx="1.5" transform="rotate(45 50 50)" />
        </svg>
      </motion.div>

      {/* Subtle floating gold particles */}
      <motion.div style={{ y: calligraphyY, top: '25%', left: '15%', width: '4px', height: '4px', backgroundColor: '#c9a84c', borderRadius: '50%', boxShadow: '0 0 8px #c9a84c', position: 'absolute', pointerEvents: 'none', zIndex: 1 }} />
      <motion.div style={{ y: calligraphyY, top: '65%', left: '72%', width: '3px', height: '3px', backgroundColor: '#e8c96d', borderRadius: '50%', boxShadow: '0 0 6px #e8c96d', position: 'absolute', pointerEvents: 'none', zIndex: 1 }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
        
        {/* Top Introduction Section */}
        <div style={{ textAlign: 'center', marginBottom: '55px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '18px' }}>
            <motion.div initial={{ width: 0 }} whileInView={{ width: '40px' }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ height: '1px', backgroundColor: '#c9a84c' }} />
            <span style={{ color: '#c9a84c', fontSize: '12px', letterSpacing: '5px', fontWeight: '700', textTransform: 'uppercase' }}>
              Admissions Open
            </span>
            <motion.div initial={{ width: 0 }} whileInView={{ width: '40px' }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ height: '1px', backgroundColor: '#c9a84c' }} />
          </div>

          <h2 className="font-playfair" style={{ fontSize: 'clamp(34px, 5.2vw, 56px)', color: '#ffffff', fontWeight: '300', marginBottom: '20px', lineHeight: '1.2' }}>
            Begin A Journey<br/>Of <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>Faith & Knowledge</span>
          </h2>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '680px', margin: '0 auto', lineHeight: '1.7', fontStyle: 'italic', padding: '0 15px' }}>
            "Join generations of students who have grown through rigorous Quranic studies, character development, and noble community values."
          </p>
        </div>

        {/* Floating Trust Banner */}
        <div className="admissions-stats-bar">
          <StatCounter value="500" suffix="+" label="Students Educated" />
          <StatCounter value="15" suffix="+" label="Years of Service" />
          <StatCounter value="25000" suffix="+" label="Hours of Learning" />
          <StatCounter value="12000" suffix="+" label="Community Impact" />
        </div>

        {/* Core Layout Split */}
        <div className="admissions-split-container">
          
          {/* Left Column: Guides & Timeline */}
          <motion.div
            ref={timelineRef}
            initial={{ opacity: 0, x: -30 }}
            animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-playfair text-gold" style={{ fontSize: '26px', fontWeight: '400', marginBottom: '35px', paddingLeft: '15px' }}>
              Your Path To Enrollment
            </h3>

            <div className="enroll-timeline-container">
              <div className="enroll-timeline-line" />

              {timelineSteps.map((step, idx) => (
                <div key={idx} className="enroll-timeline-item">
                  <div className="enroll-timeline-diamond" />
                  
                  <div className="enroll-timeline-card">
                    <span style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '2px', fontWeight: '600', textTransform: 'uppercase' }}>
                      {step.step}
                    </span>
                    <h4 className="font-playfair" style={{ fontSize: '19px', color: '#ffffff', marginTop: '4px', marginBottom: '8px', fontWeight: 'normal' }}>
                      {step.title}
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', lineHeight: '1.6', margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Centerpiece Cinematic Visual */}
            <div 
              className="cinematic-visual-box"
              style={{
                transform: `translate(${mouseOffset.x * 6}px, ${mouseOffset.y * 6}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              <div className="cinematic-visual-inner">
                <img 
                  className="cinematic-visual-img" 
                  src="/about-madrasa.png" 
                  alt="Students Learning at Madrasa" 
                />
                
                {/* Overlay visual border elements */}
                <svg style={{ position: 'absolute', inset: 10, width: 'calc(100% - 20px)', height: 'calc(100% - 20px)', pointerEvents: 'none', zIndex: 4 }} viewBox="0 0 100 60" preserveAspectRatio="none">
                  <path d="M 4 56 L 4 18 C 4 10 20 5 50 1 C 80 5 96 10 96 18 L 96 56 Z" fill="none" stroke="#c9a84c" strokeWidth="0.8" opacity="0.5" />
                </svg>

                {/* Light Sweep */}
                <div className="sweep-effect" />

                {/* Ornate Text overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(5,5,8,0.9) 0%, transparent 60%)',
                  zIndex: 3,
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '20px'
                }}>
                  <p style={{ color: 'var(--text-primary)', fontFamily: '"Cormorant Garamond", serif', fontSize: '18px', margin: 0, letterSpacing: '1px' }}>
                    ✦ Cultivating future leaders in Ramanagara ✦
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Enrollment Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="enroll-form-card"
            style={{
              transform: `translate(${mouseOffset.x * -4}px, ${mouseOffset.y * -4}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div style={{ position: 'relative', zIndex: 5 }}>
              
              <h3 className="font-playfair text-gold" style={{ fontSize: '28px', marginBottom: '8px', fontWeight: 'normal' }}>
                Enquire Now
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '35px', lineHeight: '1.6' }}>
                Begin your child's enrollment application. Provide your details below to register an inquiry, or initiate a direct chat.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <FloatingInput 
                  id="parentName" 
                  label="Parent's Full Name" 
                  value={parentName} 
                  onChange={(e) => setParentName(e.target.value)} 
                />
                
                <FloatingInput 
                  id="childName" 
                  label="Child's Full Name" 
                  value={childName} 
                  onChange={(e) => setChildName(e.target.value)} 
                />

                <div style={{ display: 'flex', gap: '20px', width: '100%', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 120px' }}>
                    <FloatingInput 
                      id="childAge" 
                      label="Child's Age" 
                      value={childAge} 
                      onChange={(e) => setChildAge(e.target.value)} 
                    />
                  </div>
                  <div style={{ flex: '1 1 180px' }}>
                    <FloatingInput 
                      id="phoneNumber" 
                      label="Phone Number" 
                      value={phoneNumber} 
                      onChange={(e) => setPhoneNumber(e.target.value)} 
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
                  {/* Premium Submit Button */}
                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96d 50%, #c9a84c 100%)',
                      color: '#050508',
                      border: 'none',
                      padding: '16px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '14px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      cursor: 'none',
                      transition: 'all 0.4s ease',
                      boxShadow: '0 4px 20px rgba(201, 168, 76, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(201, 168, 76, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 20px rgba(201, 168, 76, 0.2)';
                    }}
                  >
                    Submit Enrollment Enquiry
                  </button>

                  {/* Pulsing WhatsApp CTA */}
                  <a
                    href="https://wa.me/910000000000"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      background: 'linear-gradient(135deg, #1fbe55 0%, #25D366 100%)',
                      color: 'white',
                      textDecoration: 'none',
                      padding: '16px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '14px',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      cursor: 'none',
                      transition: 'all 0.4s ease',
                      boxShadow: '0 4px 20px rgba(37, 211, 102, 0.25)',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.25)';
                    }}
                  >
                    {/* Ring Pulse Element */}
                    <span style={{
                      position: 'absolute',
                      inset: 0,
                      border: '2px solid rgba(37, 211, 102, 0.4)',
                      borderRadius: '8px',
                      animation: 'pulseRing 2.5s infinite',
                      pointerEvents: 'none'
                    }} />
                    
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Speak To Admissions Team
                  </a>
                </div>

                {/* Trust Elements Badges */}
                <div className="badge-grid">
                  <div className="trust-badge-item">
                    <span style={{ color: '#c9a84c' }}>✦</span> Open To All Children
                  </div>
                  <div className="trust-badge-item">
                    <span style={{ color: '#2d9b7f' }}>✦</span> Subsidized Education
                  </div>
                  <div className="trust-badge-item">
                    <span style={{ color: '#8b5cf6' }}>✦</span> Parent Guidance
                  </div>
                  <div className="trust-badge-item">
                    <span style={{ color: '#e8845a' }}>✦</span> Safe Environment
                  </div>
                </div>

              </form>
            </div>
          </motion.div>

        </div>

        {/* Bottom Reveal Statement & Divider */}
        <div ref={bottomRef} style={{ marginTop: '110px', textAlign: 'center' }}>
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
                    maxWidth: '800px',
                    fontStyle: 'italic'
                  }}
                >
                  "Knowledge Is The Greatest Investment A Parent Can Make."
                </span>
                
                {/* Luxury gold divider */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '20px', marginTop: '45px' }}>
                  <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.25))' }} />
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" opacity="0.8">
                    <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" stroke="#c9a84c" strokeWidth="1.2" />
                    <circle cx="12" cy="12" r="3.5" fill="#c9a84c" />
                  </svg>
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

export default Admissions;
