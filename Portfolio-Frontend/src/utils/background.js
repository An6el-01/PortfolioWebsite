import React from 'react';
import '../styles/background.css';

const Background = () => {
  return (
    <div 
      className="static-background"
      style={{
        backgroundImage: 'url("http://localhost:5015/images/Background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    />
  );
};

export default Background;
