// src/components/CookieBanner/CookieBanner.jsx
import React, { useState, useEffect } from 'react';
import './CookieBanner.css';

export default function CookieBanner({ lang }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isEating, setIsEating] = useState(false); // Estado para alternar las imágenes de la galleta

  // 🚀 ANIMACIÓN AUTOMÁTICA: Corre en PC y Celular por igual
  useEffect(() => {
    if (!isVisible) return;

    // Cambia entre morder y sostener la galleta cada 800 milisegundos
    const interval = setInterval(() => {
      setIsEating(prev => !prev);
    }, 800);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  // Diccionario con tus textos simplificados
  const t = {
    es: {
      text: "Este sitio no usa cookies para nada, pero tenía ganas de hacer esta animación.",
      btn: "ACEPTAR"
    },
    en: {
      text: "This site doesn't use cookies at all, but I really wanted to make this animation.",
      btn: "ACCEPT"
    }
  }[lang] || {
    text: "Este sitio no usa cookies para nada, pero tenía ganas de hacer esta animación.",
    btn: "ACEPTAR"
  };

  return (
    <div className="cookie-banner-wrapper">
      <div className="cookie-banner">
        
        {/* CONTENEDOR DE LA IMAGEN (Se mueve sola en bucle) */}
        <div className="cookie-avatar-container">
          <img 
            src={isEating ? "/galleta-2.png" : "/galleta-1.png"} 
            alt="Marcos comiendo galletas" 
            className="cookie-avatar"
          />
        </div>

        {/* CONTENEDOR DEL TEXTO Y BOTÓN */}
        <div className="cookie-info">
          <p>{t.text}</p>
          <div className="cookie-actions">
            <button 
              className="cookie-btn-accept"
              onClick={() => setIsVisible(false)} // Solo cierra al dar clic
            >
              {t.btn}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}