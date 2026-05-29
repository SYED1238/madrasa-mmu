import React, { useState } from 'react';

const ProgramCard = ({ number, icon, title, subtitle, description, tags, isActive, onMouseEnter }) => {
  return (
    <div 
      onMouseEnter={onMouseEnter}
      style={{
        position: 'relative',
        backgroundColor: '#12121f',
        borderRadius: '12px',
        padding: '30px 20px',
        cursor: 'none',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: isActive ? 'scale(1.02)' : 'scale(1)',
        zIndex: isActive ? 10 : 1,
        border: isActive ? '1px solid var(--gold)' : '1px solid transparent',
        boxShadow: isActive ? '0 10px 30px rgba(201,168,76,0.15)' : 'none',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <span style={{ color: 'var(--gold-dim)', fontWeight: '700', fontSize: '20px' }}>{number}</span>
        {isActive && (
          <span style={{ 
            backgroundColor: 'rgba(26, 71, 42, 0.2)', 
            color: '#2ecc71', 
            padding: '4px 8px', 
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}>
            ● ACTIVE
          </span>
        )}
      </div>

      <div style={{ fontSize: '40px', marginBottom: '15px' }}>{icon}</div>
      
      <h3 className="font-playfair text-gold" style={{ fontSize: '24px', marginBottom: '5px' }}>
        {title}
      </h3>
      
      <p style={{ color: 'var(--gold)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px', opacity: 0.7 }}>
        {subtitle}
      </p>

      <div style={{
        height: isActive ? 'auto' : '0',
        opacity: isActive ? 1 : 0,
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
          {description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
          {tags.map((tag, idx) => (
            <span key={idx} style={{
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--text-primary)',
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {tag}
            </span>
          ))}
        </div>
        
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', color: 'var(--gold)' }}>
          ➔
        </div>
      </div>
    </div>
  );
};

const Programs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const programs = [
    {
      icon: "📖", title: "Hifz ul Quran", subtitle: "TAHFIZ MEMORIZATION QURAN",
      description: "A dedicated program for students to memorize the Holy Quran with correct Tajweed and Qira'at under the guidance of expert Huffaz.",
      tags: ["Full-time", "Intensive", "Tajweed"]
    },
    {
      icon: "🎓", title: "Aalim Course", subtitle: "FIQH HADITH TAFSEER",
      description: "Comprehensive Islamic scholarship covering Arabic grammar, Islamic jurisprudence, sayings of the Prophet, and Quranic exegesis.",
      tags: ["Scholarly", "7 Years", "Advanced"]
    },
    {
      icon: "🕌", title: "Maktab Classes", subtitle: "NAZRA DUAS AQEEDAH",
      description: "Foundation level classes for young children focusing on basic reading of the Quran, daily supplications, and core Islamic beliefs.",
      tags: ["Beginners", "Part-time", "Evening"]
    },
    {
      icon: "🌙", title: "Arabic Language", subtitle: "SARF NAHW ARABIC",
      description: "Intensive language program to understand classical Arabic, enabling direct comprehension of the Quran and Islamic texts.",
      tags: ["Language", "Grammar", "Syntax"]
    },
    {
      icon: "✍️", title: "Urdu & Kannada", subtitle: "URDU KANNADA LITERACY",
      description: "Ensuring our students are literate in their mother tongue and the regional language for effective community integration.",
      tags: ["Regional", "Literacy", "Communication"]
    },
    {
      icon: "🤲", title: "Character Building", subtitle: "AKHLAQ ADAB SUNNAH",
      description: "Instilling the prophetic manners, moral values, and practical sunnahs into the daily lives of the students.",
      tags: ["Morality", "Practical", "Tarbiyah"]
    }
  ];

  return (
    <section id="programs" style={{ padding: '100px 5%', backgroundColor: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="font-amiri text-gold" style={{ fontSize: '24px', marginBottom: '10px' }}>برامجنا</p>
          <h2 className="font-playfair" style={{ fontSize: '48px', color: 'var(--text-primary)' }}>Our Programs</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {programs.map((prog, idx) => (
            <ProgramCard
              key={idx}
              number={String(idx + 1).padStart(2, '0')}
              icon={prog.icon}
              title={prog.title}
              subtitle={prog.subtitle}
              description={prog.description}
              tags={prog.tags}
              isActive={activeIndex === idx}
              onMouseEnter={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
