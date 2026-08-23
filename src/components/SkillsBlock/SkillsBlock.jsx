// src/components/SkillsBlock/SkillsBlock.jsx
import React, { useState } from 'react';
import { 
  FaHtml5, FaServer, FaReact, FaRobot, FaBolt, FaMobileAlt, FaCode, 
  FaCubes, FaPencilRuler, FaProjectDiagram, FaNetworkWired, FaGitAlt, 
  FaLayerGroup, FaDatabase 
} from 'react-icons/fa';
import './SkillsBlock.css';

export default function SkillsBlock({ lang }) {
  const [activeMode, setActiveMode] = useState('none'); 

  const dictionary = {
    es: {
      mainTitle: "SKILLS",
      selectPersonality: "SELECCIONA ALGUNA DE MIS PERSONALIDADES",
      mobileInstruction: "👆 Toca una mitad para explorarla", // 🚀 Nueva instrucción móvil
      jokeTitle: "<DEVsastroso>",
      introJoke: "¡Si esto no compila me muero!",
      joke1: "Programo HTML directo en el Notepad (y a veces en Word).",
      joke2: "JS, Python y PHP: Sé lo suficiente para tirar producción.",
      joke3: "Apps multiplataforma para tener los mismos bugs en iOS y Android.",
      joke4: "Copio y pego de las IAs bien rapidísimo.",
      joke5: "Tomo Red Bull como si no hubiera un mañana.",
      joke6: "Contribuyo al código abierto (corrigiendo comas en el README).",
      realTitle: "</Marcos>",
      introReal: "Por si eres un RH que me quiere dar dinero.",
      real1: "Python • PHP • JavaScript • Java • Dart",
      real2: "HTML5 • CSS3 • React • Flutter",
      real3: "Programación Orientada a Objetos (POO)",
      real4: "Arquitectura y Diseño de Software",
      real5: "Modelado de Negocios y UML",
      real6: "APIs REST",
      real7: "Git y Control de Versiones",
      real8: "Estructuras de Datos y Algoritmos",
      real9: "Bases de Datos",
      real10: "Desarrollo Web y Móvil",
      real11: "Automatización y Bots"
    },
    en: {
      mainTitle: "SKILLS",
      selectPersonality: "CHOOSE ONE OF MY PERSONALITIES",
      mobileInstruction: "👆 Tap a half to explore", // 🚀 Nueva instrucción móvil
      jokeTitle: "<DEVsastroso>",
      introJoke: "If this doesn't compile, I'm dead!",
      joke1: "I code HTML directly in Notepad (and sometimes Word).",
      joke2: "JS, Python & PHP: I know enough to bring down production.",
      joke3: "Cross-platform apps to have the same bugs on iOS and Android.",
      joke4: "I copy-paste from AIs super fast.",
      joke5: "I drink Red Bull like there's no tomorrow.",
      joke6: "I contribute to open source (fixing commas in READMEs).",
      realTitle: "</Marcos>",
      introReal: "Employer who wants to give me money.",
      real1: "Python • PHP • JavaScript • Java • Dart",
      real2: "HTML5 • CSS3 • React • Flutter",
      real3: "Object-Oriented Programming (OOP)",
      real4: "Software Architecture and Design",
      real5: "Business Modeling and UML",
      real6: "RESTful APIs",
      real7: "Git and Version Control",
      real8: "Data Structures and Algorithms",
      real9: "Databases",
      real10: "Web and Mobile Development",
      real11: "Automation and Bots"
    }
  };

  const t = dictionary[lang] || dictionary.es;

  return (
    <div className="skills-wrapper">
      
      <div className="skills-header">
        <div className="skills-line"></div>
        <h2 className="skills-main-title">{t.mainTitle}</h2>
        <div className="skills-line"></div>
      </div>

      <p className="skills-personality-subtitle">{t.selectPersonality}</p>
      
      {/* 🚀 INSTRUCCIÓN SOLO PARA MÓVIL */}
      <p className="skills-mobile-instruction">{t.mobileInstruction}</p>

      <section className={`skills-split-section mode-${activeMode}`}>
        
        {/* ZONAS DE HOVER EN ESCRITORIO (Ajustadas a la nueva foto) */}
        <div className="desktop-hover-zones">
          <div 
            className="hover-zone zone-left"
            onMouseEnter={() => setActiveMode('real')}
            onMouseLeave={() => setActiveMode('none')}
          />
          <div 
            className="hover-zone zone-right"
            onMouseEnter={() => setActiveMode('joke')}
            onMouseLeave={() => setActiveMode('none')}
          />
        </div>

        {/* 🚀 MITAD IZQUIERDA: INGENIERO MARCOS (ing.jpeg) */}
        <div className={`skills-half left-side ${activeMode === 'real' ? 'is-active' : ''}`}>
          {/* Botón X mágico para móvil */}
          <button className="mobile-close-skills" onClick={() => setActiveMode('none')}>&times;</button>
          
          <div className="skills-text-content text-left">
            <h3 className="skills-title">{t.realTitle}</h3>
            <p className="skills-intro">{t.introReal}</p>
            <ul className="skills-list list-real professional-grid">
              <li><FaCode className="skill-icon" /> {t.real1}</li>
              <li><FaReact className="skill-icon" /> {t.real2}</li>
              <li><FaCubes className="skill-icon" /> {t.real3}</li>
              <li><FaPencilRuler className="skill-icon" /> {t.real4}</li>
              <li><FaProjectDiagram className="skill-icon" /> {t.real5}</li>
              <li><FaNetworkWired className="skill-icon" /> {t.real6}</li>
              <li><FaGitAlt className="skill-icon" /> {t.real7}</li>
              <li><FaLayerGroup className="skill-icon" /> {t.real8}</li>
              <li><FaDatabase className="skill-icon" /> {t.real9}</li>
              <li><FaMobileAlt className="skill-icon" /> {t.real10}</li>
              <li><FaRobot className="skill-icon" /> {t.real11}</li>
            </ul>
          </div>
        </div>

        {/* 🚀 IMAGEN CENTRAL DIVIDIDA Y CLICKABLE PARA MÓVIL */}
        <div className="skills-center-image">
          {/* Lado izquierdo (Ingeniero) */}
          <div 
            className={`img-half ${activeMode === 'joke' ? 'is-blurred' : ''} ${activeMode === 'real' ? 'is-focused' : ''}`}
            onClick={() => setActiveMode(activeMode === 'real' ? 'none' : 'real')}
          >
            <img src="/ing.jpeg" alt="Ingeniero Marcos" />
          </div>
          
          {/* Lado derecho (DEVsastroso) */}
          <div 
            className={`img-half ${activeMode === 'real' ? 'is-blurred' : ''} ${activeMode === 'joke' ? 'is-focused' : ''}`}
            onClick={() => setActiveMode(activeMode === 'joke' ? 'none' : 'joke')}
          >
            <img src="/dev.jpeg" alt="DEVsastroso" />
          </div>
        </div>

        {/* 🚀 MITAD DERECHA: DEVsastroso (dev.jpeg) */}
        <div className={`skills-half right-side ${activeMode === 'joke' ? 'is-active' : ''}`}>
           {/* Botón X mágico para móvil */}
          <button className="mobile-close-skills" onClick={() => setActiveMode('none')}>&times;</button>

          <div className="skills-text-content text-left">
            <h3 className="skills-title">{t.jokeTitle}</h3>
            <p className="skills-intro">{t.introJoke}</p>
            <div className="paper-note">
              <div className="tape tape-top"></div>
              <div className="tape tape-bottom"></div>
              <ul className="skills-list list-joke">
                <li><FaHtml5 className="skill-icon" /> {t.joke1}</li>
                <li><FaServer className="skill-icon" /> {t.joke2}</li>
                <li><FaReact className="skill-icon" /> {t.joke3}</li>
                <li><FaRobot className="skill-icon" /> {t.joke4}</li>
                <li><FaBolt className="skill-icon" /> {t.joke5}</li>
                <li><FaCode className="skill-icon" /> {t.joke6}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="skills-floor-line"></div>

      </section>
    </div>
  );
}