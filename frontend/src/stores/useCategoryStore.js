import { create } from 'zustand';
import api from '../services/api';

export const useCategoryStore = create((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get('/categories');
      set({ categories: data, isLoading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Error al cargar categorías', 
        isLoading: false 
      });
    }
  },

  createCategory: async (categoryData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/categories', categoryData);
      set({ categories: [...get().categories, data], isLoading: false });
      return data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Error al crear categoría', 
        isLoading: false 
      });
      throw error;
    }
  },

  updateCategory: async (id, categoryData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.put(`/categories/${id}`, categoryData);
      set({ 
        categories: get().categories.map(c => c._id === id ? data : c), 
        isLoading: false 
      });
      return data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Error al actualizar categoría', 
        isLoading: false 
      });
      throw error;
    }
  },

  deleteCategory: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/categories/${id}`);
      set({ 
        categories: get().categories.filter(c => c._id !== id), 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Error al eliminar categoría', 
        isLoading: false 
      });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));
