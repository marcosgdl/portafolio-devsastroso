// src/components/Zancudo/Zancudo.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Zancudo.css';

const Zancudo = () => {
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [isDead, setIsDead] = useState(false);
  const [isHuntingMode, setIsHuntingMode] = useState(false);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSpraying, setIsSpraying] = useState(false);
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);

  const zumbidoRef = useRef(null);
  const sprayRef = useRef(null); 

  useEffect(() => {
    zumbidoRef.current = new Audio('/mosquito.mp3');
    zumbidoRef.current.loop = true; 
    zumbidoRef.current.volume = 0.4; 

    sprayRef.current = new Audio('/spray.mp3');
    sprayRef.current.volume = 0.7; 
    
    return () => {
      if (zumbidoRef.current) {
        zumbidoRef.current.pause();
        zumbidoRef.current = null;
      }
      if (sprayRef.current) {
        sprayRef.current.pause();
        sprayRef.current = null;
      }
    };
  }, []);

  const iniciarCaceria = () => {
    if (!isDead) {
      setIsHuntingMode(true);
      if (zumbidoRef.current) {
        zumbidoRef.current.play().catch(err => console.log("Audio bloqueado:", err));
      }
    }
  };

  useEffect(() => {
    const handleInvasion = () => iniciarCaceria();
    window.addEventListener('iniciar-caceria', handleInvasion);
    
    return () => {
      window.removeEventListener('iniciar-caceria', handleInvasion);
    };
  }, [isDead]);

  const detenerCaceria = () => {
    setIsHuntingMode(false);
    if (zumbidoRef.current) {
      zumbidoRef.current.pause(); 
    }
  };

  const handleSmack = (e) => {
    e.stopPropagation(); 
    if (isHuntingMode) {
      setIsDead(true);
      setIsHuntingMode(false); 
      setIsHoveringMenu(false); 
      if (zumbidoRef.current) {
        zumbidoRef.current.pause(); 
      }
    }
  };

  useEffect(() => {
    if (isDead) return;
    const speed = isHuntingMode ? 1200 : 800;

    const moveZancudo = () => {
      const randomTop = Math.floor(Math.random() * 85) + 5;
      const randomLeft = Math.floor(Math.random() * 85) + 5;
      setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
    };

    const intervalId = setInterval(moveZancudo, speed);
    return () => clearInterval(intervalId);
  }, [isDead, isHuntingMode]);

  const handleSprayAction = () => {
    setIsSpraying(true);
    if (sprayRef.current) {
      sprayRef.current.currentTime = 0; 
      sprayRef.current.play().catch(err => console.log("Spray bloqueado:", err));
    }
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      {/* OVERLAY DE CACERÍA */}
      {isHuntingMode && (
        <div 
          className="hunting-overlay" 
          onMouseMove={handleMouseMove}
          onTouchMove={(e) => setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY })} /* 🚀 Soporte para mover el dedo en celular */
          onMouseDown={handleSprayAction} 
          onTouchStart={handleSprayAction} /* 🚀 Soporte para disparar spray con el dedo */
          onMouseUp={() => setIsSpraying(false)} 
          onTouchEnd={() => setIsSpraying(false)} /* 🚀 Soporte para soltar el spray en celular */
          onContextMenu={(e) => e.preventDefault()} 
        >
          <div 
            className="hunting-instructions"
            onMouseEnter={() => setIsHoveringMenu(true)}
            onMouseLeave={() => setIsHoveringMenu(false)}
          >
            ¡MODO CACERÍA ACTIVADO! <br/>
            <span>Rocía al zancudo.</span>
            <button className="cancel-hunt-btn" onClick={detenerCaceria}>
              Me rindo, déjalo vivir
            </button>
          </div>

          {!isHoveringMenu && (
            <div 
              className={`custom-spray ${isSpraying ? 'spraying-active' : ''}`}
              style={{ left: mousePos.x, top: mousePos.y }}
            >
              <img src={isSpraying ? "/spray-accion.png" : "/spray-reposo.png"} alt="Spray" />
            </div>
          )}
        </div>
      )}

      {/* EL ZANCUDO (VIVO O MUERTO) */}
      <div 
        className={isDead ? "zancudo-dead" : (isHuntingMode ? "zancudo-hunted" : "zancudo-alive")} 
        style={
          isDead 
            ? { top: 'calc(100vh - 110px)', left: position.left } 
            : { top: position.top, left: position.left }
        }
        onMouseDown={handleSmack}
        onTouchStart={handleSmack} /* 🚀 Soporte para aplastar al zancudo con el dedo */
      >
        <img 
          src={isDead ? "/zancudo-muerto.png" : "/zancudo-vivo.png"} 
          alt="Zancudo" 
          className="zancudo-img" 
        />
      </div>
    </>
  );
};

export default Zancudo;