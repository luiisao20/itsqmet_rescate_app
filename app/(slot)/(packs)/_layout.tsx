import { Text, Pressable } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router, Stack } from "expo-router";
import { IconGoBack, IconHome } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";

const LayoutPacks = () => {
  return (
    <SafeAreaProvider className="flex flex-1">
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
        <Stack.Screen name="[id]" options={{ title: "" }} />
        <Stack.Screen
          name="details/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
};

export default LayoutPacks;
