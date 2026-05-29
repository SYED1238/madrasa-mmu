import React, { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState([]);

  const isMouseDown = useRef(false);
  const loopRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Sync cursor positions and handle particle spawning
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePos({ x: clientX, y: clientY });
      mousePosRef.current = { x: clientX, y: clientY };

      // Spawn a new particle
      setParticles((prev) => {
        // Enforce maximum limit of 40 particles to prevent DOM bloat
        const limit = 40;
        const cleanPrev = prev.length >= limit ? prev.slice(prev.length - limit + 1) : prev;

        const isDragging = isMouseDown.current;
        const newParticle = {
          id: Math.random().toString(36).substring(2, 9) + '-' + Date.now() + '-' + Math.random(),
          x: clientX,
          y: clientY,
          // Dragging spreads particles faster, normal movement creates a tight trail
          vx: (Math.random() - 0.5) * (isDragging ? 3.2 : 0.8),
          vy: (Math.random() - 0.5) * (isDragging ? 3.2 : 0.8),
          size: Math.random() * (isDragging ? 6 : 3) + 3, // 3-9px for drag, 3-6px for normal
          life: 1.0,
          decay: Math.random() * 0.035 + 0.02 // decays in 20-50 frames (approx 0.3s - 0.8s)
        };
        return [...cleanPrev, newParticle];
      });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.closest('[role="button"]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => {
      isMouseDown.current = true;
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    const handleMouseLeave = () => {
      isMouseDown.current = false;
      setParticles([]); // Clear particles instantly on leave
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // requestAnimationFrame Physics & Ring Lag Loop
  useEffect(() => {
    const updateLoop = () => {
      // 1. Update lag ring pos
      setRingPos((prevPos) => {
        const target = mousePosRef.current;
        const dx = target.x - prevPos.x;
        const dy = target.y - prevPos.y;
        return {
          x: prevPos.x + dx * 0.15,
          y: prevPos.y + dy * 0.15
        };
      });

      // 2. Physics update particles
      setParticles((prevParticles) => {
        if (prevParticles.length === 0) return prevParticles;
        return prevParticles
          .map((p) => {
            const nextLife = p.life - p.decay;
            return {
              ...p,
              x: p.x + p.vx,
              y: p.y + p.vy,
              life: nextLife
            };
          })
          .filter((p) => p.life > 0);
      });

      loopRef.current = requestAnimationFrame(updateLoop);
    };

    loopRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (loopRef.current) {
        cancelAnimationFrame(loopRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Main Cursor Dot */}
      <div
        className="cursor-dot"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px`, pointerEvents: 'none' }}
      />
      
      {/* Outer Ring */}
      <div
        className="cursor-ring"
        style={{
          left: `${ringPos.x}px`,
          top: `${ringPos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.6 : 1})`,
          opacity: isHovering ? 0.45 : 1,
          pointerEvents: 'none'
        }}
      />
      
      {/* Decaying Particle Trail */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="cursor-trail"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.life * 0.6,
            transform: `translate(-50%, -50%) scale(${p.life})`,
            pointerEvents: 'none'
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
