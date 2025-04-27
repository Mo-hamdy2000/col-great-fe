import config from '../config';

export const makeAuthenticatedRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const defaultOptions = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${config.API_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    localStorage.clear();
    
    alert('Your login has expired. Please log in again.');
    
    window.location.href = '/';
    return null;
  }

  return response.json();
};
