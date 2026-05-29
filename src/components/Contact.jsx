import React from 'react';

const Contact = () => {
  return (
    <section id="contact" style={{ padding: '100px 5%', backgroundColor: 'var(--bg-card)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="font-playfair text-gold" style={{ fontSize: '42px', marginBottom: '10px' }}>Contact Us</h2>
          <p style={{ color: 'var(--text-muted)' }}>We are always here to assist you</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'clamp(25px, 4vw, 50px)',
          alignItems: 'center'
        }}>
          
          {/* Custom Static Map Card */}
          <div className="contact-map-card" style={{
            border: '2px solid var(--gold)',
            borderRadius: '16px',
            overflow: 'hidden',
            position: 'relative',
            background: '#040b12',
            height: 'clamp(320px, 45vh, 450px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            
            <style>{`
              @keyframes pulseRing {
                0% { transform: scale(0.5); opacity: 0; }
                50% { opacity: 0.5; }
                100% { transform: scale(3); opacity: 0; }
              }
              .map-grid {
                background-size: 30px 30px;
                background-image: 
                  linear-gradient(to right, rgba(0, 128, 128, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0, 128, 128, 0.1) 1px, transparent 1px);
              }
              @media (max-width: 768px) {
                .contact-map-card {
                  height: 350px !important;
                }
              }
            `}</style>

            {/* Map Background Grid */}
            <div className="map-grid" style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 1
            }}></div>

            {/* Map Routes/Lines Graphic */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, opacity: 0.2 }}>
              <path d="M -50 100 Q 150 150 200 250 T 450 350" fill="none" stroke="var(--gold)" strokeWidth="3" />
              <path d="M 100 -50 L 150 150 L 50 300 L 250 450" fill="none" stroke="teal" strokeWidth="2" strokeDasharray="5,5" />
            </svg>

            {/* Location Pin with Pulse */}
            <div style={{ position: 'relative', zIndex: 2, marginBottom: '20px', marginTop: '-30px' }}>
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60px', height: '60px',
                border: '2px solid var(--gold)',
                borderRadius: '50%',
                animation: 'pulseRing 2s infinite cubic-bezier(0.215, 0.61, 0.355, 1)'
              }}></div>
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60px', height: '60px',
                border: '2px solid var(--gold)',
                borderRadius: '50%',
                animation: 'pulseRing 2s infinite cubic-bezier(0.215, 0.61, 0.355, 1)',
                animationDelay: '1s'
              }}></div>
              
              <svg width="40" height="55" viewBox="0 0 40 55" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'relative', zIndex: 3, filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.5))' }}>
                <path d="M20 0C8.954 0 0 8.954 0 20C0 35 20 55 20 55C20 55 40 35 40 20C40 8.954 31.046 0 20 0Z" fill="var(--gold)"/>
                <circle cx="20" cy="20" r="8" fill="#040b12"/>
              </svg>
            </div>

            {/* Text Overlay */}
            <div style={{ position: 'relative', zIndex: 2, padding: '0 20px', background: 'radial-gradient(ellipse at center, rgba(4,11,18,0.9) 0%, rgba(4,11,18,0) 80%)', paddingTop: '20px' }}>
              <h3 className="font-playfair" style={{ color: 'var(--gold)', fontSize: '24px', marginBottom: '8px' }}>
                Madrasa e Madeenatul Uloom
              </h3>
              <p style={{ color: 'var(--text-primary)', fontSize: '15px', marginBottom: '4px' }}>
                Ramanagara, Karnataka 562159
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', letterSpacing: '1px', marginBottom: '25px' }}>
                Plus Code: P78H+XXV
              </p>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <a 
                  href="https://maps.google.com/?q=Madrasa+e+madeenatul+Uloom+Ramanagara+562159" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{
                    background: 'var(--gold)',
                    color: 'var(--bg-primary)',
                    textDecoration: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(201,168,76,0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'var(--gold-light)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'var(--gold)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Open in Google Maps
                </a>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=P78H%2BXXV+Ramanagara" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{
                    background: 'transparent',
                    color: 'var(--gold)',
                    border: '1px solid var(--gold)',
                    textDecoration: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(201,168,76,0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Get Directions
                </a>
              </div>
            </div>

          </div>

          {/* Contact Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'rgba(201,168,76,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0
              }}>📍</div>
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '18px', marginBottom: '5px' }}>Location</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Ramanagara, Karnataka 562159</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'rgba(201,168,76,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0
              }}>📞</div>
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '18px', marginBottom: '5px' }}>Phone Number</h4>
                <p style={{ color: 'var(--text-muted)' }}>[To Be Updated]</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'rgba(201,168,76,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0
              }}>💬</div>
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '18px', marginBottom: '5px' }}>WhatsApp</h4>
                <p style={{ color: 'var(--text-muted)' }}>[To Be Updated]</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'rgba(201,168,76,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0
              }}>📧</div>
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '18px', marginBottom: '5px' }}>Email Address</h4>
                <p style={{ color: 'var(--text-muted)' }}>[To Be Updated]</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'rgba(201,168,76,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0
              }}>🗺️</div>
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '18px', marginBottom: '5px' }}>Plus Code</h4>
                <p style={{ color: 'var(--text-muted)' }}>P78H+XXV</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
