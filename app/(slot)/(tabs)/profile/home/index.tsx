import { View, Text, Pressable } from "react-native";
import React from "react";
import { IconProfileHome } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import HomeCards from "@/components/HomeCards";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileTabParamList } from "../_layout";
import {router} from "expo-router";

type NavigationProp = NativeStackNavigationProp<ProfileTabParamList>;

const InfoProfile = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="px-6 my-4">
      <IconProfileHome
        size={120}
        color={Colors.color}
        className="text-center"
      />
      <Text className="text-2xl text-color font-bold text-center">Luis</Text>
      <Text className="text-xl text-color font-light text-center">
        bravo.luis.1995@gmail.com
      </Text>
      <View className="flex flex-row gap-4 my-4 justify-center">
        <HomeCards
          title="Editar información"
          icon="info"
          onPress={() => navigation.navigate("Información")}
        />
        <HomeCards
          title="Privacidad y seguridad"
          icon="security"
          onPress={() => navigation.navigate("Seguridad")}
        />
      </View>
      <Pressable onPress={() => router.replace('/login')} className="bg-button p-4 rounded-xl active:bg-button/60 my-4">
        <Text className="text-white text-xl text-center font-semibold">
          Cerrar sesión
        </Text>
      </Pressable>
    </View>
  );
};

export default InfoProfile;
