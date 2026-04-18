// Admin authentication utilities
// Credentials stored in localStorage for demo (use server-side auth in production)

export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "aura2024",
};

export const ADMIN_SESSION_KEY = "aura_admin_session";

export interface AdminSession {
  username: string;
  loginAt: string;
}

export const loginAdmin = (username: string, password: string): boolean => {
  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    const session: AdminSession = {
      username,
      loginAt: new Date().toISOString(),
    };
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    return true;
  }
  return false;
};

export const logoutAdmin = (): void => {
  localStorage.removeItem(ADMIN_SESSION_KEY);
};

export const getAdminSession = (): AdminSession | null => {
  try {
    const stored = localStorage.getItem(ADMIN_SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const isAdminLoggedIn = (): boolean => {
  return getAdminSession() !== null;
};
