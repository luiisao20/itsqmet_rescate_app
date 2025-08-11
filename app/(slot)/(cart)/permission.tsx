import { usePermissionStore } from "@/presentation/permissions/usePermissions";
import React from "react";
import { Pressable, Text, View } from "react-native";

const PermissionsScreen = () => {
  const { locationStatus, requestLocationPermission } = usePermissionStore();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable
        className="bg-button p-4 rounded-xl active:bg-button/60"
        onPress={requestLocationPermission}
      >
        <Text className="text-xl text-white font-semibold">
          Habilitar ubicacion
        </Text>
      </Pressable>
      <Text style={{ color: "white", marginTop: 20, fontSize: 20 }}>
        Estado actual: {locationStatus}
      </Text>
    </View>
  );
};

export default PermissionsScreen;
