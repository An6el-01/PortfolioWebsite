import React, { useState } from 'react';
import Header from './components/Header';
import Background from './utils/background';
import Experience from './components/Experience';
import Projects from './components/Projects';
import AboutMe from './components/AboutMe';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isEnglandFlag, setIsEnglandFlag] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleFlag = () => {
    setIsEnglandFlag(!isEnglandFlag);
  };

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      {/* Sticky Header Navigation */}
      <Header isDarkMode={isDarkMode} />
      {/* Dynamic Background Component */}
      <Background isDarkMode={isDarkMode} />
      {/* Main Content */}
      <div className="content">
        <Hero 
          isDarkMode={isDarkMode} 
          onToggleDarkMode={toggleDarkMode}
          isEnglandFlag={isEnglandFlag}
          onToggleFlag={toggleFlag}
        />
        <AboutMe isDarkMode={isDarkMode} />
        <Projects isDarkMode={isDarkMode} />
        <Experience isDarkMode={isDarkMode} />
        <Contact isDarkMode={isDarkMode} />
      </div>
      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
