import React, { useState, useRef } from 'react';
import { FaEnvelope, FaUser, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = ({ isDarkMode }) => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'


  // EmailJS Configuration from Environment Variables
  const EMAILJS_CONFIG = {
    SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
    TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Map EmailJS field names to state properties
    const fieldMapping = {
      'user_name': 'name',
      'user_email': 'email',
      'message': 'message'
    };
    
    const stateField = fieldMapping[name] || name;
    setFormData(prev => ({
      ...prev,
      [stateField]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Check if environment variables are configured
    if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
      console.error('EmailJS configuration missing. Please check your .env file.');
      console.log('Current config:', EMAILJS_CONFIG);
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Reset the form
        formRef.current.reset();
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.status,
        config: EMAILJS_CONFIG
      });
      setSubmitStatus('error');
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300`} id="contact">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className={`text-5xl lg:text-6xl font-bold mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Get In Touch
          </h1>
          <p className={`text-xl max-w-2xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className={`relative rounded-2xl p-8 lg:p-12 transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/95 border border-purple-400/20 shadow-2xl shadow-purple-500/10' 
              : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-2xl shadow-blue-500/10'
          } backdrop-blur-sm`}>
            
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-purple-500/20 border border-purple-400/30' 
                  : 'bg-blue-500/20 border border-blue-400/30'
              }`}>
                <FaEnvelope className={`w-8 h-8 transition-colors duration-300 ${
                  isDarkMode ? 'text-purple-400' : 'text-blue-600'
                }`} />
              </div>
              <h2 className={`text-2xl lg:text-3xl font-bold mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Send me a message
              </h2>
              <p className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                I'll get back to you as soon as possible
              </p>
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <FaUser className="w-4 h-4" />
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:border-purple-400 focus:bg-gray-700/70' 
                      : 'bg-white/80 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                    isDarkMode ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                  }`}
                  placeholder="Your full name"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <FaEnvelope className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:border-purple-400 focus:bg-gray-700/70' 
                      : 'bg-white/80 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                    isDarkMode ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                  }`}
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <FaPaperPlane className="w-4 h-4" />
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 rounded-xl resize-none transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:border-purple-400 focus:bg-gray-700/70' 
                      : 'bg-white/80 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                    isDarkMode ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                  }`}
                  placeholder="Tell me about your project or how I can help you..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:scale-105 hover:shadow-lg'
                } ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FaPaperPlane className="w-5 h-5" />
                    Send Message
                  </div>
                )}
              </button>
            </form>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-400/30 text-green-400 text-center">
                <p className="font-semibold">Message sent successfully!</p>
                <p className="text-sm mt-1">I'll get back to you soon.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-400/30 text-red-400 text-center">
                <p className="font-semibold">Something went wrong!</p>
                <p className="text-sm mt-1">Please try again or contact me directly.</p>
                {/* Debug info - remove this after fixing */}
                <details className="mt-2 text-xs">
                  <summary className="cursor-pointer">Debug Info</summary>
                  <pre className="mt-1 text-left overflow-auto">
                    {JSON.stringify(EMAILJS_CONFIG, null, 2)}
                  </pre>
                </details>
              </div>
      )}
    </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
