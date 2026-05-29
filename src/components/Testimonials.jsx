import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      text: "My son memorized 5 Juz in his first year. The Ustaads here are truly dedicated. Alhamdulillah.",
      author: "Mohammed Irfan",
      role: "Parent, Ramanagara"
    },
    {
      text: "This Madrasa changed my child's character completely. He wakes for Fajr now without being told.",
      author: "Ayesha Begum",
      role: "Parent, Bidadi"
    },
    {
      text: "The environment here is pure. My brother studies here and I have seen him grow in Deen and discipline.",
      author: "Khalid Ahmed",
      role: "Community Member, Ramanagara"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="testimonials" style={{ padding: '100px 5%', backgroundColor: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="font-playfair text-gold" style={{ fontSize: '42px', marginBottom: '10px' }}>
            What Parents Say
          </h2>
          <div style={{ color: 'var(--gold)', fontSize: '24px', letterSpacing: '5px' }}>
            ★★★★★
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}
        >
          {testimonials.map((test, idx) => (
            <motion.div key={idx} variants={itemVariants} style={{
              backgroundColor: 'var(--bg-card)',
              borderLeft: '4px solid var(--gold)',
              padding: '40px 30px',
              borderRadius: '0 12px 12px 0',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                fontSize: '60px',
                color: 'var(--gold)',
                opacity: 0.2,
                fontFamily: 'serif',
                lineHeight: 1
              }}>
                "
              </div>
              <p style={{
                color: 'var(--text-primary)',
                fontSize: '16px',
                lineHeight: '1.8',
                marginBottom: '30px',
                position: 'relative',
                zIndex: 2,
                fontStyle: 'italic'
              }}>
                "{test.text}"
              </p>
              <div>
                <h4 style={{ color: 'var(--gold)', fontSize: '18px', marginBottom: '5px' }}>
                  {test.author}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                  {test.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;
