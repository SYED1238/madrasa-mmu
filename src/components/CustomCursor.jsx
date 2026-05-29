import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Update trail
      setTrail((prevTrail) => {
        const newTrail = [...prevTrail, { x: e.clientX, y: e.clientY, id: Date.now() }];
        if (newTrail.length > 6) {
          newTrail.shift();
        }
        return newTrail;
      });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'button' || 
          e.target.tagName.toLowerCase() === 'a' ||
          e.target.closest('button') ||
          e.target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    const updateRing = () => {
      setRingPos((prevPos) => {
        const dx = mousePos.x - prevPos.x;
        const dy = mousePos.y - prevPos.y;
        return {
          x: prevPos.x + dx * 0.15,
          y: prevPos.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateRing);
    };

    animationFrameId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  useEffect(() => {
    const cleanupTrail = setInterval(() => {
      setTrail((prev) => {
        if (prev.length > 0) {
          const newTrail = [...prev];
          newTrail.shift();
          return newTrail;
        }
        return prev;
      });
    }, 50);

    return () => clearInterval(cleanupTrail);
  }, []);

  return (
    <>
      <div 
        className="cursor-dot" 
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }} 
      />
      <div 
        className="cursor-ring" 
        style={{ 
          left: `${ringPos.x}px`, 
          top: `${ringPos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 1})`,
          opacity: isHovering ? 0.5 : 1
        }} 
      />
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="cursor-trail"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            opacity: (index + 1) * 0.08,
            transform: `translate(-50%, -50%) scale(${(index + 1) * 0.15})`
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
