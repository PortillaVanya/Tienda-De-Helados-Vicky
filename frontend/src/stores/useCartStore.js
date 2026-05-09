import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      shippingAddress: {},
      paymentMethod: 'PayPal',

      addToCart: (product, qty) => {
        const item = {
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          countInStock: product.countInStock,
          qty,
        };

        const existItem = get().cartItems.find((x) => x.product === item.product);

        if (existItem) {
          set({
            cartItems: get().cartItems.map((x) => 
              x.product === existItem.product ? item : x
            )
          });
        } else {
          set({ cartItems: [...get().cartItems, item] });
        }
      },

      removeFromCart: (id) => {
        set({ cartItems: get().cartItems.filter((x) => x.product !== id) });
      },

      saveShippingAddress: (data) => {
        set({ shippingAddress: data });
      },

      savePaymentMethod: (data) => {
        set({ paymentMethod: data });
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      getItemsPrice: () => 
        get().cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
      
      getShippingPrice: () => {
        const itemsPrice = get().getItemsPrice();
        return itemsPrice > 10000 ? 0 : 2000;
      },
      
      getTaxPrice: () => 0,
      
      getTotalPrice: () => 
        get().getItemsPrice() + get().getShippingPrice() + get().getTaxPrice()
    }),
    {
      name: 'cart-storage',
    }
  )
);
