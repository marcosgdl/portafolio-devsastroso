// src/components/LoadingScreen/LoadingScreen.jsx
import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Simulamos la velocidad de carga
    const interval = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Avanza un poco cada vez para que se vea natural
        const diff = Math.random() * 15; 
        return Math.min(oldProgress + diff, 100);
      });
    }, 200); // Se actualiza cada 200 milisegundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Cuando llega a 100%, espera medio segundo, se desvanece y desaparece
    if (progress === 100) {
      setTimeout(() => {
        setIsFading(true);
        setTimeout(onComplete, 500); // Espera a que termine la animación CSS
      }, 500);
    }
  }, [progress, onComplete]);

  return (
    <div className={`loading-screen ${isFading ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <img src="carga.png" alt="DEVsastroso" className="loading-logo" />
        
        <div className="loading-bar-container">
          <div 
            className="loading-bar-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <span className="loading-text">{Math.floor(progress)}%</span>
      </div>
    </div>
  );
}