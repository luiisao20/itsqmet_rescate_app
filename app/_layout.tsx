import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function RootLayout() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#ffffff");
    NavigationBar.setButtonStyleAsync("dark");
  }, []);

  const [loaded] = useFonts({
    "Inter_pt-Bold": require("@/assets/fonts/Inter_pt-Bold.ttf"),
    "Inter_pt-ExtraBold": require("@/assets/fonts/Inter_pt-ExtraBold.ttf"),
    "Inter_pt-Light": require("@/assets/fonts/Inter_pt-Light.ttf"),
    "Inter_pt-Medium": require("@/assets/fonts/Inter_pt-Medium.ttf"),
    "Inter_pt-Regular": require("@/assets/fonts/Inter_pt-Regular.ttf"),
    "Inter_pt-SemiBold": require("@/assets/fonts/Inter_pt-SemiBold.ttf"),
    "Inter_pt-Thin": require("@/assets/fonts/Inter_pt-Thin.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Slot />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
