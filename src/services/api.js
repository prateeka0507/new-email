import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 second timeout
});

// Response interface for better error handling
const handleResponse = async (promise) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

// Audience service
export const audienceService = {
  /**
   * Get all Mailchimp lists/audiences
   */
  getAllLists: () => handleResponse(
    api.get('/audience/lists')
  ),

  /**
   * Bulk import subscribers from CSV file
   * @param {string} listId - Mailchimp list ID
   * @param {File} file - CSV file containing subscriber data
   */
  bulkImport: (listId, file) => {
    const formData = new FormData();
    formData.append('file', file);

    return handleResponse(
      api.post(`/audience/lists/${listId}/bulk-import`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // Extended timeout for file upload
      })
    );
  }
};

// Campaign service
export const campaignService = {
  /**
   * Send bulk email campaign
   * @param {Object} data - Campaign data
   * @param {string} data.listId - Mailchimp list ID
   * @param {string} data.subject - Email subject
   * @param {string} data.fromName - Sender name
   * @param {string} data.replyTo - Reply-to email address
   * @param {string} data.htmlContent - Email HTML content
   */
  bulkSend: (data) => handleResponse(
    api.post('/campaigns/bulk-send', data)
  )
};

// Add request interceptor for potential auth tokens
api.interceptors.request.use((config) => {
  // You can add auth tokens here if needed
  // const token = localStorage.getItem('token');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

export default {
  audienceService,
  campaignService
};