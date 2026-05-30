import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ style = {} }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const setLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div 
      className="cursor-none-desktop"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'rgba(8, 8, 16, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(201, 168, 76, 0.3)',
        borderRadius: '30px',
        padding: '3px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4), 0 0 10px rgba(201, 168, 76, 0.05)',
        ...style
      }}
    >
      <button
        onClick={() => setLanguage('en')}
        className="cursor-none-desktop"
        style={{
          background: currentLanguage === 'en' ? 'var(--gold)' : 'transparent',
          color: currentLanguage === 'en' ? '#080810' : 'rgba(240, 237, 228, 0.7)',
          border: 'none',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          cursor: 'none',
          transition: 'all 0.3s ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          if (currentLanguage !== 'en') e.target.style.color = 'var(--gold)';
        }}
        onMouseLeave={(e) => {
          if (currentLanguage !== 'en') e.target.style.color = 'rgba(240, 237, 228, 0.7)';
        }}
      >
        ENGLISH
      </button>
      <span style={{ color: 'rgba(201, 168, 76, 0.3)', fontSize: '10px', padding: '0 4px', pointerEvents: 'none' }}>•</span>
      <button
        onClick={() => setLanguage('ur')}
        className="cursor-none-desktop"
        style={{
          background: currentLanguage === 'ur' ? 'var(--gold)' : 'transparent',
          color: currentLanguage === 'ur' ? '#080810' : 'rgba(240, 237, 228, 0.7)',
          border: 'none',
          padding: '4px 14px 6px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
          cursor: 'none',
          transition: 'all 0.3s ease',
          fontFamily: "'Noto Nastaliq Urdu', 'Amiri', serif",
          outline: 'none',
          lineHeight: '1.4'
        }}
        onMouseEnter={(e) => {
          if (currentLanguage !== 'ur') e.target.style.color = 'var(--gold)';
        }}
        onMouseLeave={(e) => {
          if (currentLanguage !== 'ur') e.target.style.color = 'rgba(240, 237, 228, 0.7)';
        }}
      >
        اردو
      </button>
    </div>
  );
};

export default LanguageSwitcher;
