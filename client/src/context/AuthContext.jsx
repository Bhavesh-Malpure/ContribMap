import { createContext, useCallback, useMemo, useState } from 'react';
import * as authService from '../services/authService.js';
import { getProfile } from '../services/profileService.js';

export const AuthContext = createContext(null);

const STORAGE_KEY = 'contribmap.auth';

function readStoredAuth() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { token: null, user: null };
  } catch {
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const [{ token, user }, setAuth] = useState(readStoredAuth);

  const persist = useCallback((next) => {
    setAuth(next);
    if (next.token) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  const signIn = useCallback(async (credentials) => {
    const result = await authService.login(credentials);
    persist(result);
    return result;
  }, [persist]);

  const signUp = useCallback(async (payload) => {
    const result = await authService.register(payload);
    persist(result);
    return result;
  }, [persist]);

  const signOut = useCallback(() => {
    persist({ token: null, user: null });
  }, [persist]);

  const refreshProfile = useCallback(async () => {
    if (!token) return null;
    const profile = await getProfile(token);
    persist({ token, user: { ...user, ...profile } });
    return profile;
  }, [persist, token, user]);

  const value = useMemo(
    () => ({ token, user, isAuthenticated: Boolean(token), signIn, signUp, signOut, refreshProfile }),
    [token, user, signIn, signUp, signOut, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
