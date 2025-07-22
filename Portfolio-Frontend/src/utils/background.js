import React from 'react';
import '../styles/background.css';

const Background = ({ isDarkMode = true }) => {
  return (
    <div className={`static-background ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {!isDarkMode && <div className="clouds"></div>}
    </div>
  );
};

export default Background;
