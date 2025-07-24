import { View, Text, Pressable } from "react-native";
import React from "react";
import { IconFastFood, IconHands, IconHouse } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import {router} from "expo-router";

const DonationsTab = () => {
  return (
    <View className="px-6">
      <View className="flex flex-row items-center p-4 gap-3 bg-background rounded-xl my-4 justify-between">
        <IconHands size={34} color={Colors.color} />
        <Text className="text-justify text-wrap w-3/4 text-color text-normal font-light">
          Ayúdanos a reducir el desperdicio, tu aporte es necesario para
          alimentar cientos de personas diariamente
        </Text>
      </View>

      <View className="bg-background rounded-xl my-4 p-4 flex">
        <View className="flex flex-row items-center gap-3 justify-between">
          <IconHouse size={34} color={Colors.color} className="self-center" />
          <Text className="text-justify text-wrap w-3/4 text-color text-normal font-light">
            Conoce acerca del banco de alimentos Quito, temas de voluntariado y
            donaciones de comida donde puedes ser partícipe
          </Text>
        </View>
        <Pressable className="bg-button mt-4 py-2 px-4 rounded-xl self-end active:bg-button/60">
          <Text className="text-white text-lg text-center">Obtener más información</Text>
        </Pressable>
      </View>
      <View className="bg-background rounded-xl my-4 p-4 flex">
        <View className="flex flex-row items-center gap-3 justify-between">
          <IconFastFood size={34} color={Colors.color} />
          <Text className="text-justify text-wrap w-3/4 text-color text-normal font-light">
            ¿Perteneces a algún restaurante y quieres vender tus excedentes?
            ¡Contáctanos!
          </Text>
        </View>
        <Pressable onPress={() => router.push('/(slot)/(tabs)/donations/contact')} className="bg-button mt-4 py-2 px-4 rounded-xl self-end active:bg-button/60">
          <Text className="text-white text-lg text-center">Contactar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DonationsTab;
