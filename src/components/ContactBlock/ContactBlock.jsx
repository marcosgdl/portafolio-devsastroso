// src/components/ContactBlock/ContactBlock.jsx
import React, { useState } from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram, FaUserFriends, FaMugHot } from 'react-icons/fa';
import MsnMessenger from '../MsnMessenger/MsnMessenger'; // <-- Importamos tu MSN
import './ContactBlock.css';

export default function ContactBlock({ lang }) {
  const [isMsnOpen, setIsMsnOpen] = useState(false); // <-- Estado para controlar la ventana

  const dictionary = {
    es: {
      title: "CONTACTO",
      msn: "MSN Messenger",
      x: "X (Twitter)",
      ig: "Instagram",
      coffee: "Invítame un Café"
    },
    en: {
      title: "CONTACT",
      msn: "MSN Messenger",
      x: "X (Twitter)",
      ig: "Instagram",
      coffee: "Buy me a Coffee"
    }
  };

  const t = dictionary[lang] || dictionary.es;

  return (
    <section className="contact-wrapper">
      
      <div className="contact-header">
        <div className="contact-line"></div>
        <h2 className="contact-main-title">{t.title}</h2>
        <div className="contact-line"></div>
      </div>

      <div className="contact-icons-grid">
        
        {/* 1. MSN MESSENGER - Ahora abre el Modal */}
        <button className="contact-item brand-msn" onClick={() => setIsMsnOpen(true)}>
          <div className="icon-circle">
            <FaUserFriends className="contact-icon" />
          </div>
          <span className="contact-label">{t.msn}</span>
        </button>

        {/* 2. X (TWITTER) */}
        <a href="https://twitter.com/DEVsastroso" target="_blank" rel="noreferrer" className="contact-item brand-x">
          <div className="icon-circle">
            <FaXTwitter className="contact-icon" />
          </div>
          <span className="contact-label">{t.x}</span>
        </a>

        {/* 3. INSTAGRAM */}
        <a href="https://www.instagram.com/_marcosenriquez" target="_blank" rel="noreferrer" className="contact-item brand-ig">
          <div className="icon-circle">
            <FaInstagram className="contact-icon" />
          </div>
          <span className="contact-label">{t.ig}</span>
        </a>

        {/* 4. CAFÉ */}
        <a href="https://buymeacoffee.com/marcos.dev" target="_blank" rel="noreferrer" className="contact-item brand-coffee">
          <div className="icon-circle">
            <FaMugHot className="contact-icon" />
          </div>
          <span className="contact-label">{t.coffee}</span>
        </a>

      </div>

      {/* NUEVA LÍNEA LIMPIA AL FINAL DE LA SECCIÓN */}
      <div className="contact-bottom-line"></div>

      {/* RENDERIZAMOS EL MSN SI EL ESTADO ES TRUE */}
      {isMsnOpen && <MsnMessenger onClose={() => setIsMsnOpen(false)} />}

    </section>
  );
}