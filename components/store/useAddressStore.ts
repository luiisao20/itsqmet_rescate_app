import { AddressDB } from "@/infraestructure/database/tables";
import { getCustomerAddresses } from "@/utils/database";
import { create } from "zustand";

interface AddressStore {
  addresses: AddressDB[];
  isLoading: boolean;
  selectedAddressId: string | null;

  fetchAddresses: (idCustomer: string) => Promise<void>;
  getAddressById: (id: string | string[]) => AddressDB | undefined;
  clearAddresses: () => void;
  getSelectedAddress: () => AddressDB | null;
  setSelectedAddress: (id: string) => void;
}

export const useAddressStore = create<AddressStore>()((set, get) => ({
  addresses: [],
  isLoading: false,
  selectedAddressId: null,

  fetchAddresses: async (idCustomer: string) => {
    try {
      set({ isLoading: true });
      const result = await getCustomerAddresses(idCustomer);
      set({ addresses: result ?? [] });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getSelectedAddress: () => {
    const { addresses, selectedAddressId } = get();
    return addresses.find((addr) => addr.id === selectedAddressId) ?? null;
  },

  setSelectedAddress: (id: string) => set({ selectedAddressId: id }),

  getAddressById: (id: string | string[]) => {
    return get().addresses.find((addr) => addr.id === id);
  },

  clearAddresses: () => {
    set({ addresses: [] });
  },
}));
