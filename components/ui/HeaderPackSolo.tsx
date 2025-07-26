import { View, Text, useWindowDimensions, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Pack } from "@/infraestructure/interfaces/PackInterface";
import { Image } from "expo-image";
import { router } from "expo-router";
import { IconGoBackLine, IconHeartOut } from "./Icons";
import LogoPack from "./LogoPack";

interface Props {
  pack: Pack;
  enabled: boolean;

  onSetFavorite: () => void;
}

const HeaderPackSolo = ({ pack, enabled, onSetFavorite }: Props) => {
  const { height } = useWindowDimensions();

  return (
    <View className="relative">
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "transparent"]}
        start={[0, 0]}
        style={{
          height: height * 0.4,
          position: "absolute",
          zIndex: 1,
          width: "100%",
        }}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.6)", "transparent"]}
        start={[1, 1]}
        end={[1, 0.6]}
        style={{
          height: height * 0.4,
          position: "absolute",
          zIndex: 1,
          width: "100%",
          borderTopLeftRadius: 20,
        }}
      />
      <Image
        source={pack.background}
        style={{
          resizeMode: "contain",
          width: "100%",
          height: height * 0.4,
        }}
        contentFit="cover"
        priority="high"
        cachePolicy="memory-disk"
      />
      <View className="absolute z-10 top-10 flex flex-row justify-between items-center right-2 left-2">
        <Pressable onPress={() => router.back()}>
          <IconGoBackLine color="white" size={30} className="shadow" />
        </Pressable>
        <Pressable onPress={() => onSetFavorite()} className="bg-white p-2 rounded-full active:scale-125 z-20">
          <IconHeartOut />
        </Pressable>
      </View>
      <LogoPack route={pack.logo} title={pack.title} />
      <View
        className={`absolute p-2 rounded-xl bottom-[6rem] z-20 left-2 ${enabled ? "bg-button" : "bg-gray-500"}`}
      >
        {enabled ? (
          <Text className="text-white font-semibold ">
            Quedan {pack.packsLeft}
          </Text>
        ) : (
          <Text className="text-white font-semibold ">Agotado</Text>
        )}
      </View>
    </View>
  );
};

export default HeaderPackSolo;
