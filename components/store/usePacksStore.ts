import { PackageDB } from "@/infraestructure/database/tables";
import { getPackages } from "@/utils/database";
import { create } from "zustand";

interface PacksStore {
  packs: Record<string, PackageDB[]>;
  isLoading: boolean;
  selectedPackId: string | null;

  fetchPacks: (category: string, quantity: number, order?: string) => Promise<void>;
  getPackById: (id: string) => PackageDB | null;
  getSelectedPack: () => PackageDB | null;
  setSelectedPack: (id: string) => void;
}

export const usePacksStore = create<PacksStore>()((set, get) => ({
  packs: {},
  isLoading: false,
  selectedPackId: null,

  fetchPacks: async (category: string, quantity: number, order = 'title') => {
    if (get().packs[category]?.length > 0) return;
    try {
      set({ isLoading: true });
      const res = await getPackages(quantity, order);
      set((state) => ({
        packs: {
          ...state.packs,
          [category]: res ?? []
        }
      }))
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getPackById: (id: string) => {
    const allPacks = Object.values(get().packs).flat();
    return allPacks.find((pack) => pack.id === id) ?? null;
  },

  getSelectedPack: () => {
    const { selectedPackId } = get();
    const allPacks = Object.values(get().packs).flat();
    return allPacks.find((pack) => pack.id === selectedPackId) ?? null;
  },

  setSelectedPack: (id: string) => set({ selectedPackId: id }),
}));

export interface CartItem extends PackageDB {
  quantity?: number;
}

interface CartStore {
  cart: CartItem[];

  decreaseQuantity: (id: string) => void;
  addToCart: (pack: PackageDB) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getCart: () => CartItem[];
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

  getCart: () => get().cart,
}));

interface FavStore {
  favorites: PackageDB[];

  addToFavorites: (pack: PackageDB) => void;
  removeFromFavorites: (id: string) => void;
  getFavorites: () => PackageDB[];
  getIsFavorite: (id: string) => boolean;
}

export const useFavStore = create<FavStore>()((set, get) => ({
  favorites: [],

  addToFavorites: (pack: PackageDB) =>
    set((state) => {
      return { favorites: [...state.favorites, { ...pack }] };
    }),

  removeFromFavorites: (id: string) =>
    set((state) => ({
      favorites: state.favorites.filter((item) => item.id !== id),
    })),

  getFavorites: () => get().favorites,

  getIsFavorite: (id: string) =>
    get().favorites.find((item) => item.id === id) !== undefined,
}));
