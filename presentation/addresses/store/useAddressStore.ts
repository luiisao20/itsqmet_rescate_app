import { AddressDB } from "@/core/database/interfaces/address";
import { create } from "zustand";

interface AddressState {
  selectedAddress: AddressDB | null;
  setSelectedAddress: (address: AddressDB | null) => void;
}

export const useAddressStore = create<AddressState>()((set) => ({
  selectedAddress: null,

  setSelectedAddress: (address: AddressDB | null) =>
    set({ selectedAddress: address }),
}));
