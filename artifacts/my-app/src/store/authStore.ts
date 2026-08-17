// src/store/authStore.ts
import { create } from 'zustand';

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // actions
  login: (identifier: string, password: string) => Promise<boolean>; // identifier может быть email или username
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkSession: () => void;
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

  // Теперь identifier может быть email или username
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
    // Проверяем уникальность имени и email
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
    set({ user: null, isAuthenticated: false });
  },
}));