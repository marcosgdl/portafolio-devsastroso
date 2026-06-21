// src/components/Footer/Footer.jsx
import React, { useState, useEffect } from 'react';
import { FaHeart, FaReact, FaEnvelope } from 'react-icons/fa'; // 🚀 AGREGAMOS EL SOBRE
import './Footer.css';

export default function Footer({ lang }) {
  const [visits, setVisits] = useState('...');
  
  // 🚀 MAGIA: Sacamos el año actual automáticamente
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetch('https://api.counterapi.dev/v1/devsastroso/portafolio/up')
      .then(res => res.json())
      .then(data => setVisits(data.count))
      .catch(() => setVisits('103')); 
  }, []);

  const t = {
    es: {
      visits: 'VISITAS',
      made1: 'Hecho con el ',
      made2: ' y un poco de ',
      made3: ' en Guadalajara, Mx. V.2.0',
      karma: 'Obra protegida por la Ley del Karma ©'
    },
    en: {
      visits: 'VISITS',
      made1: 'Made with ',
      made2: ' and a bit of ',
      made3: ' in Guadalajara, Mx. V.2.0',
      karma: 'Protected by the Law of Karma ©'
    }
  }[lang] || { 
    visits: 'VISITAS', 
    made1: 'Hecho con el ',
    made2: ' y un poco de ',
    made3: ' en Guadalajara, Mx. V.2.0',
    karma: 'Obra protegida por la Ley del Karma ©'
  };

  return (
    <footer className="site-footer">
      <div className="footer-content">
        
        <div className="footer-left">
          <span className="visits-label">{t.visits}</span>
          <span className="visits-number">{visits}</span>
        </div>

        <div className="footer-right">
          {/* 🚀 AQUÍ INTERCALAMOS LOS TEXTOS CON LOS ÍCONOS */}
          <p className="footer-made-by">
            {t.made1} <FaHeart className="icon-heart" /> {t.made2} <FaReact className="icon-react" /> {t.made3}
          </p>
          <p className="footer-karma">{t.karma}</p>
          
          {/* 🚀 EL CORREO CLICKEABLE CON SU ÍCONO */}
          <a href="mailto:marcos@devsastroso.dev" className="footer-email">
            <FaEnvelope className="icon-envelope" /> marcos@devsastroso.dev
          </a>

          {/* 🚀 LA FECHA AUTOMÁTICA SÚPER ELEGANTE */}
          <p className="footer-year">
            {currentYear} Marcos Enriquez | DEVsastroso .
          </p>
        </div>

      </div>
    </footer>
  );
}