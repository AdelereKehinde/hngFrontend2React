export const SESSION_KEY = "ticketapp_session";

export function login({ email, password }) {
  // demo-only: validate demo credentials
  if (email === "demo@example.com" && password === "Password123!") {
    const token = "fake-jwt-" + Date.now();
    const payload = { token, user: { name: "Demo User", email }, createdAt: Date.now() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
    return { ok: true, payload };
  }
  return { ok: false, error: "Invalid credentials" };
}

export function signup({ name, email, password }) {
  // accept any signup in demo
  const token = "fake-jwt-" + Date.now();
  const payload = { token, user: { name, email }, createdAt: Date.now() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  return { ok: true, payload };
}

export function isAuthenticated() {
  const s = localStorage.getItem(SESSION_KEY);
  if (!s) return false;
  try {
    const p = JSON.parse(s);
    return !!p.token;
  } catch {
    return false;
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

