// Environment Configuration
// This file centralizes all environment variables for the application

const config = {
  // Supabase Configuration
  supabase: {
    url: process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co',
    anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-key',
  },

  // EmailJS Configuration
  emailjs: {
    serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_8tjr6np',
    templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_ns4vchc',
    publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'JRVbAGtY0m42wxXgI',
  },

  // API Configuration
  api: {
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8787',
  },

  // Analytics and Monitoring
  analytics: {
    gaTrackingId: process.env.REACT_APP_GA_TRACKING_ID || '',
    enabled: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  },

  // Feature Flags
  features: {
    debugMode: process.env.REACT_APP_ENABLE_DEBUG_MODE === 'true',
  },

  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

// Debug logging in development
if (config.isDevelopment && config.features.debugMode) {
  console.log('🔧 Environment Configuration:', {
    supabase: {
      url: config.supabase.url ? '✅ Set' : '❌ Missing',
      anonKey: config.supabase.anonKey ? '✅ Set' : '❌ Missing',
    },
    emailjs: {
      serviceId: config.emailjs.serviceId ? '✅ Set' : '❌ Missing',
      templateId: config.emailjs.templateId ? '✅ Set' : '❌ Missing',
      publicKey: config.emailjs.publicKey ? '✅ Set' : '❌ Missing',
    },
    api: {
      baseUrl: config.api.baseUrl,
    },
  });
}

export default config; 