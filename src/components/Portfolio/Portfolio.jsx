// src/components/Portfolio/Portfolio.jsx
import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Portfolio.css';

export default function Portfolio({ lang }) {
  const scrollRef = useRef(null);

  // MAGIA: Metemos código JSX directo en el diccionario
  const dictionary = {
    es: {
      sectionTitle: <>ALGUNOS DE <span className="highlight-text">MIS</span> ÚLTIMOS <span className="highlight-text">TRABAJOS</span></>
    },
    en: {
      sectionTitle: <>SOME OF <span className="highlight-text">MY</span> LATEST <span className="highlight-text">WORK</span></>
    }
  };

  const t = dictionary[lang] || dictionary.es;

  // Tu lista real de proyectos con sus imágenes
  const projects = [
    { id: 1, title: 'fantasy-bowl.com', category: 'Frontend-Backend-API', img: '/1.png' },
    { id: 2, title: 'Bot X', category: 'Python-Script-API', img: '/2.png' },
    { id: 3, title: 'cicocamezcala.com', category: 'Frontend-Backend-API', img: '/3.png' },
    { id: 4, title: 'Natalia Game', category: 'APK Android', img: '/4.png' },
    { id: 5, title: 'officerollo.com', category: 'Frontend-Backend-API-Script-IA', img: '/5.png' },
    { id: 6, title: 'hilosmodiz.mx', category: 'Server-e-commerce', img: '/6.png' },
    { id: 7, title: 'vivesuprym.com', category: 'Backend', img: '/7.png' },
    { id: 8, title: 'Generador etiquetas', category: 'Python .exe', img: '/8.png' },
    { id: 9, title: 'Generador recibos', category: 'Windows Forms-.NET', img: '/9.png' }
  ];

  // Función para mover el carrusel con las flechas
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -350 : 350; 
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="portfolio-wrapper">
      
      {/* 🚀 NUEVO ENCABEZADO: Título arriba, FREElance abajo */}
      <div className="portfolio-header-container">
        <div className="portfolio-title-row">
          <div className="portfolio-line"></div>
          <h3 className="portfolio-title">{t.sectionTitle}</h3>
          <div className="portfolio-line"></div>
        </div>
        <p className="portfolio-freelance-label">FREElance</p>
      </div>

      <div className="carousel-container">
        {/* FLECHA IZQUIERDA (Oculta en móvil por CSS) */}
        <button className="carousel-arrow left-arrow" onClick={() => scroll('left')}>
          <FaChevronLeft />
        </button>

        {/* CONTENEDOR DESLIZABLE */}
        <div className="portfolio-track" ref={scrollRef}>
          {projects.map((project) => (
            <div className="portfolio-card" key={project.id}>
              
              {/* Contenedor de la imagen real */}
              <div className="card-image-wrapper">
                <img src={project.img} alt={project.title} className="card-image" />
              </div>
              
              {/* Textos del proyecto */}
              <div className="card-info">
                <h4 className="card-title">{project.title}</h4>
                <p className="card-category">{project.category}</p>
              </div>

            </div>
          ))}
        </div>

        {/* FLECHA DERECHA (Oculta en móvil por CSS) */}
        <button className="carousel-arrow right-arrow" onClick={() => scroll('right')}>
          <FaChevronRight />
        </button>
      </div>

    </section>
  );
}