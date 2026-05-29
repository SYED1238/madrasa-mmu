import React from 'react';

const Admissions = () => {
  return (
    <section id="admissions" style={{ padding: '100px 5%', backgroundColor: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="font-playfair text-gold" style={{ fontSize: '42px', marginBottom: '10px' }}>Admissions</h2>
          <p style={{ color: 'var(--text-muted)' }}>Join our community of learners</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px'
        }}>
          
          {/* Left Info Card */}
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--gold-dim)',
            borderRadius: '16px',
            padding: '40px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>

            <h3 className="font-playfair" style={{ fontSize: '28px', color: 'var(--gold)', marginBottom: '30px' }}>
              Key Information
            </h3>
            
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <li style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px' }}>📅</span>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '5px' }}>Academic Year</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Begins after Ramadan (Shawwal)</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px' }}>👦</span>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '5px' }}>Age Requirement</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Open to all children (5 years and above)</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px' }}>📋</span>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '5px' }}>Required Documents</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Birth Certificate, Parent ID, Previous Records</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px' }}>💰</span>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '5px' }}>Fees Structure</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Minimal / Subsidized — Contact for details</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px' }}>🕌</span>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '5px' }}>Medium of Instruction</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Urdu, Arabic, Kannada, English</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Form */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <h3 className="font-playfair" style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '10px' }}>
              Enquire Now
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '30px' }}>
              Fill out this form or reach us directly on WhatsApp.
            </p>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input 
                type="text" 
                placeholder="Parent's Name" 
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '15px',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontFamily: 'Inter',
                  outline: 'none',
                  cursor: 'none'
                }}
              />
              <input 
                type="text" 
                placeholder="Child's Name" 
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '15px',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontFamily: 'Inter',
                  outline: 'none',
                  cursor: 'none'
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <input 
                  type="number" 
                  placeholder="Child's Age" 
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '15px',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontFamily: 'Inter',
                    outline: 'none',
                    cursor: 'none'
                  }}
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '15px',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontFamily: 'Inter',
                    outline: 'none',
                    cursor: 'none'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <button type="button" style={{
                  flex: 1,
                  background: 'var(--gold)',
                  color: 'var(--bg-primary)',
                  border: 'none',
                  padding: '15px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'none',
                  transition: 'background 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = 'var(--gold-light)'}
                onMouseOut={(e) => e.target.style.background = 'var(--gold)'}
                >
                  Submit Enquiry
                </button>
                <a 
                  href="https://wa.me/910000000000" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    background: '#25D366',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '15px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'none',
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '0.9'}
                  onMouseOut={(e) => e.target.style.opacity = '1'}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admissions;
