import { router, Tabs } from "expo-router";
import React from "react";
import { Platform, Pressable, Text } from "react-native";

import {
  IconCar,
  IconGive,
  IconHome,
  IconPack,
  IconProfile,
} from "@/components/ui/Icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2F5744",
        headerShown: true,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
        headerRight: () => (
          <Pressable
            onPress={() => router.push("/(slot)/(cart)")}
            className="active:opacity-50 p-2 bg-button text-center mx-4 rounded-full flex flex-row justify-center items-center"
          >
            <IconCar color="white" />
            <Text className="text-white pl-4 text-lg font-medium">
              Ir a carrito
            </Text>
          </Pressable>
        ),
        headerStyle: { backgroundColor: "#D8E4DC" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <IconHome color={color} />,
        }}
      />
      <Tabs.Screen
        name="donations"
        options={{
          title: "Donaciones",
          tabBarIcon: ({ color }) => <IconGive color={color} />,
        }}
      />
      <Tabs.Screen
        name="packs"
        options={{
          title: "Packs",
          tabBarIcon: ({ color }) => <IconPack color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <IconProfile color={color} />,
        }}
      />
    </Tabs>
  );
}
