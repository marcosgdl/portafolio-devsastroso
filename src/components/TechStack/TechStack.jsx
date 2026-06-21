// src/components/TechStack/TechStack.jsx
import React, { useState } from 'react';
import { FaTimes, FaRocket } from 'react-icons/fa';
import './TechStack.css';

const WaveLine = () => (
  <svg viewBox="0 0 120 20" xmlns="http://www.w3.org/2000/svg" className="wave-svg">
    <path 
      d="M0,10 Q10,0 20,10 T40,10 T60,10 T80,10 T100,10 T120,10" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default function TechStack({ lang }) {
  const [launchStatus, setLaunchStatus] = useState('idle'); // idle | launching | exploding | modal

  // 🚀 DICCIONARIO BILINGÜE ACTUALIZADO CON TUS NUEVAS STATS
  const dictionary = {
    es: {
      techStackBtn: "VER TECH STACK",
      modalTitle: "ESTADÍSTICAS GLOBALES",
      competencyDist: "DISTRIBUCIÓN DE COMPETENCIAS",
      marcosTitle: "MARCOS ENRÍQUEZ",
      devsastrosoTitle: "DEVsastroso",
      
      // Skills Marcos (ES)
      frontend: "Frontend",
      backend: "Backend",
      api: "APIs REST",
      db: "Bases de datos",
      uiux: "UI/UX",
      python: "Python",
      flutter: "Flutter / Dart",
      htmlcss: "HTML / CSS",

      // Skills DEVsastroso (ES)
      prod: "Tumbar producción viernes",
      coca: "Tomar Coca Cola",
      pizza: "Comer pizza",
      debug: "Debug a las 3 AM",
      machine: "«Funciona en mi máquina»",
      ia: "IA copy/paste",
      sleep: "Dormir bien",
      bugs: "Arreglar bugs creando otros"
    },
    en: {
      techStackBtn: "VIEW TECH STACK",
      modalTitle: "GLOBAL STATISTICS",
      competencyDist: "COMPETENCY DISTRIBUTION",
      marcosTitle: "MARCOS ENRÍQUEZ",
      devsastrosoTitle: "DEVsastroso",
      
      // Skills Marcos (EN)
      frontend: "Frontend",
      backend: "Backend",
      api: "REST APIs",
      db: "Databases",
      uiux: "UI/UX",
      python: "Python",
      flutter: "Flutter / Dart",
      htmlcss: "HTML / CSS",

      // Skills DEVsastroso (EN)
      prod: "Crashing production on Friday",
      coca: "Drinking Coca Cola",
      pizza: "Eating pizza",
      debug: "Debugging at 3 AM",
      machine: "\"Works on my machine\"",
      ia: "AI copy/paste",
      sleep: "Sleeping well",
      bugs: "Fixing bugs by creating new ones"
    }
  };

  const t = dictionary[lang] || dictionary.es;

  const handleLaunch = () => {
    setLaunchStatus('launching'); 
    setTimeout(() => {
      setLaunchStatus('exploding'); 
      setTimeout(() => {
        setLaunchStatus('modal'); 
      }, 500);
    }, 1200); 
  };

  const closeModal = () => {
    setLaunchStatus('idle'); 
  };

  return (
    <div className="tech-stack-wrapper">

      {/* --- DISTRIBUCIÓN DE COMPETENCIAS --- */}
      <div className="tech-skills-bar-section">
        <div className="tech-header">
          <div className="tech-line"></div>
          <h3 className="tech-title">{t.competencyDist}</h3>
          <div className="tech-line"></div>
        </div>

        <div className="bar-container-main">
          <div className="bar-track-main">
            <div className="skills-bar-fill skills-bar-fill-code" style={{ width: '40%' }}>
              <span>Code 40%</span>
            </div>
            <div className="skills-bar-fill skills-bar-fill-ing" style={{ width: '60%' }}>
              <span>Ingeniería 60%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* BOTÓN DISPARADOR CON ONDAS */}
      <div className="launch-container">
        <div className="wave-container left-wave">
          <WaveLine />
        </div>
        <button className="launch-btn" onClick={handleLaunch}>
          <FaRocket className="btn-rocket-icon" /> {t.techStackBtn}
        </button>
        <div className="wave-container right-wave">
          <WaveLine />
        </div>
      </div>

      <div className="tech-bottom-line"></div>

      {/* ANIMACIONES */}
      {(launchStatus === 'launching' || launchStatus === 'exploding') && (
        <div className="animation-overlay">
          {launchStatus === 'launching' && (
            <img src="/cohete.png" alt="Rocket" className="rocket-img flying" />
          )}
          {launchStatus === 'exploding' && (
            <img src="/explosion.png" alt="Boom" className="explosion-img boom" />
          )}
        </div>
      )}

      {/* EL MODAL CON LAS DOS SECCIONES */}
      {launchStatus === 'modal' && (
        <div className="tech-modal-overlay">
          <div className="tech-modal-content">
            <button className="close-modal-btn" onClick={closeModal}><FaTimes /></button>
            
            
            <div className="modal-columns-grid">
              
              {/* COLUMNA 1: MARCOS ENRÍQUEZ (REALES) */}
              <div className="modal-column">
                <h4 className="column-subtitle text-marcos">{t.marcosTitle}</h4>
                <div className="bars-container">
                  
                  <div className="bar-row"><span className="bar-label">{t.htmlcss}</span><div className="bar-track"><div className="bar-fill" style={{ width: '95%' }}><span>95%</span></div></div></div>
                  <div className="bar-row"><span className="bar-label">{t.api}</span><div className="bar-track"><div className="bar-fill" style={{ width: '85%' }}><span>85%</span></div></div></div>
                  <div className="bar-row"><span className="bar-label">{t.flutter}</span><div className="bar-track"><div className="bar-fill" style={{ width: '85%' }}><span>85%</span></div></div></div>
                  <div className="bar-row"><span className="bar-label">{t.backend}</span><div className="bar-track"><div className="bar-fill" style={{ width: '80%' }}><span>80%</span></div></div></div>
                  <div className="bar-row"><span className="bar-label">{t.db}</span><div className="bar-track"><div className="bar-fill" style={{ width: '75%' }}><span>75%</span></div></div></div>
                  <div className="bar-row"><span className="bar-label">{t.frontend}</span><div className="bar-track"><div className="bar-fill" style={{ width: '70%' }}><span>70%</span></div></div></div>
                  <div className="bar-row"><span className="bar-label">{t.uiux}</span><div className="bar-track"><div className="bar-fill" style={{ width: '70%' }}><span>70%</span></div></div></div>
                  <div className="bar-row"><span className="bar-label">{t.python}</span><div className="bar-track"><div className="bar-fill" style={{ width: '70%' }}><span>70%</span></div></div></div>

                </div>
              </div>

              {/* COLUMNA 2: DEVSASTROSO (CHAOS METRICS) */}
              <div className="modal-column">
                <h4 className="column-subtitle text-devsastroso">{t.devsastrosoTitle}</h4>
                <div className="bars-container">
                  
                  <div className="bar-row"><span className="bar-label">{t.pizza}</span><div className="bar-track"><div className="bar-fill" style={{ width: '100%' }}><span>100%</span></div></div></div>
                  <div className="bar-row"><span className="bar-label">{t.machine}</span><div className="bar-track"><div className="bar-fill" style={{ width: '100%' }}><span>100%</span></div></div></div>
                  <div className="bar-row"><span className="bar-label">{t.bugs}</span><div className="bar-track"><div className="bar-fill" style={{ width: '96%' }}><span>96%</span></div></div></div>
                  <div className="bar-row"><span className="bar-label">{t.coca}</span><div className="bar-track"><div className="bar-fill" style={{ width: '95%' }}><span>95%</span></div></div></div>
                  <div className="bar-row"><span className="bar-label">{t.debug}</span><div className="bar-track"><div className="bar-fill" style={{ width: '93%' }}><span>93%</span></div></div></div>
                  <div className="bar-row"><span className="bar-label">{t.ia}</span><div className="bar-track"><div className="bar-fill" style={{ width: '87%' }}><span>87%</span></div></div></div>
                  <div className="bar-row"><span className="bar-label">{t.prod}</span><div className="bar-track"><div className="bar-fill" style={{ width: '80%' }}><span>80%</span></div></div></div>
                  <div className="bar-row"><span className="bar-label">{t.sleep}</span><div className="bar-track"><div className="bar-fill" style={{ width: '10%' }}><span>10%</span></div></div></div>

                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}