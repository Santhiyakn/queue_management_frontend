const API_BASE = 'https://queue-management-backend-jsul.onrender.com/api';

export const loginManager = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return await res.json();
};

export const fetchQueues = async () => {
  const res = await fetch(`${API_BASE}/queues`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return await res.json();
};

export const createQueue = async (name) => {
  const res = await fetch(`${API_BASE}/queues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ name })
  });
  return await res.json();
};

export const getQueue = async (queueId) => {
  const res = await fetch(`${API_BASE}/queues/${queueId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return await res.json();
};

export const addToken = async (queueId, personName) => {
  const res = await fetch(`${API_BASE}/queues/${queueId}/tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ name: personName })
  });
  return await res.json();
};

export const moveToken = async (queueId, tokenId, direction) => {
  const res = await fetch(`${API_BASE}/queues/${queueId}/tokens/${tokenId}/move`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ direction }) // 'up' or 'down'
  });
  return await res.json();
};

export const serveToken = async (queueId, tokenId) => {
  const res = await fetch(`${API_BASE}/queues/${queueId}/tokens/${tokenId}/serve`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return await res.json();
};

export const cancelToken = async (queueId, tokenId) => {
  const res = await fetch(`${API_BASE}/queues/${queueId}/tokens/${tokenId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return await res.json();
};

export const getAnalytics = async () => {
  const res = await fetch(`${API_BASE}/analytics`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return await res.json();
};
