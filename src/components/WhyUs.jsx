import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedWaveBar = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '30px', margin: '30px 0' }}>
      <style>{`
        @keyframes waveAnim {
          0%, 100% { transform: scaleY(0.3); opacity: 0.3; }
          50% { transform: scaleY(1); opacity: 0.8; }
        }
        .wave-bar {
          width: 3px;
          background-color: var(--gold);
          border-radius: 2px;
          animation: waveAnim 1.2s infinite ease-in-out;
        }
      `}</style>
      {[...Array(24)].map((_, i) => {
        // Pseudo-random heights and delays for the equalizer effect
        const heights = [12, 24, 16, 28, 14, 20, 30, 18, 22, 10, 26, 14];
        const height = heights[i % heights.length];
        const delay = (i * 0.1) % 1.2;
        return (
          <div 
            key={i} 
            className="wave-bar" 
            style={{ 
              height: `${height}px`, 
              animationDelay: `${delay}s` 
            }} 
          />
        );
      })}
    </div>
  );
};

const GlassCard = ({ index, num, label, labelColor, heading, subtitle, stats }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: isHovered ? '1px solid rgba(201, 168, 76, 0.5)' : '1px solid rgba(201, 168, 76, 0.15)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: isHovered ? '0 8px 32px rgba(201, 168, 76, 0.1)' : '0 8px 32px rgba(0, 0, 0, 0.4)',
        transition: 'all 0.4s ease',
        cursor: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        {/* Top Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
          <span className="font-playfair" style={{ color: 'var(--gold-dim)', fontSize: '20px', fontWeight: 'bold' }}>
            {num}
          </span>
          <span style={{ color: labelColor, fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>
            {label}
          </span>
        </div>

        {/* Headings */}
        <h3 className="font-playfair" style={{ color: 'var(--text-primary)', fontSize: '36px', marginBottom: '10px', lineHeight: '1.2' }}>
          {heading}
        </h3>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '16px' }}>
          {subtitle}
        </p>
      </div>

      {/* Middle Decorative Wave */}
      <AnimatedWaveBar />

      {/* Bottom Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            background: 'var(--bg-primary)',
            padding: '15px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px'
          }}>
            <span style={{ color: 'var(--text-primary)', fontSize: '18px', fontWeight: '700' }}>
              {stat.value}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const WhyUs = () => {
  const cards = [
    {
      label: "QUALIFIED SCHOLARS",
      labelColor: "#c9a84c", // Gold
      heading: "Expert Ustaads",
      subtitle: "Trained For Excellence.",
      stats: [
        { value: "15+", label: "Ustaads" },
        { value: "100%", label: "Dedicated" },
        { value: "20+", label: "Years Avg" },
        { value: "5★", label: "Rated" }
      ]
    },
    {
      label: "FREE EDUCATION",
      labelColor: "#2d9b7f", // Teal
      heading: "Affordable For All",
      subtitle: "No Child Left Behind.",
      stats: [
        { value: "500+", label: "Students" },
        { value: "100%", label: "Welcome" },
        { value: "Free", label: "Basic" },
        { value: "Zakat", label: "Funded" }
      ]
    },
    {
      label: "CURRICULUM",
      labelColor: "#8b5cf6", // Purple
      heading: "Structured Learning",
      subtitle: "From Beginner To Scholar.",
      stats: [
        { value: "6", label: "Programs" },
        { value: "4", label: "Languages" },
        { value: "Quran", label: "Core" },
        { value: "Daily", label: "Classes" }
      ]
    },
    {
      label: "ENVIRONMENT",
      labelColor: "#e8845a", // Coral
      heading: "Safe & Nurturing",
      subtitle: "Built On Islamic Values.",
      stats: [
        { value: "Safe", label: "Campus" },
        { value: "Pure", label: "Environment" },
        { value: "Adab", label: "First" },
        { value: "Community", label: "Backed" }
      ]
    }
  ];

  return (
    <section id="whyus" style={{ padding: '120px 5%', backgroundColor: 'var(--bg-primary)', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 className="font-playfair text-gold" style={{ fontSize: '48px', marginBottom: '10px' }}>
            Why Choose Us
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>The foundations of our institution</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '40px'
        }}>
          <style>{`
            @media (max-width: 768px) {
              #whyus .grid-container {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
          
          {cards.map((card, idx) => (
            <GlassCard
              key={idx}
              index={idx}
              num={String(idx + 1).padStart(2, '0')}
              label={card.label}
              labelColor={card.labelColor}
              heading={card.heading}
              subtitle={card.subtitle}
              stats={card.stats}
            />
          ))}
        </div>
      </div>
      
      {/* Subtle Background Glows for Glassmorphism */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(45,155,127,0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
    </section>
  );
};

export default WhyUs;
