// API client for backend communication
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api';

export const apiClient = {
  // Authentication endpoints
  auth: {
    login: async (email: string, password: string) => {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      return response.json();
    },

    register: async (email: string, password: string, fullName: string) => {
      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, fullName }),
      });
      return response.json();
    },

    getProfile: async (token: string) => {
      const response = await fetch(`${BACKEND_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    },
  },

  // Job role endpoints
  jobRole: {
    getRoles: async () => {
      const response = await fetch(`${BACKEND_URL}/job-role/roles`);
      return response.json();
    },

    createRole: async (role: string) => {
      const response = await fetch(`${BACKEND_URL}/job-role/roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });
      return response.json();
    },

    getQuestions: async (role: string) => {
      console.log('Frontend sending role:', role);
      console.log('Frontend request body:', JSON.stringify({ role }, null, 2));
      
      const requestBody = { role };
              console.log('Request body object:', requestBody);
        console.log('Request body stringified:', JSON.stringify(requestBody));
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout
      
      try {
        const response = await fetch(`${BACKEND_URL}/job-role/questions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          console.error('Response not ok:', response.status, response.statusText);
          const errorText = await response.text();
          console.error('Error response body:', errorText);
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const responseData = await response.json();
        console.log('Response data:', responseData);
        
        return responseData;
      } catch (error) {
        console.error('Error in getQuestions:', error);
        clearTimeout(timeoutId);
        
        if (error instanceof Error && error.name === 'AbortError') {
          throw new Error('Request timed out. The AI is taking longer than expected to generate questions. Please try again.');
        }
        
        throw error;
      }
    },

    getNextQuestion: async (role: string, currentQuestion: string) => {
      const response = await fetch(`${BACKEND_URL}/job-role/next-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, currentQuestion }),
      });
      return response.json();
    },

    evaluateAnswer: async (role: string, question: string, answer: string) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      try {
        const response = await fetch(`${BACKEND_URL}/job-role/evaluate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role, question, answer }),
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return response.json();
      } catch (error) {
        clearTimeout(timeoutId);
        
        if (error instanceof Error && error.name === 'AbortError') {
          throw new Error('Evaluation request timed out. Please try again.');
        }
        
        throw error;
      }
    },
  },
}; 