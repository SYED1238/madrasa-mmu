import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GalleryItem = ({ title, src, svgContent, isTall, customLabel }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={isTall ? "gallery-item-tall" : "gallery-item"}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'none',
        border: '1px solid transparent',
        transition: 'all 0.5s ease',
        backgroundColor: 'var(--bg-card)',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        borderColor: isHovered ? 'var(--gold)' : 'transparent',
        boxShadow: isHovered ? '0 10px 30px rgba(0,0,0,0.5)' : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ width: '100%', height: '100%' }}>
        {src ? (
          <img 
            src={src} 
            alt={title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} 
          />
        ) : (
          svgContent
        )}
      </div>
      
      {/* Overlay */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '60%',
        background: 'linear-gradient(to top, rgba(5,5,8,0.95) 0%, transparent 100%)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '25px',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.5s ease'
      }}>
        <h4 className="font-playfair" style={{
          color: '#ffffff',
          fontSize: '18px',
          margin: 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(15px)',
          transition: 'transform 0.5s ease'
        }}>
          {title}
        </h4>
        
        {customLabel && (
          <span style={{ 
            color: 'var(--gold)', 
            fontSize: '12px', 
            letterSpacing: '1px', 
            textTransform: 'uppercase'
          }}>
            {customLabel}
          </span>
        )}
      </div>
    </div>
  );
};

const Gallery = () => {

  const nightSkyMosqueSvg = (
    <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#050a1a"/>
          <stop offset="60%" stopColor="#1a0533"/>
          <stop offset="100%" stopColor="#30154d"/>
        </linearGradient>
        <linearGradient id="water" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a0533"/>
          <stop offset="100%" stopColor="#050a1a"/>
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#sky)" />
      <rect y="220" width="400" height="80" fill="url(#water)" />
      {/* Stars */}
      {[...Array(25)].map((_, i) => (
        <circle key={i} cx={(i * 47) % 400} cy={(i * 19) % 180} r={1.5} fill="#fff" opacity={0.6} />
      ))}
      {/* Moon */}
      <path d="M 320 60 A 30 30 0 1 0 350 90 A 40 40 0 1 1 320 60 Z" fill="#ffeb3b" />
      {/* Mosque Silhouette */}
      <path d="M 120 220 L 120 160 L 160 160 L 160 120 C 160 80 240 80 240 120 L 240 160 L 280 160 L 280 220 Z" fill="#030612" />
      <path d="M 170 120 C 170 90 230 90 230 120 L 230 130 L 170 130 Z" fill="#081026" />
      <circle cx="200" cy="75" r="3" fill="#030612" />
      {/* Minarets */}
      <rect x="90" y="100" width="15" height="120" fill="#030612" />
      <path d="M 85 100 L 110 100 L 97.5 60 Z" fill="#030612" />
      <rect x="295" y="100" width="15" height="120" fill="#030612" />
      <path d="M 290 100 L 315 100 L 302.5 60 Z" fill="#030612" />
      {/* Windows (glowing) */}
      <rect x="135" y="180" width="10" height="20" rx="5" fill="#ffc107" />
      <rect x="255" y="180" width="10" height="20" rx="5" fill="#ffc107" />
      <rect x="185" y="150" width="10" height="30" rx="5" fill="#ffc107" />
      <rect x="205" y="150" width="10" height="30" rx="5" fill="#ffc107" />
      {/* Water Reflection */}
      <path d="M 120 220 L 120 260 L 160 260 L 160 280 C 160 300 240 300 240 280 L 240 260 L 280 260 L 280 220 Z" fill="#030612" opacity="0.3" />
      <rect x="185" y="230" width="10" height="15" rx="5" fill="#ffc107" opacity="0.2" />
      <rect x="205" y="230" width="10" height="15" rx="5" fill="#ffc107" opacity="0.2" />
      {/* Shimmer lines */}
      <line x1="150" y1="230" x2="250" y2="230" stroke="#fff" strokeWidth="1" opacity="0.2"/>
      <line x1="170" y1="250" x2="230" y2="250" stroke="#fff" strokeWidth="1" opacity="0.1"/>
      <line x1="190" y1="270" x2="210" y2="270" stroke="#fff" strokeWidth="1" opacity="0.05"/>
    </svg>
  );

  return (
    <section id="gallery" style={{ padding: '120px 5%', backgroundColor: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Heading Section */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--gold)' }}></div>
            <span style={{ color: 'var(--gold)', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase' }}>
              Gallery
            </span>
            <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--gold)' }}></div>
          </div>
          
          <h2 className="font-playfair" style={{ fontSize: '48px', color: '#ffffff', marginBottom: '15px' }}>
            A Glimpse Into <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Our Madrasa</em>
          </h2>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            "Every corner tells a story. Every frame captures the spirit of learning."
          </p>
        </div>

        <style>{`
          .gallery-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr 1fr;
            grid-template-rows: 300px 300px;
            gap: 12px;
            margin-bottom: 50px;
          }
          .gallery-item-tall {
            grid-row: span 2;
          }
          .gallery-item {
            /* Default items fit 1 row */
          }

          @media (max-width: 900px) {
            .gallery-grid {
              grid-template-columns: 1fr;
              grid-template-rows: auto;
            }
            .gallery-item-tall, .gallery-item {
              grid-row: span 1 !important;
              height: 250px;
            }
          }
        `}</style>

        {/* Asymmetric Masonry Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="gallery-grid"
        >
          {/* Col 1: Tall image */}
          <GalleryItem 
            title="Geometric Chandelier" 
            src="/gallery-1.jpg" 
            isTall={true} 
          />
          
          {/* Col 2 Top */}
          <GalleryItem 
            title="Crystal Chandelier Mosque" 
            src="/gallery-2.jpg" 
          />
          
          {/* Col 3 Top */}
          <GalleryItem 
            title="Islamic Majlis" 
            src="/gallery-3.jpg" 
          />
          
          {/* Col 2 Bottom */}
          <GalleryItem 
            title="Geometric Carpet Hall" 
            src="/gallery-4.jpg" 
          />
          
          {/* Col 3 Bottom: SVG Illustration */}
          <GalleryItem 
            title="Night Sky Design" 
            svgContent={nightSkyMosqueSvg}
            customLabel="Madrasa at Night"
          />
        </motion.div>

        {/* Bottom Section */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '25px', opacity: 0.7 }}>
            📸 More photos coming soon
          </p>
          <button style={{
            background: 'transparent',
            color: 'var(--gold)',
            border: '1px solid var(--gold)',
            padding: '12px 30px',
            fontSize: '15px',
            fontWeight: '600',
            borderRadius: '50px',
            cursor: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(201,168,76,0.1)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.transform = 'translateY(0)';
          }}
          >
            Share Your Photos
          </button>
        </div>

      </div>
    </section>
  );
};

export default Gallery;
