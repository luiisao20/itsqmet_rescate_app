import { LocationSubscription } from "expo-location";
import { create } from "zustand";

import {
    getCurrentAddress,
    getCurrentLocation,
    watchCurrentPosition,
} from "@/core/location/locations";
import { LocationGeocodedAddress } from "@/presentation/permissions/interfaces/geo-code";
import { LatLng } from "@/presentation/permissions/interfaces/lat-lang";

interface LocationState {
  lastKnwonLocation: LatLng | null;
  userLocationList: LatLng[];
  locationAddress: LocationGeocodedAddress | null;
  watchSubscriptionID: LocationSubscription | null;

  getLocation: () => Promise<LatLng>;
  getAddress: (location: LatLng | null) => Promise<LocationGeocodedAddress>;
  watchLocation: () => void;
  clearWacthLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
  lastKnwonLocation: null,
  locationAddress: null,
  userLocationList: [],
  watchSubscriptionID: null,

  getLocation: async () => {
    const location = await getCurrentLocation();

    set({ lastKnwonLocation: location });

    return location;
  },

  getAddress: async(location: LatLng | null) => {
    const address = await getCurrentAddress(location);
    
    set({locationAddress: address})

    return address;

  },

  watchLocation: async () => {
    const oldSubscritpion = get().watchSubscriptionID;

    if (oldSubscritpion !== null) get().clearWacthLocation();

    const watchSubscription = await watchCurrentPosition((latLng) => {
      set({
        lastKnwonLocation: latLng,
        userLocationList: [...get().userLocationList, latLng],
      });
    });

    set({ watchSubscriptionID: watchSubscription });
  },

  clearWacthLocation: () => {
    const subscription = get().watchSubscriptionID;

    if (subscription !== null) subscription.remove();
  },
}));
