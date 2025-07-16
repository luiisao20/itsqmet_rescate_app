import { Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { IconGo } from "@/components/ui/Icons";
import HomeCards from "@/components/HomeCards";
import PackCard from "@/components/PackCard";

export default function HomeTab() {
  return (
    <ScrollView>
      <Image
        style={{
          resizeMode: "contain",
          width: "100%",
          height: 240,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
        source={require("@/assets/images/portada.jpg")}
      />
      <View className="px-6 my-4">
        <Text className="text-5xl font-extrabold text-color">Rescate App</Text>
        <Pressable className="py-4 rounded-xl px-4 flex flex-row justify-between items-center active:bg-button/60">
          <Text className="text-xl font-medium text-color">
            Productos recomendados
          </Text>
          <IconGo color="#2F5744" size={20} />
        </Pressable>
        <View className="flex flex-row gap-2">
          <HomeCards icon="gift" title="Donaciones" />
          <HomeCards icon="store" title="Restaurantes aliados" />
        </View>
        <View className="my-4">
          <PackCard />
        </View>
      </View>
    </ScrollView>
  );
}
