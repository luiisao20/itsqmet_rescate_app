import { View, Text, Pressable } from "react-native";
import React from "react";
import { router, Stack, usePathname } from "expo-router";
import { IconGoBack, IconHome } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import PermissionCheckerProvider from "@/components/providers/PermissionCheckProvider";
import { useCartStore } from "@/components/store/usePacksStore";

const StackLayout = () => {
  const insets = useSafeAreaInsets();
  const name = usePathname();
  const showPay = name.includes("pay");
  const showFooter = name.includes("position");
  const { getTotalPrice } = useCartStore();

  return (
    <PermissionCheckerProvider>
      <SafeAreaProvider className="flex flex-1">
        <View className="flex-1">
          <Stack
            screenOptions={{
              headerShadowVisible: false,
              headerShown: true,
              contentStyle: {
                backgroundColor: "white",
              },
              headerLeft: () => (
                <Pressable onPress={() => router.back()}>
                  <IconGoBack className="pr-4" color={Colors.color} />
                </Pressable>
              ),
              headerRight: () => (
                <Pressable
                  onPress={() => router.replace("/(slot)/(tabs)")}
                  className="active:opacity-50 p-2 bg-button rounded-full flex flex-row justify-center items-center"
                >
                  <IconHome color="white" />
                  <Text className="text-white pl-2 text-lg font-medium">
                    Inicio
                  </Text>
                </Pressable>
              ),
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: "Carrito",
                headerTitleStyle: {
                  color: Colors.color,
                },
                animation: "fade_from_bottom",
              }}
            />
            <Stack.Screen
              name="pay"
              options={{
                title: "Ordenar y pagar",
                headerTitleStyle: {
                  color: Colors.color,
                },
                animation: "fade_from_bottom",
              }}
            />
            <Stack.Screen
              name="address"
              options={{
                title: "Dirección",
                headerTitleStyle: {
                  color: Colors.color,
                },
                animation: "fade_from_bottom",
              }}
            />
            <Stack.Screen
              name="permission"
              options={{
                title: "Permisos",
                headerTitleStyle: {
                  color: Colors.color,
                },
                animation: "fade_from_bottom",
              }}
            />
            <Stack.Screen
              name="position/[id]"
              options={{
                title: "Editar ubicación",
                headerTitleStyle: {
                  color: Colors.color,
                },
                animation: "fade_from_bottom",
              }}
            />
          </Stack>
        </View>
        {!showFooter && (
          <View
            style={{ bottom: insets.bottom }}
            className="p-4 bg-background shadow-md shadow-button flex flex-row justify-between items-center"
          >
            <View>
              <Text className="text-lg font-light text-color">Subtotal</Text>
              <Text className="text-2xl font-semibold text-color">$ {getTotalPrice().toFixed(2)}</Text>
            </View>
            <Pressable
              onPress={() =>
                !showPay ? router.push("/(slot)/(cart)/pay") : router.back()
              }
              className="bg-success p-4 rounded-xl"
            >
              {showPay ? (
                <Text className="text-white text-xl shadow-black">
                  Continuar
                </Text>
              ) : (
                <Text className="text-white text-xl shadow-black">
                  Ir a pagar
                </Text>
              )}
            </Pressable>
          </View>
        )}
      </SafeAreaProvider>
    </PermissionCheckerProvider>
  );
};

export default StackLayout;
