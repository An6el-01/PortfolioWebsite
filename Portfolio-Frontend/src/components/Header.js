import React, { useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Header = ({ isDarkMode }) => {
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
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isDarkMode 
          ? 'bg-black/60' 
          : 'bg-white/60'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#hero" className={`font-bold text-lg transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-white hover:text-purple-400' 
                  : 'text-gray-800 hover:text-blue-600'
              }`}>
                Angel Salinas
              </a>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className={`transition-colors duration-300 text-sm font-medium uppercase tracking-wider ${
                isDarkMode 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-gray-700/80 hover:text-gray-900'
              }`}>
                About
              </a>
              <a href="#projects" className={`transition-colors duration-300 text-sm font-medium uppercase tracking-wider ${
                isDarkMode 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-gray-700/80 hover:text-gray-900'
              }`}>
                Projects
              </a>
              <a href="#experience" className={`transition-colors duration-300 text-sm font-medium uppercase tracking-wider ${
                isDarkMode 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-gray-700/80 hover:text-gray-900'
              }`}>
                Experience
              </a>
              <a href="#contact" className={`transition-colors duration-300 text-sm font-medium uppercase tracking-wider ${
                isDarkMode
                  ? 'text-white/80 hover:text-white'
                  : 'text-gray-700/80 hover:text-gray-900'
                  }`}>
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Contact Modal */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className={`rounded-lg shadow-2xl max-w-md w-full p-6 border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-900 border-white/10' 
              : 'bg-white border-gray-200'
          }`} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Contact Me
              </h3>
              <button 
                onClick={handleClose} 
                aria-label="Close contact form"
                className={`transition-colors duration-300 text-2xl font-light ${
                  isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                ×
              </button>
            </div>
            
            <form ref={form} onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500' 
                    : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'
                }`}
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500' 
                    : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'
                }`}
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent resize-none ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500' 
                    : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'
                }`}
                required
                rows={3}
              />
              
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isDarkMode 
                    ? 'bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white'
                }`}
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
              
              {error && (
                <div className="text-red-400 text-sm bg-red-900/20 border border-red-500/20 rounded-lg p-3">
                  {error}
                </div>
              )}
              
              {status === 'success' && (
                <div className="text-green-400 text-sm bg-green-900/20 border border-green-500/20 rounded-lg p-3">
                  Message sent successfully!
                </div>
              )}
              
              {status === 'error' && (
                <div className="text-red-400 text-sm bg-red-900/20 border border-red-500/20 rounded-lg p-3">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header; 