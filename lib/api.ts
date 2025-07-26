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

    register: async (email: string, password: string, fullName: string, avatar?: string) => {
      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, fullName, avatar }),
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
      const response = await fetch(`${BACKEND_URL}/job-role/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });
      return response.json();
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
      const response = await fetch(`${BACKEND_URL}/job-role/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, question, answer }),
      });
      return response.json();
    },
  },
}; 