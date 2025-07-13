import React, { useRef, useState, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';

// Instructions:
// 1. Create a free account at https://www.emailjs.com/
// 2. Create an email service and template in the EmailJS dashboard.
// 3. Get your Service ID, Template ID, and Public Key from EmailJS.
// 4. Replace the placeholders below with your actual EmailJS values.
// 5. Optionally, add your Contact section to your navigation.

const SERVICE_ID = 'service_8tjr6np'; // Replace with your EmailJS Service ID
const TEMPLATE_ID = 'template_ns4vchc'; // Replace with your EmailJS Template ID
const PUBLIC_KEY = 'JRVbAGtY0m42wxXgI'; // Replace with your EmailJS Public Key

// --- INTERACTIVE LIGHT AREA COMPONENT ---
const InteractiveLightArea = () => {
  const areaRef = useRef();
  const [pos, setPos] = useState({ x: 50, y: 50, visible: false });

  const handleMouseMove = (e) => {
    const rect = areaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y, visible: true });
  };

  const handleMouseLeave = () => {
    setPos((p) => ({ ...p, visible: false }));
  };

  return (
    <div
      className="interactive-light-area"
      ref={areaRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {pos.visible && (
        <div
          className="light-effect"
          style={{
            left: pos.x + 'px',
            top: pos.y + 'px',
            opacity: pos.visible ? 0.85 : 0
          }}
        />
      )}
    </div>
  );
};
// --- END INTERACTIVE LIGHT AREA ---

const Contact = () => null;
export default Contact;
