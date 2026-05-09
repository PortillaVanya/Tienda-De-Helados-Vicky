import { create } from 'zustand';
import api from '../services/api';

export const useProductStore = create((set, get) => ({
  products: [],
  product: null,
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get('/products');
      set({ products: data, isLoading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Error al cargar productos', 
        isLoading: false 
      });
    }
  },

  fetchProductById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get(`/products/${id}`);
      set({ product: data, isLoading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Error al cargar producto', 
        isLoading: false 
      });
    }
  },

  createProduct: async (productData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/products', productData);
      set({ products: [...get().products, data], isLoading: false });
      return data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Error al crear producto', 
        isLoading: false 
      });
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.put(`/products/${id}`, productData);
      set({ 
        products: get().products.map(p => p._id === id ? data : p), 
        isLoading: false 
      });
      return data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Error al actualizar producto', 
        isLoading: false 
      });
      throw error;
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/products/${id}`);
      set({ 
        products: get().products.filter(p => p._id !== id), 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Error al eliminar producto', 
        isLoading: false 
      });
      throw error;
    }
  },

  clearProduct: () => set({ product: null }),
  clearError: () => set({ error: null })
}));
