const config = {
  development: {
    apiUrl: 'http://localhost:5015/api'
  },
  production: {
    apiUrl: 'https://portfolio-api.your-subdomain.workers.dev/api' // Replace with your actual worker URL
  }
};

const environment = process.env.NODE_ENV || 'development';
export const apiUrl = config[environment].apiUrl; 