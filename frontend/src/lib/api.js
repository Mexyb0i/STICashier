// Small API client used by the frontend. Reads base URL from Vite env variable
// VITE_API_BASE (example: http://localhost:8000)
export const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

async function request(path, opts = {}) {
  const url = `${apiBase}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    credentials: opts.credentials || 'same-origin',
    ...opts,
  });

  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch (e) { data = { raw: text }; }

  if (!res.ok) {
    const err = new Error(data.message || res.statusText || 'API Error');
    err.status = res.status;
    err.body = data;
    throw err;
  }

  return data;
}

export function login(studentId, password) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ student_id: studentId, password }),
    // If you plan to use cookie-based auth (Laravel Sanctum), set credentials to 'include'
    // credentials: 'include'
  });
}

export async function fetchStudent(studentId) {
  return request(`/api/students/${encodeURIComponent(studentId)}`);
}
