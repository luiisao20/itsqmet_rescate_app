import { create } from "zustand";

import {
    checkLocationPermission,
    requestLocationPermission,
} from "@/core/permissions/locations";
import { PermissionStatus } from "@/presentation/permissions/interfaces/location";

interface PermissionState {
  locationStatus: PermissionStatus;

  requestLocationPermission: () => Promise<PermissionStatus>;
  checkLocationPermission: () => Promise<PermissionStatus>;
}

export const usePermissionStore = create<PermissionState>()((set) => ({
  locationStatus: PermissionStatus.CHECKING,

  requestLocationPermission: async () => {
    const status = await requestLocationPermission();
    set({ locationStatus: status });
    return status;
  },

  checkLocationPermission: async () => {
    const status = await checkLocationPermission();
    set({ locationStatus: status });
    return status;
  },
}));
