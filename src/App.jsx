import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen/LoadingScreen'; // 🚀 AQUÍ ESTÁ LA IMPORTACIÓN
import Header from './components/Header/Header';
import PhilosophyBlock from './components/PhilosophyBlock/PhilosophyBlock';
import PresentationBlock from './components/PresentationBlock/PresentationBlock';
import SkillsBlock from './components/SkillsBlock/SkillsBlock';
import TechStack from './components/TechStack/TechStack';
import Portfolio from './components/Portfolio/Portfolio';
import ContactBlock from './components/ContactBlock/ContactBlock';
import Zancudo from './components/Zancudo/Zancudo'; 
import Footer from './components/Footer/Footer';
import CookieBanner from './components/CookieBanner/CookieBanner';
import './styles/global.css';

export default function App() {
  // 🚀 ESTADO PARA LA PANTALLA DE CARGA
  const [isLoading, setIsLoading] = useState(true);

  // Estados globales de la aplicación
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState('es'); 

  // Hook para el modo oscuro
  useEffect(() => {
    if (isDark) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [isDark]);

  // Funciones para cambiar los estados
  const toggleTheme = () => setIsDark(!isDark);
  const toggleLanguage = () => setLang(lang === 'es' ? 'en' : 'es'); 

  return (
    <div>
      {/* 🚀 COMPONENTE DE CARGA: Cubre toda la pantalla al inicio */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <Header 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        lang={lang} 
        toggleLanguage={toggleLanguage}
      />
      
      <PhilosophyBlock lang={lang} /> 
      
      {/* 🚀 ANCLA: Acerca de */}
      <section id="acerca">
        <PresentationBlock lang={lang} />
      </section>

      {/* 🚀 ANCLA: Skills */}
      <section id="skills">
        <SkillsBlock lang={lang} />
        <TechStack lang={lang} /> {/* Agrupé TechStack aquí para que sea parte de Skills */}
      </section>

      {/* 🚀 ANCLA: Portafolio */}
      <section id="portafolio">
        <Portfolio lang={lang} />
      </section>

      {/* 🚀 ANCLA: Contacto */}
      <section id="contacto">
        <ContactBlock lang={lang} />
      </section>

      <Footer lang={lang} />

      {/* 🚀 ANCLA: Zancudo */}
      <div id="zancudos">
        <Zancudo />
      </div>

      <CookieBanner lang={lang} />
      
    </div>
  );
}