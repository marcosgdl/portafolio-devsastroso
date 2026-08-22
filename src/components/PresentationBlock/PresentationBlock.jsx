// src/components/PresentationBlock/PresentationBlock.jsx
import React from 'react';
import './PresentationBlock.css';

// 1. Importamos TODOS los iconos que necesitamos (agregamos FaPaintbrush para pintar)
import { 
  FaHtml5, FaJs, FaReact, FaPhp, FaAndroid, FaPython, FaWindows, FaLinux, FaYahoo,
  FaFutbol, FaLaptopCode, FaBookOpen, FaXTwitter, FaCameraRetro, FaGamepad, FaPaintbrush 
} from 'react-icons/fa6';
import { SiFlutter, SiDart } from 'react-icons/si';
import { MdSkateboarding } from 'react-icons/md';

export default function PresentationBlock({ lang }) {
  
  // 2. Diccionario con la nueva sección de Hobbies
  const dictionary = {
    es: {
      title: "SOY MARCOS ENRIQUEZ",
      p1: "¡Hola! Soy un Ingeniero en Desarrollo de Software nacido en la ciudad de Guadalajara, Jalisco, México.",
      p2: "Me encanta la innovación y el desarrollo tecnológico, me gusta crear soluciones de software que transformen ideas en realidad.",
      p3: "Intento diseñar y construir aplicaciones que marquen la diferencia. Mi experiencia en el desarrollo de software me ha llevado a explorar un amplio espectro de tecnologías, desde lenguajes de programación como JavaScript, Python y PHP hasta el pequeño ejemplo de esta web en React, me encanta trabajar con Dart y Flutter.",
      p4: "En mi tiempo libre, me gusta hacer de todo menos programar, me encanta el futbol, comunmente estoy peleando en X (Twitter), leyendo, pintando algo, viendo lucha libre o los Simpson.",
      // Hobbies
      hobbiesTitle: "HOBBIES:",
      hbSoccer: "Fútbol",
      hbSkate: "Patinar",
      hbCode: "Programar",
      hbRead: "Lectura",
      hbX: "X (Twitter)",
      hbPhoto: "Fotografía",
      hbGames: "Videojuegos",
      hbPaint: "Pintar" // <-- NUEVO HOBBY
    },
    en: {
      title: "I AM MARCOS ENRIQUEZ",
      p1: "Hello! I'm a Software Development Engineer born in the city of Guadalajara, Jalisco, Mexico.",
      p2: "I love innovation and technological development; I enjoy creating software solutions that turn ideas into reality.",
      p3: "I strive to design and build applications that make a difference. My experience in software development has led me to explore a wide spectrum of technologies, from programming languages like JavaScript, Python, and PHP to the small example of this website in React. I love working with Dart and Flutter.",
      p4: "In my free time, I like doing everything except programming, I love soccer, I'm usually fighting on X (Twitter), reading, painting something, or watching wrestling or The Simpsons.",
      // Hobbies
      hobbiesTitle: "HOBBIES:",
      hbSoccer: "Soccer",
      hbSkate: "Skateboarding",
      hbCode: "Coding",
      hbRead: "Reading",
      hbX: "X (Twitter)",
      hbPhoto: "Photography",
      hbGames: "Video Games",
      hbPaint: "Painting" // <-- NUEVO HOBBY
    }
  };

  const t = dictionary[lang] || dictionary.es;

  return (
    <section className="presentation-container">
      
      {/* COLUMNA IZQUIERDA: EL VIDEO */}
      <div className="video-column">
        <div className="video-frame">
          <video autoPlay loop muted playsInline className="presentation-video">
            <source src="/video.mp4" type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>
        </div>
      </div>

      {/* COLUMNA DERECHA: SOBRE MÍ */}
      <div className="about-column">
        <h2 className="about-title">{t.title}</h2>
        
        {/* ICONOS DE TECNOLOGÍAS */}
        <div className="tech-icons">
          <FaHtml5 title="HTML5" />
          <FaJs title="JavaScript" />
          <FaReact title="React" />
          <FaPhp title="PHP" />
          <FaAndroid title="Android" />
          <FaPython title="Python" />
          <FaLinux title="Linux" />
          <FaWindows title="Windows" />
          <SiDart title="Dart" />
          <SiFlutter title="Flutter" />
        </div>
        
        <p className="about-text">{t.p1}</p>
        <p className="about-text">{t.p2}</p>
        <p className="about-text">{t.p3}</p>
        <p className="about-text">{t.p4}</p>

        {/* --- NUEVA SECCIÓN DE HOBBIES --- */}
        <h2 className="about-title hobbies-title">{t.hobbiesTitle}</h2>
        <div className="hobbies-icons">
          <div className="hobby-item" data-tooltip={t.hbSoccer}><FaFutbol /></div>
          <div className="hobby-item" data-tooltip={t.hbSkate}><MdSkateboarding /></div>
          <div className="hobby-item" data-tooltip={t.hbCode}><FaLaptopCode /></div>
          <div className="hobby-item" data-tooltip={t.hbRead}><FaBookOpen /></div>
          <div className="hobby-item" data-tooltip={t.hbX}><FaXTwitter /></div>
          <div className="hobby-item" data-tooltip={t.hbPhoto}><FaCameraRetro /></div>
          <div className="hobby-item" data-tooltip={t.hbGames}><FaGamepad /></div>
          {/* 🚀 NUEVO: Icono de pintar agregado */}
          <div className="hobby-item" data-tooltip={t.hbPaint}><FaPaintbrush /></div> 
        </div>
      
      </div>

    </section>
  );
}