import { Package } from "@/core/database/interfaces/packages";
import { create } from "zustand";

export interface PackItem extends Package {
  quantity?: number;
}

interface CartStore {
  cart: PackItem[];

  decreaseQuantity: (id: number) => void;
  addToCart: (pack: Package) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()((set, get) => ({
  cart: [],

  addToCart: (pack) => {
    set((state) => {
      const existing = state.cart.find((item) => item.id === pack.id);

      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === pack.id
              ? { ...item, quantity: item.quantity! + 1 }
              : item
          ),
        };
      } else {
        return {
          cart: [...state.cart, { ...pack, quantity: 1 }],
        };
      }
    });
  },

  decreaseQuantity: (id) => {
    set((state) => {
      const item = state.cart.find((item) => item.id === id);
      if (!item) return { cart: state.cart };

      if (item.quantity! <= 1) {
        return {
          cart: state.cart.filter((item) => item.id !== id),
        };
      }

      return {
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity! - 1 } : item
        ),
      };
    });
  },

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cart: [] }),

  getTotalPrice: () =>
    get().cart.reduce((total, item) => total + item.quantity! * item.price, 0),

}));

interface FavStore {
  favorites: Package[];

  addToFavorites: (pack: Package) => void;
  removeFromFavorites: (id: number) => void;
  getFavorites: () => Package[];
  getIsFavorite: (id: number) => boolean;
}

export const useFavStore = create<FavStore>()((set, get) => ({
  favorites: [],

  addToFavorites: (pack: Package) =>
    set((state) => {
      return { favorites: [...state.favorites, { ...pack }] };
    }),

  removeFromFavorites: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((item) => item.id !== id),
    })),

  getFavorites: () => get().favorites,

  getIsFavorite: (id) =>
    get().favorites.find((item) => item.id === id) !== undefined,
}));
