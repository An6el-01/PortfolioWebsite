import React, { useRef, useState } from 'react';
import { FaGithub, FaLinkedin , FaEnvelope} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import '../styles/Header.css';

const Header = () => {
  const form = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const SERVICE_ID = 'service_8tjr6np';
  const TEMPLATE_ID = 'template_ns4vchc';
  const PUBLIC_KEY = 'JRVbAGtY0m42wxXgI';

  const validate = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('All fields are required.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }, () => {
        setStatus('error');
      });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setStatus('idle');
    setError('');
  };

  return (
    <>
      <header className="main-header">
        <div className="header-left">
          <span className="header-logo">Angel Salinas</span>
        </div>
        <nav className="header-nav">
          <a href="#work">WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
          <a href="#resume">RESUME</a>
        </nav>
        <div className="header-icons">
          <a href="https://github.com/An6el-01" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/%C3%A1ngel-salinas-25a15a22a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <button onClick={handleOpen} aria-label="Contact" className="header-icon-button">
            <FaEnvelope />
          </button>
        </div>
      </header>
      
      {open && (
        <div className="header-contact-overlay" onClick={handleClose}>
          <div className="header-contact-modal" onClick={e => e.stopPropagation()}>
            <button className="header-contact-close" onClick={handleClose} aria-label="Close contact form">×</button>
            <form ref={form} className="header-contact-form" onSubmit={handleSubmit} autoComplete="off">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="header-contact-input"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="header-contact-input"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="header-contact-input"
                required
                rows={3}
              />
              <button type="submit" className="header-contact-send-btn" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <>
                    <span className="header-contact-send-spinner"></span>
                    Sending...
                  </>
                ) : (
                  'Send'
                )}
              </button>
              {error && <div className="header-contact-error">{error}</div>}
              {status === 'success' && <div className="header-contact-success">Message sent!</div>}
              {status === 'error' && <div className="header-contact-error">Something went wrong. Try again.</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header; 