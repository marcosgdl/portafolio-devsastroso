// src/components/Header/Header.jsx
import React, { useState } from 'react';
import { FaHandPointUp } from 'react-icons/fa'; // 🚀 IMPORTAMOS LA MANITA AQUÍ
import './Header.css';

export default function Header({ isDark, toggleTheme, lang, toggleLanguage }) {
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dictionary = {
    es: {
      about: 'Acerca de',
      services: 'Skills',
      work: 'Portafolio',
      games: 'Odio los zancudos', 
      contact: 'Contacto',
      langSwitch: 'EN'
    },
    en: {
      about: 'About',
      services: 'Skills',
      work: 'Work',
      games: 'I hate zancudos', 
      contact: 'Contact',
      langSwitch: 'ES'
    }
  };

  const t = dictionary[lang];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 🚀 MAGIA CORREGIDA: Maneja el scroll y el juego tanto en PC como en Móvil
  const handleMosquitoAction = (e, isMobile = false) => {
    // 1. Evitamos el comportamiento por defecto de 'saltar' del link
    e.preventDefault(); 
    
    // 2. Iniciamos el juego
    window.dispatchEvent(new Event('iniciar-caceria')); 
    
    // 3. Si estamos en móvil, cerramos el menú desplegable primero
    if (isMobile) {
      toggleMobileMenu();
    }
    
    // 4. Viajamos linealmente/suavemente a la sección usando JS
    const zancudoSection = document.getElementById('zancudos');
    if (zancudoSection) {
      // Calculamos la posición considerando el scroll-padding-top que pusimos en CSS
      const offsetTop = zancudoSection.offsetTop - 80; 
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth' // Mantiene el efecto lineal que querías
      });
    }
  };

  // Estilo base para los enlaces normales que NO rompen nada
  const linkStyle = { 
    textDecoration: 'none', 
    color: 'inherit', 
    display: 'block', 
    width: '100%' 
  };

  return (
    <>
      <header className={`header ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="logo" style={{ zIndex: 200, position: 'relative' }}>
          <span className="logo-dev">DEV</span>
          <span className="logo-sastroso">sastroso</span>
        </div>
        
        {/* MENÚ DE ESCRITORIO */}
        <ul className="nav-menu desktop-only">
          <li className="nav-link">
            <a href="#acerca" style={linkStyle}>{t.about}</a>
          </li>
          <li className="nav-link">
            <a href="#skills" style={linkStyle}>{t.services}</a>
          </li>
          <li className="nav-link">
            <a href="#portafolio" style={linkStyle}>{t.work}</a>
          </li>
          
          {/* 🚀 CORREGIDO PC: Ahora usa la nueva función combinada */}
          <li 
            className="nav-link" 
            style={{ color: '#410099', cursor: 'pointer', position: 'relative' }} 
          >
            <a 
              href="#zancudos" // Lo mantenemos por semántica, pero la JS lo controla
              style={linkStyle}
              onClick={(e) => handleMosquitoAction(e, false)} // Pasa false porque es PC
            >
              {t.games}
              <FaHandPointUp className="pointing-hand" />
            </a>
          </li>
          
          <li className="nav-link">
            <a href="#contacto" style={linkStyle}>{t.contact}</a>
          </li>
        </ul>
        
        <div className="controls" style={{ zIndex: 200, position: 'relative' }}>
          <button 
            className="hamburger-btn mobile-only" 
            onClick={toggleMobileMenu}
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>

          <button 
            className="theme-toggle desktop-only" 
            onClick={toggleTheme}
            aria-label="Cambiar tema"
          >
            <span className="theme-dot"></span>
            <span className="theme-label">{isDark ? '#FFF' : '#000'}</span>
          </button>
          
          <button 
            className="lang-toggle desktop-only" 
            onClick={toggleLanguage}
            aria-label="Cambiar idioma"
          >
            {t.langSwitch}
          </button>
        </div>
      </header>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          <li className="mobile-nav-link" onClick={toggleMobileMenu}>
            <a href="#acerca" style={linkStyle}>{t.about}</a>
          </li>
          <li className="mobile-nav-link" onClick={toggleMobileMenu}>
            <a href="#skills" style={linkStyle}>{t.services}</a>
          </li>
          <li className="mobile-nav-link" onClick={toggleMobileMenu}>
            <a href="#portafolio" style={linkStyle}>{t.work}</a>
          </li>
          
          {/* 🚀 CORREGIDO MÓVIL: Usa la misma función combinada pasando true */}
          <li 
            className="mobile-nav-link" 
            style={{ color: '#410099', fontWeight: 'bold' }} 
            onClick={(e) => handleMosquitoAction(e, true)}
          >
            {t.games}
          </li>
          
          <li className="mobile-nav-link" onClick={toggleMobileMenu}>
            <a href="#contacto" style={linkStyle}>{t.contact}</a>
          </li>
        </ul>
        
        <div className="mobile-controls">
          <button className="theme-toggle" onClick={() => { toggleTheme(); toggleMobileMenu(); }}>
            <span className="theme-dot"></span>
            <span className="theme-label">{isDark ? '#FFF' : '#000'}</span>
          </button>
          <button className="lang-toggle" onClick={toggleLanguage}>
            {lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          </button>
        </div>
      </div>
    </>
  );
}