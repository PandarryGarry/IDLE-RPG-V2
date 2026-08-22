// src/store/authStore.ts
import { create } from 'zustand';
import { tickManager } from '@/gameEngine/tickManager';

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // actions
  login: (identifier: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkSession: () => void;
  playAsGuest: () => void;
}

// Ключи для localStorage
const SESSION_KEY = 'auth_session';
const USERS_KEY = 'auth_users';

function getUsers(): Array<{ name: string; email: string; password: string }> {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: any[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  checkSession: () => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      if (session) {
        const user = JSON.parse(session) as AuthUser;
        set({ user, isAuthenticated: true, isLoading: false });
        return;
      }
    } catch (e) {
      console.warn('[auth] Failed to restore session', e);
    }
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  login: async (identifier: string, password: string) => {
    const users = getUsers();
    const found = users.find(u => 
      (u.email === identifier || u.name === identifier) && u.password === password
    );
    if (!found) {
      return false;
    }

    const user = { name: found.name, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    set({ user, isAuthenticated: true });
    return true;
  },

  register: async (name: string, email: string, password: string) => {
    const users = getUsers();
    if (users.some(u => u.email === email || u.name === name)) {
      return false;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);

    const user = { name, email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    set({ user, isAuthenticated: true });
    return true;
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
    tickManager.stop();
    set({ user: null, isAuthenticated: false });
  },

  playAsGuest: () => {
    const user: AuthUser = { name: 'Guest', email: '' };
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },
}));
