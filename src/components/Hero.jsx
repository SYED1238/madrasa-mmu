import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

/* ─────────────────────────────────────────────
   ANIMATED COUNTER — for the Trust Bar
───────────────────────────────────────────── */
const AnimatedCounter = ({ end, suffix = '+', label, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2200;
          let startTime = null;
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          setTimeout(() => requestAnimationFrame(step), delay);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [end, delay, hasAnimated]);

  return (
    <div ref={ref} className="trust-stat">
      <span className="trust-stat-number font-playfair">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="trust-stat-label">{label}</span>
    </div>
  );
};

/* ─────────────────────────────────────────────
   FLOATING PARTICLES
───────────────────────────────────────────── */
const FloatingParticles = () => {
  const particles = useRef(
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.8,
      dur: Math.random() * 18 + 12,
      del: Math.random() * 10,
      op: Math.random() * 0.3 + 0.05
    }))
  ).current;

  return (
    <div className="hero-particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="hero-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
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

/* ═════════════════════════════════════════════
   HERO — Iceland-style editorial composition
═════════════════════════════════════════════ */
const Hero = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const isUrdu = currentLanguage === 'ur';

  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile vs desktop viewports
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ── Parallax scroll ── */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const foregroundY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const bgOpacity   = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);

  /* ── Mouse tracking ── */
  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (el) el.addEventListener('mousemove', handleMouseMove);
    return () => { if (el) el.removeEventListener('mousemove', handleMouseMove); };
  }, [handleMouseMove]);

  /* ── Centerpiece phrase cycling ── */
  const phrases = [t('hero.motto.seeking'), t('hero.motto.strengthening'), t('hero.motto.serving')];
  const [phraseIdx, setPhraseIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setPhraseIdx((p) => (p + 1) % phrases.length), 3200);
    return () => clearInterval(timer);
  }, [phrases.length]);

  return (
    <>
      <section id="hero" ref={heroRef} className="hero-editorial">
        {/* ═══════════ SCOPED STYLES ═══════════ */}
        <style>{`
          /* ──────────────────────────────────────
             HERO: EDITORIAL / ICELAND COMPOSITION
          ────────────────────────────────────── */
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap');

          .hero-editorial {
            position: relative;
            min-height: 100vh;
            height: 100vh;
            background-color: #050508;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* ── LAYER 0: VIDEO BACKGROUND ── */
          .hero-video-wrap {
            position: absolute;
            inset: 0;
            z-index: 0;
            overflow: hidden;
          }
          .hero-video-bg {
            position: absolute;
            top: 50%;
            left: 50%;
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            transform: translate(-50%, -50%);
            object-fit: cover;
          }
          .hero-video-overlay {
            position: absolute;
            inset: 0;
            background: rgba(5, 5, 8, 0.70);
            z-index: 1;
          }

          /* ── LAYER 1: ATMOSPHERIC BACKGROUND ── */
          .hero-atmo {
            position: absolute;
            inset: 0;
            z-index: 1;
          }
          .hero-atmo-gradient {
            position: absolute;
            inset: 0;
            background: radial-gradient(
              ellipse 120% 100% at 50% 80%,
              rgba(201,168,76,0.06) 0%,
              transparent 60%
            );
          }
          .hero-atmo-vignette {
            position: absolute;
            inset: 0;
            background: radial-gradient(
              ellipse 80% 70% at 50% 50%,
              transparent 40%,
              rgba(5,5,8,0.7) 100%
            );
          }

          /* ── FOREGROUND CONTENT ── */
          .hero-fg {
            position: relative;
            z-index: 6;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 90px 60px 0;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            pointer-events: none;
          }
          .hero-fg > * { pointer-events: auto; }

          /* Eyebrow label */
          .hero-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 14px;
            margin-top: 52px;
            margin-bottom: 12px;
          }
          .hero-eyebrow-line {
            width: 36px;
            height: 1px;
            background: linear-gradient(90deg, #c9a84c, transparent);
          }
          .hero-eyebrow span {
            font-family: 'Inter', sans-serif;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 5px;
            text-transform: uppercase;
            color: rgba(201,168,76,0.60);
          }

          /* Brand name — dominant */
          .hero-brand {
            margin: 0 0 16px;
            line-height: 0.9;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            filter: drop-shadow(0 4px 20px rgba(201, 168, 76, 0.12));
            transition: filter 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          }
          .hero-brand-line {
            display: block;
            font-family: 'Cormorant Garamond', serif;
            text-transform: uppercase;
            line-height: 0.95;
            transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          }
          
          /* Line 1: MADRASA e */
          .hero-brand-line-1 {
            font-size: clamp(52px, 8.5vw, 130px);
            color: #f7f5f0;
            font-weight: 400;
            letter-spacing: clamp(4px, 1.2vw, 16px);
            text-shadow: 0 0 40px rgba(255, 255, 255, 0.05);
          }
          .hero-brand-e {
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
            font-weight: 300;
            text-transform: lowercase;
            color: #dfba6b;
            background: linear-gradient(135deg, #ffe082 0%, #c9a84c 50%, #8d6e15 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-left: clamp(10px, 1.5vw, 24px);
            position: relative;
            letter-spacing: 0;
            text-shadow: none;
          }
          
          /* Line 2: MADEENATUL & Line 3: ULOOM */
          .hero-brand-line-2, .hero-brand-line-3 {
            background: linear-gradient(
              135deg,
              #ffffff 0%,
              #f5e0b3 25%,
              #c9a84c 50%,
              #e8c96d 75%,
              #ffffff 100%
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: goldShine 8s ease-in-out infinite;
          }
          
          .hero-brand-line-2 {
            font-size: clamp(48px, 7.8vw, 115px);
            font-weight: 700;
            letter-spacing: clamp(3px, 1vw, 12px);
          }
          
          .hero-brand-line-3 {
            font-size: clamp(54px, 9vw, 135px);
            font-weight: 800;
            letter-spacing: clamp(6px, 1.5vw, 22px);
          }

          @keyframes goldShine {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          /* Hover dynamic spacing & glow */
          .hero-brand:hover {
            filter: drop-shadow(0 0 35px rgba(201, 168, 76, 0.35));
          }
          .hero-brand:hover .hero-brand-line-1 {
            letter-spacing: clamp(6px, 1.4vw, 20px);
            text-shadow: 0 0 50px rgba(255, 255, 255, 0.15);
          }
          .hero-brand:hover .hero-brand-line-2 {
            letter-spacing: clamp(5px, 1.2vw, 16px);
          }
          .hero-brand:hover .hero-brand-line-3 {
            letter-spacing: clamp(8px, 1.8vw, 26px);
          }

          /* Gold accent divider */
          .hero-divider {
            width: 80px;
            height: 1.5px;
            background: linear-gradient(90deg, #c9a84c, rgba(201,168,76,0.15));
            margin: 28px 0 28px;
            position: relative;
            overflow: hidden;
          }
          .hero-divider::after {
            content: '';
            position: absolute;
            top: 0; left: -100%;
            width: 60%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
            animation: shimDivider 3.5s ease-in-out infinite;
          }
          @keyframes shimDivider {
            0%   { left: -100%; }
            100% { left: 200%; }
          }

          /* Secondary headline */
          .hero-secondary {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(20px, 2.4vw, 36px);
            font-weight: 300;
            line-height: 1.3;
            color: rgba(240, 237, 228, 0.72);
            margin: 0 0 20px;
            letter-spacing: 0.5px;
          }
          .hero-secondary em {
            font-style: italic;
            color: #c9a84c;
            font-weight: 400;
          }

          /* Supporting text */
          .hero-support {
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            color: rgba(255,255,255,0.42);
            max-width: 480px;
            line-height: 1.8;
            margin-bottom: 44px;
            font-weight: 300;
          }

          /* CTA */
          .hero-cta-row {
            display: flex;
            align-items: center;
            gap: 16px;
            flex-wrap: wrap;
          }

          .hero-btn-gold {
            position: relative;
            padding: 16px 38px;
            background: linear-gradient(135deg, #c9a84c 0%, #e8c96d 50%, #c9a84c 100%);
            background-size: 200% 200%;
            color: #050508;
            border: none;
            border-radius: 0;
            font-family: 'Inter', sans-serif;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 2.5px;
            text-transform: uppercase;
            cursor: none;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
          }
          .hero-btn-gold::before {
            content: '';
            position: absolute; inset: 0;
            background: linear-gradient(135deg, transparent, rgba(255,255,255,0.25), transparent);
            transform: translateX(-100%);
            transition: transform 0.6s ease;
          }
          .hero-btn-gold:hover {
            transform: translateY(-3px) scale(1.03);
            box-shadow: 0 14px 45px rgba(201,168,76,0.4), 0 0 80px rgba(201,168,76,0.12);
            background-position: 100% 100%;
          }
          .hero-btn-gold:hover::before { transform: translateX(100%); }

          .hero-btn-ghost {
            padding: 16px 32px;
            background: transparent;
            color: #c9a84c;
            border: 1px solid rgba(201,168,76,0.22);
            font-family: 'Inter', sans-serif;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 2.5px;
            text-transform: uppercase;
            cursor: none;
            transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
            position: relative;
            overflow: hidden;
          }
          .hero-btn-ghost::before {
            content: '';
            position: absolute; bottom: 0; left: 0;
            width: 100%; height: 0;
            background: rgba(201,168,76,0.07);
            transition: height 0.4s ease;
          }
          .hero-btn-ghost:hover {
            border-color: rgba(201,168,76,0.6);
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(201,168,76,0.12);
          }
          .hero-btn-ghost:hover::before { height: 100%; }

          /* ── PARTICLES & EFFECTS ── */
          .hero-particles {
            position: absolute; inset: 0;
            z-index: 7;
            pointer-events: none;
          }
          .hero-particle {
            position: absolute;
            background: #c9a84c;
            border-radius: 50%;
            animation: particleDrift linear infinite;
          }
          @keyframes particleDrift {
            0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
            15%  { opacity: 1; }
            85%  { opacity: 1; }
            100% { transform: translateY(-100px) translateX(40px) scale(0.3); opacity: 0; }
          }

          /* Light rays */
          .hero-rays {
            position: absolute; inset: 0;
            z-index: 4;
            pointer-events: none;
            overflow: hidden;
          }
          .hero-ray {
            position: absolute;
            top: -30%;
            width: 2px;
            height: 160%;
            background: linear-gradient(180deg,
              transparent 0%,
              rgba(201,168,76,0.04) 25%,
              rgba(201,168,76,0.09) 50%,
              rgba(201,168,76,0.04) 75%,
              transparent 100%
            );
            transform-origin: top center;
          }
          .hero-ray:nth-child(1){ left:18%; transform:rotate(-6deg); animation:rayDrift 14s ease-in-out infinite; }
          .hero-ray:nth-child(2){ left:38%; width:3px; transform:rotate(-2deg); animation:rayDrift 18s ease-in-out infinite 3s; }
          .hero-ray:nth-child(3){ right:28%; transform:rotate(4deg); animation:rayDrift 16s ease-in-out infinite 1s; }
          .hero-ray:nth-child(4){ right:10%; width:1.5px; transform:rotate(9deg); animation:rayDrift 20s ease-in-out infinite 5s; }
          @keyframes rayDrift {
            0%,100% { opacity:0.25; }
            50%     { opacity:0.7; transform:rotate(var(--r,0deg)) translateX(15px); }
          }

          /* Mouse glow */
          .hero-mouse-glow {
            position: absolute;
            width: 450px; height: 450px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 5;
            background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%);
            transition: transform 0.15s ease-out;
          }

          /* Film grain */
          .hero-grain {
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            opacity: 0.035;
            pointer-events: none;
            z-index: 8;
            animation: grain 8s steps(10) infinite;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
          }
          @keyframes grain {
            0%,100%{ transform:translate(0,0); }
            20%{ transform:translate(-5%,-5%); }
            40%{ transform:translate(5%,5%); }
            60%{ transform:translate(-3%,8%); }
            80%{ transform:translate(8%,-3%); }
          }

          /* Centerpiece motto */
          .hero-motto {
            position: absolute;
            bottom: clamp(140px, 18vh, 220px);
            right: clamp(40px, 8vw, 120px);
            z-index: 7;
            text-align: right;
            pointer-events: none;
          }
          .hero-motto-word {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(12px, 1.5vw, 18px);
            font-weight: 400;
            font-style: italic;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: rgba(201, 168, 76, 0.45); /* Elegant low opacity gold */
            text-shadow: 0 0 20px rgba(201, 168, 76, 0.08);
          }
          .hero-motto-accent {
            display: inline-block;
            width: 24px;
            height: 1px;
            background: linear-gradient(90deg, rgba(201, 168, 76, 0.4), transparent);
            margin-left: 14px;
            vertical-align: middle;
          }

          /* Scroll indicator */
          .hero-scroll {
            position: absolute;
            bottom: 28px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            z-index: 7;
          }
          .hero-scroll-txt {
            font-size: 8px;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: rgba(201,168,76,0.35);
            writing-mode: vertical-rl;
            transform: rotate(180deg);
          }
          .hero-scroll-bar {
            width: 1px; height: 32px;
            background: rgba(201,168,76,0.12);
            position: relative;
            overflow: hidden;
          }
          .hero-scroll-bar::after {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 50%;
            background: #c9a84c;
            animation: scrollPulse 2.2s ease-in-out infinite;
          }
          @keyframes scrollPulse {
            0%   { transform: translateY(-100%); opacity:0; }
            50%  { opacity:1; }
            100% { transform: translateY(250%); opacity:0; }
          }

          /* ── TRUST BAR ── */
          .hero-trust-bar {
            background: linear-gradient(180deg, rgba(10,10,18,0.97) 0%, rgba(8,8,14,1) 100%);
            border-top: 1px solid rgba(201,168,76,0.10);
            border-bottom: 1px solid rgba(201,168,76,0.06);
            position: relative;
            z-index: 20;
          }
          .hero-trust-bar::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; height: 1px;
            background: linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent);
          }
          .hero-trust-inner {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            padding: 38px 40px;
          }
          .trust-stat {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            padding: 14px 10px;
            position: relative;
          }
          .trust-stat:not(:last-child)::after {
            content: '';
            position: absolute;
            right: 0; top: 18%; height: 64%; width: 1px;
            background: rgba(201,168,76,0.08);
          }
          .trust-stat-number {
            font-size: clamp(26px, 3vw, 40px);
            font-weight: 400;
            color: #c9a84c;
            letter-spacing: -1px;
          }
          .trust-stat-label {
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: rgba(255,255,255,0.30);
          }

          /* ═══════ RESPONSIVE ═══════ */
          @media (max-width: 1024px) {
            .hero-fg {
              padding: 90px 40px 0;
            }
            .hero-brand-line-1 {
              font-size: clamp(44px, 7vw, 95px) !important;
            }
            .hero-brand-line-2 {
              font-size: clamp(40px, 6.5vw, 85px) !important;
            }
            .hero-brand-line-3 {
              font-size: clamp(46px, 7.5vw, 100px) !important;
            }
          }

          @media (max-width: 768px) {
            .hero-editorial {
              min-height: 100svh;
              align-items: center !important;
            }
            .hero-fg {
              padding: 0 24px !important;
              padding-top: 80px !important;
              padding-bottom: 0 !important;
            }
            .hero-brand-line-1 {
              font-size: clamp(28px, 6.5vw, 68px) !important;
              letter-spacing: clamp(2px, 0.8vw, 8px) !important;
            }
            .hero-brand-line-2 {
              font-size: clamp(26px, 6vw, 60px) !important;
              letter-spacing: clamp(1.5px, 0.7vw, 6px) !important;
            }
            .hero-brand-line-3 {
              font-size: clamp(29px, 7vw, 70px) !important;
              letter-spacing: clamp(3px, 0.9vw, 10px) !important;
            }
            .hero-secondary {
              font-size: clamp(18px, 4vw, 24px) !important;
            }
            .hero-support {
              font-size: 13px !important;
              margin-bottom: 24px !important;
            }
            .hero-divider {
              margin: 20px 0 20px !important;
            }
            .hero-cta-row {
              flex-direction: column;
              align-items: stretch;
              gap: 10px;
              width: 100%;
            }
            .hero-cta-row a {
              width: 100%;
              display: block;
            }
            .hero-btn-gold, .hero-btn-ghost {
              width: 100%;
              text-align: center;
              justify-content: center;
            }
            .hero-trust-inner {
              grid-template-columns: repeat(2, 1fr) !important;
              padding: 28px 20px !important;
              gap: 12px;
            }
            .trust-stat:nth-child(2)::after { display: none; }
            .hero-motto {
              bottom: 45px;
              right: 24px;
              left: auto;
              transform: none;
              text-align: right;
            }
            .hero-scroll { display: none; }
          }

          @media (max-width: 480px) {
            .hero-fg {
              padding-top: 100px !important;
              padding-bottom: 0 !important;
            }
            .hero-brand-line-1 {
              font-size: clamp(24px, 7.5vw, 42px) !important;
              letter-spacing: 2px !important;
            }
            .hero-brand-line-2 {
              font-size: clamp(22px, 7vw, 38px) !important;
              letter-spacing: 1.5px !important;
            }
            .hero-brand-line-3 {
              font-size: clamp(25px, 8vw, 44px) !important;
              letter-spacing: 3px !important;
            }
            .hero-trust-inner {
              grid-template-columns: 1fr 1fr !important;
            }
            .trust-stat:not(:last-child)::after { display: none; }
          }
        `}</style>

        {/* ═══ LAYER 0: VIDEO BACKGROUND ═══ */}
        <div className="hero-video-wrap">
          <video
            className="hero-video-bg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
        </div>

        {/* ░░ GRAIN ░░ */}
        <div className="hero-grain" />

        {/* ═══ LAYER 1: ATMOSPHERE ═══ */}
        <motion.div className="hero-atmo" style={{ opacity: bgOpacity }}>
          <div className="hero-atmo-gradient" />
          <div className="hero-atmo-vignette" />
        </motion.div>

        {/* ═══ FOREGROUND CONTENT ═══ */}
        <motion.div className="hero-fg" style={{ y: foregroundY }}>

          {/* Brand name — dominant */}
          <motion.h1
            className="hero-brand"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.6
                }
              }
            }}
          >
            <motion.span
              className="hero-brand-line hero-brand-line-1"
              variants={{
                hidden: { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
                visible: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }
              }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('hero.titleLine1')} {!isUrdu && <span className="hero-brand-e">e</span>}
            </motion.span>
            <motion.span
              className="hero-brand-line hero-brand-line-2"
              variants={{
                hidden: { opacity: 0, y: 35, clipPath: 'inset(0 0 100% 0)' },
                visible: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }
              }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('hero.titleLine2')}
            </motion.span>
            <motion.span
              className="hero-brand-line hero-brand-line-3"
              variants={{
                hidden: { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
                visible: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }
              }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('hero.titleLine3')}
            </motion.span>
          </motion.h1>

          {/* Eyebrow */}
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ marginTop: '28px', marginBottom: '12px' }}
          >
            <div className="hero-eyebrow-line" />
            <span style={{ fontFamily: isUrdu ? "'Noto Nastaliq Urdu', 'Amiri', serif" : undefined }}>{t('hero.est')}</span>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="hero-divider"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            style={{ marginTop: '16px', marginBottom: '24px' }}
          />

          {/* Secondary headline */}
          <motion.h2
            className="hero-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            style={{ fontFamily: isUrdu ? "'Noto Nastaliq Urdu', 'Amiri', serif" : undefined }}
            dangerouslySetInnerHTML={{ __html: t('hero.tagline') }}
          />

          {/* Supporting text */}
          <motion.p
            className="hero-support ur-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.9 }}
            style={{ 
              fontFamily: isUrdu ? "'Noto Nastaliq Urdu', 'Amiri', serif" : undefined,
              textAlign: isUrdu ? 'right' : 'left'
            }}
          >
            {t('hero.description')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="hero-cta-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.1 }}
            style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}
          >
            <Link to="admissions" smooth={true} offset={-70} duration={500}>
              <button className="hero-btn-gold" id="hero-enroll-btn">
                {t('hero.enrollBtn')}
              </button>
            </Link>
            <Link to="programs" smooth={true} offset={-70} duration={500}>
              <button className="hero-btn-ghost" id="hero-programs-btn">
                {t('hero.programsBtn')}
              </button>
            </Link>
            {/* Premium Language Switcher beside CTA buttons */}
            <LanguageSwitcher style={{ margin: isMobile ? '10px auto 0 auto' : '0 0 0 15px' }} />
          </motion.div>
        </motion.div>

        {/* ═══ LAYER 5: RAYS, PARTICLES, GLOW ═══ */}
        <div className="hero-rays">
          <div className="hero-ray" />
          <div className="hero-ray" />
          <div className="hero-ray" />
          <div className="hero-ray" />
        </div>
        <FloatingParticles />

        {/* Mouse glow */}
        <div
          className="hero-mouse-glow"
          style={{
            transform: `translate(${mousePos.x * (typeof window !== 'undefined' ? window.innerWidth : 1400) - 225}px, ${mousePos.y * (typeof window !== 'undefined' ? window.innerHeight : 900) - 225}px)`
          }}
        />

        {/* Centerpiece motto */}
        <div className="hero-motto">
          <AnimatePresence mode="wait">
            <motion.div
              key={phraseIdx}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
            >
              <span className="hero-motto-word" style={{ fontFamily: isUrdu ? "'Noto Nastaliq Urdu', 'Amiri', serif" : undefined }}>{phrases[phraseIdx]}</span>
              <span className="hero-motto-accent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll */}
        <div className="hero-scroll">
          <span className="hero-scroll-txt">SCROLL</span>
          <div className="hero-scroll-bar" />
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="hero-trust-bar" id="trust-bar">
        <div className="hero-trust-inner">
          <AnimatedCounter end={500}   suffix="+" label={t('stats.studentsLabel')}       delay={0} />
          <AnimatedCounter end={15}    suffix="+" label={t('stats.yearsLabel')}          delay={200} />
          <AnimatedCounter end={25000} suffix="+" label={t('stats.hoursLabel')} delay={400} />
          <AnimatedCounter end={100}   suffix="%" label={t('stats.trustLabel')}      delay={600} />
        </div>
      </section>
    </>
  );
};

export default Hero;
