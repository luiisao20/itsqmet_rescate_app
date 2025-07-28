import { create } from "zustand";
import { CardDB, CustomerDB } from "@/infraestructure/database/tables";
import { getCards, getCustomer } from "@/utils/database";

interface CustomerState {
  customer: CustomerDB | null;
  isLoading: boolean;

  fetchCustomer: (email: string | null) => Promise<CustomerDB | null>;
  setLoading: (loading: boolean) => void;
}

export const useCustomerStore = create<CustomerState>()((set) => ({
  customer: null,
  isLoading: true,

  fetchCustomer: async (email) => {
    if (email) {
      const customerDb = await getCustomer(email);

      set({ customer: customerDb });
      return customerDb;
    }
    return null;
  },
  setLoading: (loading) => set({ isLoading: loading }),
}));

interface CardsStore {
  cards: CardDB[];
  isLoading: boolean;
  selectedCardId: string | null;

  fetchCards: (idCustomer: string) => Promise<void>;
  getCardById: (id: string) => CardDB | null;
  getSelectedCard: () => CardDB | null;
  setSelectedCard: (id: string) => void;
}

export const useCardStore = create<CardsStore>()((set, get) => ({
  cards: [],
  isLoading: false,
  selectedCardId: null,

  fetchCards: async (idCustomer: string) => {
    try {
      set({ isLoading: true });
      const result = await getCards(idCustomer);
      set({ cards: result ?? [] });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getCardById: (id: string) => {
    return get().cards.find((card) => card.id === id) ?? null;
  },

  getSelectedCard: () => {
    const { cards, selectedCardId } = get();
    return cards.find((card) => card.id === selectedCardId) ?? null;
  },

  setSelectedCard: (id: string) => set({ selectedCardId: id }),
}));
