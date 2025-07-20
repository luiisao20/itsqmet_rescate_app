import { Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { IconGo } from "@/components/ui/Icons";
import HomeCards from "@/components/HomeCards";
import PackCard from "@/components/PackCard";
import { router } from "expo-router";
import { ModalInfo } from "@/components/Modal";
import { useState } from "react";

export default function HomeTab() {
  const [modalProps, setModalProps] = useState<{
    message: string;
    isOpen: boolean;
  }>({
    message: "",
    isOpen: false,
  });

  const packs: { title: string; price: number; discountPrice?: number }[] = [
    {
      title: "Pack de KFC",
      price: 8.99,
    },
    {
      title: "Pack de Menestras del negro",
      price: 10.99,
      discountPrice: 7.99,
    },
  ];

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
        <View className="flex flex-row gap-2 justify-center">
          <HomeCards icon="gift" title="Donaciones" />
          <HomeCards icon="store" title="Restaurantes aliados" />
        </View>
        <View className="my-4 flex gap-4">
          <Text className="text-xl font-medium text-color">Packs del día</Text>
          {packs.map((item, index) => (
            <PackCard
              key={index}
              title={item.title}
              price={item.price}
              discountPrice={item.discountPrice}
              onBook={() => setModalProps((prev) => ({
                ...prev,
                isOpen: true,
                message: item.title
              }))}
            />
          ))}
        </View>
      </View>
      <ModalInfo
        message={modalProps.message}
        onClose={() => setModalProps((prev) => ({ ...prev, isOpen: false }))}
        onUnDone={() => console.log('Por implementar deshacer')}
        isOpen={modalProps.isOpen}
      />
    </ScrollView>
  );
}
