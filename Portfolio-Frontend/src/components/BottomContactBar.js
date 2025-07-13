import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';

const SERVICE_ID = 'service_8tjr6np';
const TEMPLATE_ID = 'template_ns4vchc';
const PUBLIC_KEY = 'JRVbAGtY0m42wxXgI';

const MessageWidget = () => {
  const form = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

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
      <button className="get-in-touch-btn" onClick={handleOpen} aria-label="Open message form">
        Get in Touch
      </button>
      {open && (
        <div className="message-widget-modal-overlay" onClick={handleClose}>
          <div className="message-widget-modal" onClick={e => e.stopPropagation()}>
            <button className="message-widget-close" onClick={handleClose} aria-label="Close message form">×</button>
            <form ref={form} className="message-widget-form" onSubmit={handleSubmit} autoComplete="off">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="message-widget-input"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="message-widget-input"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="message-widget-input"
                required
                rows={3}
              />
              <button type="submit" className="message-widget-send-btn" disabled={status === 'loading'}>
                Send
              </button>
              {error && <div className="message-widget-error">{error}</div>}
              {status === 'success' && <div className="message-widget-success">Message sent!</div>}
              {status === 'error' && <div className="message-widget-error">Something went wrong. Try again.</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageWidget; 