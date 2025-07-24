import { View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <View className="flex flex-1 -my-10">
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerShown: true,
          contentStyle: {
            backgroundColor: "white",
            height: 20,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Información general",
          }}
        />
        <Stack.Screen
          name="contact"
          options={{
            title: "Rellene su información",
          }}
        />
        <Stack.Screen
          name="success"
          options={{
            title: "Aviso",
          }}
        />
      </Stack>
    </View>
  );
};

export default _layout;
