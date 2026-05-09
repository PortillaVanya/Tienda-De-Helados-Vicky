import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await api.post('/auth/login', { email, password });
          set({ user: data, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Error al iniciar sesión', 
            isLoading: false 
          });
          throw error;
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await api.post('/auth/register', { name, email, password });
          set({ user: data, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Error al registrarse', 
            isLoading: false 
          });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
        localStorage.removeItem('userInfo');
      },

      updateProfile: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await api.put('/auth/profile', { name, email, password });
          set({ user: data, isLoading: false });
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Error al actualizar perfil', 
            isLoading: false 
          });
          throw error;
        }
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
    }
  )
);
