import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" style={{ padding: '100px 5%', overflow: 'hidden' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '60px',
        alignItems: 'center'
      }}>
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ display: 'inline-block', marginBottom: '20px' }}>
            <h2 className="font-playfair text-gold" style={{ fontSize: '42px', marginBottom: '5px' }}>
              About Our Madrasa
            </h2>
            <div style={{ height: '2px', background: 'var(--gold)', width: '60%' }}></div>
          </div>
          
          <p style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: 'var(--text-muted)',
            marginBottom: '30px',
            textAlign: 'justify'
          }}>
            Madrasa e Madeenatul Uloom is one of Ramanagara's most trusted Islamic educational institutions, 
            operating under the distinguished M.M.U. Trust (Madras-E-Madinathul-Uloom Trust) — founded by 
            Shri Haji Syed Muneer. Nestled in the heart of Ramanagara, Karnataka (PIN: 562159), the Madrasa 
            has been a beacon of Islamic knowledge, Quranic education, and moral character-building for the 
            Muslim community of this region. Our doors are open to every child — regardless of financial background.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {['Open to All Children', 'MMU Trust Certified', 'Community Supported'].map((badge, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'var(--bg-card)',
                padding: '12px 20px',
                borderRadius: '8px',
                border: '1px solid var(--gold-dim)'
              }}>
                <span style={{ color: 'var(--green)' }}>✅</span>
                <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{badge}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Content - SVG Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            position: 'relative',
            padding: '20px',
            border: '2px solid var(--gold)',
            borderRadius: '16px',
            background: 'var(--bg-card)'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            width: '40px',
            height: '40px',
            borderTop: '2px solid var(--gold-light)',
            borderLeft: '2px solid var(--gold-light)',
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-10px',
            right: '-10px',
            width: '40px',
            height: '40px',
            borderBottom: '2px solid var(--gold-light)',
            borderRight: '2px solid var(--gold-light)',
          }}></div>

          <svg viewBox="0 0 500 600" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a0b0d" />
                <stop offset="100%" stopColor="#080810" />
              </linearGradient>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e8c96d" />
                <stop offset="50%" stopColor="#c9a84c" />
                <stop offset="100%" stopColor="#8c702b" />
              </linearGradient>
            </defs>
            
            <rect width="500" height="600" fill="url(#bgGrad)" rx="8" />
            
            {/* Background elements */}
            <circle cx="250" cy="200" r="150" fill="rgba(201,168,76,0.05)" />
            <path d="M 250 50 C 350 50 420 120 420 220 L 420 600 L 80 600 L 80 220 C 80 120 150 50 250 50 Z" fill="rgba(201,168,76,0.1)" />
            
            {/* Main Dome */}
            <path d="M 250 80 C 330 180 370 230 370 300 L 130 300 C 130 230 170 180 250 80 Z" fill="url(#goldGrad)" />
            <path d="M 250 80 C 290 180 310 230 310 300 L 190 300 C 190 230 210 180 250 80 Z" fill="#e8c96d" opacity="0.3" />
            <circle cx="250" cy="60" r="8" fill="url(#goldGrad)" />
            <rect x="248" cy="68" width="4" height="15" fill="url(#goldGrad)" />
            
            {/* Building Body */}
            <rect x="100" y="300" width="300" height="300" fill="#150f16" />
            
            {/* Main Arch */}
            <path d="M 250 320 C 320 320 350 380 350 450 L 350 600 L 150 600 L 150 450 C 150 380 180 320 250 320 Z" fill="#080810" />
            <path d="M 250 335 C 310 335 335 390 335 450 L 335 600 L 165 600 L 165 450 C 165 390 190 335 250 335 Z" fill="url(#goldGrad)" opacity="0.2" />
            
            {/* Door */}
            <path d="M 250 400 C 290 400 310 440 310 500 L 310 600 L 190 600 L 190 500 C 190 440 210 400 250 400 Z" fill="#050508" />
            
            {/* Minarets */}
            {/* Left Minaret */}
            <rect x="60" y="200" width="30" height="400" fill="#150f16" />
            <path d="M 75 140 L 95 200 L 55 200 Z" fill="url(#goldGrad)" />
            <rect x="50" y="250" width="50" height="10" fill="url(#goldGrad)" />
            <rect x="50" y="350" width="50" height="10" fill="url(#goldGrad)" />
            <circle cx="75" cy="130" r="4" fill="url(#goldGrad)" />
            
            {/* Right Minaret */}
            <rect x="410" y="200" width="30" height="400" fill="#150f16" />
            <path d="M 425 140 L 445 200 L 405 200 Z" fill="url(#goldGrad)" />
            <rect x="400" y="250" width="50" height="10" fill="url(#goldGrad)" />
            <rect x="400" y="350" width="50" height="10" fill="url(#goldGrad)" />
            <circle cx="425" cy="130" r="4" fill="url(#goldGrad)" />
            
            {/* Decorative Stars */}
            <path d="M 250 360 L 253 370 L 263 370 L 255 376 L 258 386 L 250 380 L 242 386 L 245 376 L 237 370 L 247 370 Z" fill="url(#goldGrad)" />
            <path d="M 120 400 L 122 405 L 127 405 L 123 408 L 124 413 L 120 410 L 116 413 L 117 408 L 113 405 L 118 405 Z" fill="url(#goldGrad)" />
            <path d="M 380 400 L 382 405 L 387 405 L 383 408 L 384 413 L 380 410 L 376 413 L 377 408 L 373 405 L 378 405 Z" fill="url(#goldGrad)" />
            
            {/* Birds */}
            <path d="M 100 100 Q 110 90 120 100 Q 110 95 100 100" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="2" />
            <path d="M 120 100 Q 130 90 140 100 Q 130 95 120 100" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="2" />
            
            <path d="M 380 120 Q 385 115 390 120 Q 385 117 380 120" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5" />
            <path d="M 390 120 Q 395 115 400 120 Q 395 117 390 120" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
