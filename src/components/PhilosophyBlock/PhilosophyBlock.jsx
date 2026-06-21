// src/components/PhilosophyBlock/PhilosophyBlock.jsx
import React from 'react';
import './PhilosophyBlock.css';
import MiniPlayer from '../MiniPlayer/MiniPlayer'; 
import { FaYahoo } from 'react-icons/fa6';

export default function PhilosophyBlock({ lang }) {
  const dictionary = {
    es: {
      tagline: 'Soy un desastre.',
      part1: '¡No sé qué hago, pero compila!',
      // Se eliminó la "Y!" del final para sustituirla por el logo
      part2: 'Quizás ya usaste alguna de mis ideas en internet y ni te diste cuenta.'
    },
    en: {
      tagline: 'I am a disaster.',
      part1: "I don't know what I'm doing, but it compiles!",
      // Se eliminó la "Y!" del final para sustituirla por el logo
      part2: "Maybe you have already used some of my ideas on the internet and didn't even realize it."
    }
  };

  const t = dictionary[lang] || dictionary.es;

  return (
    <div className="philosophy-container">
      
      <div className="philosophy-line line-menu">
        <span className="philosophy-tagline">{t.tagline}</span>
        <span className="philosophy-text">{t.part1}</span>
      </div>

      <div className="philosophy-player">
        <MiniPlayer lang={lang} />
      </div>

      <div className="philosophy-line line-logo">
        <span className="philosophy-text">
          {t.part2}
          {/* El logo inyectado directamente en el flujo del texto */}
          <FaYahoo 
            style={{ 
              color: '#7B0099', 
              fontSize: '1.2em', 
              verticalAlign: 'middle', 
              marginLeft: '6px',
              marginTop: '-4px' // Ajuste fino para que quede bien alineado con la fuente
            }} 
            title="Yahoo!" 
          />
        </span>
      </div>
      
    </div>
  );
}