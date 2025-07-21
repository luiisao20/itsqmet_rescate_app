import { PropsWithChildren, useEffect } from "react";
import { router } from "expo-router";
import { AppState } from "react-native";

import { usePermissionStore } from "../store/usePermissions";
import { PermissionStatus } from "@/infraestructure/interfaces/location";

const PermissionCheckerProvider = ({ children }: PropsWithChildren) => {
  const { locationStatus, checkLocationPermission } = usePermissionStore();

  useEffect(() => {
    if (locationStatus === PermissionStatus.GRANTED)
      router.replace("/(slot)/(cart)");
    else if (locationStatus !== PermissionStatus.CHECKING)
      router.replace("/(slot)/(cart)/permission");
  }, [locationStatus]);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      console.log(nextAppState);
      if (nextAppState === "active") {
        checkLocationPermission();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <>{children}</>;
};

export default PermissionCheckerProvider;
