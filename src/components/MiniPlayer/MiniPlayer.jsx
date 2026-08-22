import React, { useState, useRef } from 'react';
import UploadModal from '../UploadModal/UploadModal';
import './MiniPlayer.css';

export default function MiniPlayer({ lang }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const audioRef = useRef(null);

  const dictionary = {
    es: {
      title: 'Lo que escucho mientras la IA la caga',
    },
    en: {
      title: 'What I listen to while AI screws up',
    }
  };

  const t = dictionary[lang] || dictionary.es;

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className="mini-player-container">
        {/* El título vuelve a estar limpio y solo */}
        <span className="player-title">{t.title}</span>
        
        <div className="player-divider"></div>
        
        <div className="player-controls">
          <button className="play-btn" onClick={togglePlay} aria-label="Reproducir música">
            {isPlaying ? '⏸' : '▶'}
          </button>
          
          <div className={`wave-container ${isPlaying ? 'playing' : ''}`}>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
          </div>

          {/* ¡NUEVA POSICIÓN DEL ENGRANE! */}
          {/* ¡NUEVO ICONO DE GOOGLE! */}
          <button 
            className="settings-btn"
            onClick={() => setIsModalOpen(true)} 
            title="Cambiar musica"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', fontWeight: '300' }}>
              directory_sync
            </span>
          </button>
        </div>
        
        <div className="player-divider"></div>
        
        <audio 
          ref={audioRef} 
          src="https://marcos.creamoscodigo.com/devsastroso/music/marcos.mp3" 
          loop 
        />
      </div>

        {isModalOpen && <UploadModal onClose={() => setIsModalOpen(false)} lang={lang} />}          </>
  );
}