import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

export type AppMode = 'gate' | 'viewer' | 'admin';

interface AuthContextType {
  mode: AppMode;
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  setMode: (mode: AppMode) => void;
  loginAdmin: (password: string, email?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  switchToGate: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_MODE_KEY = 'ar_portfolio_mode';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<AppMode>(() => {
    const saved = sessionStorage.getItem(SESSION_MODE_KEY);
    if (saved === 'viewer' || saved === 'admin') return saved;
    return 'gate';
  });

  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initAuth() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data } = await supabase.auth.getSession();
          setSession(data.session);
          setUser(data.session?.user ?? null);
          const hasAdminSession = Boolean(data.session?.user);
          setIsAdmin(hasAdminSession);
          if (hasAdminSession && mode === 'gate') {
            setModeState('admin');
            sessionStorage.setItem(SESSION_MODE_KEY, 'admin');
          }
        } catch {
          // ignore
        }

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          const valid = Boolean(currentSession?.user);
          setIsAdmin(valid);
          if (valid) {
            setModeState('admin');
            sessionStorage.setItem(SESSION_MODE_KEY, 'admin');
          }
        });

        setIsLoading(false);
        return () => {
          authListener?.subscription.unsubscribe();
        };
      } else {
        setIsLoading(false);
      }
    }

    initAuth();
  }, [mode]);

  const setMode = (newMode: AppMode) => {
    setModeState(newMode);
    if (newMode !== 'gate') {
      sessionStorage.setItem(SESSION_MODE_KEY, newMode);
    } else {
      sessionStorage.removeItem(SESSION_MODE_KEY);
    }
  };

  const switchToGate = () => {
    setMode('gate');
  };

  const loginAdmin = async (password: string, email = ''): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        if (!email) {
          setIsLoading(false);
          return { success: false, error: 'Please enter your admin email address' };
        }
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error || !data.user) {
          setIsLoading(false);
          return { success: false, error: error?.message || 'Invalid credentials' };
        }
        setSession(data.session);
        setUser(data.user);
        setIsAdmin(true);
        setMode('admin');
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return {
          success: false,
          error: 'Supabase is not configured. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to log in as admin.'
        };
      }
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Login failed' };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch {
        // ignore
      }
    }
    setSession(null);
    setUser(null);
    setIsAdmin(false);
    setMode('viewer');
  };

  return (
    <AuthContext.Provider
      value={{
        mode,
        user,
        session,
        isAdmin,
        isLoading,
        setMode,
        loginAdmin,
        logout,
        switchToGate
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
