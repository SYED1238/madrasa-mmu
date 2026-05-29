import React, { useEffect, useState, useRef } from 'react';

const Counter = ({ end, duration, label }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration / 16); // assuming 60fps
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return (
    <div ref={counterRef} style={{ textAlign: 'center', padding: '20px' }}>
      <h3 className="font-playfair text-gold" style={{ fontSize: '36px', marginBottom: '10px' }}>
        {count}+
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        {label}
      </p>
    </div>
  );
};

const Stats = () => {
  return (
    <section style={{
      backgroundColor: 'var(--bg-card)',
      borderTop: '1px solid var(--gold-dim)',
      borderBottom: '1px solid var(--gold-dim)',
      padding: '40px 0',
      position: 'relative',
      zIndex: 20
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '30px',
        padding: '0 20px'
      }}>
        <Counter end={40} duration={2000} label="Years of Service" />
        <Counter end={500} duration={2000} label="Students Enrolled" />
        <Counter end={15} duration={2000} label="Qualified Ustaads" />
        <Counter end={1000} duration={2000} label="Community Members" />
      </div>
    </section>
  );
};

export default Stats;
