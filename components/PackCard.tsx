import { View, Text, Pressable, PressableProps } from "react-native";
import React, { useEffect, useState } from "react";
import {
  IconAdd,
  IconHeartOut,
  IconMinus,
  IconPlus,
  IconStar,
  IconTrash,
} from "./ui/Icons";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Pack } from "@/infraestructure/interfaces/Packs";

interface Props extends PressableProps {
  info: Pack;
  quantityValue?: number;
  home?: boolean;

  onBook?: () => void;
  onOpenModal?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

const PackCard = ({
  info,
  quantityValue = 0,
  home = true,

  onBook = () => console.log("No implementado"),
  onOpenModal = () => console.log("No implementado"),
  onIncrement = () => console.log("No implementado"),
  onDecrement = () => console.log("No implementado"),
  ...rest
}: Props) => {
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    setQuantity(quantityValue);
  }, [quantityValue]);

  const minus = () => {
    if (quantity > 1) {
      onDecrement();
    } else {
      onOpenModal();
    }
  };

  return (
    <View className="bg-background rounded-2xl">
      <View className="relative">
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "transparent"]}
          start={[1, 1]}
          end={[1, 0.6]}
          style={{
            height: 180,
            position: "absolute",
            zIndex: 1,
            width: "100%",
            borderTopLeftRadius: 20,
          }}
        />
        <Image
          source={info.background}
          style={{
            height: 180,
            width: "100%",
            overflow: "hidden",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />
        <View className="flex flex-row items-end absolute left-2 bottom-2 z-10 gap-4">
          <Image
            source={info.logo}
            style={{ height: 60, width: 60, borderRadius: 9999 }}
          />
          <Text className="text-white font-semibold text-xl">{info.title}</Text>
        </View>
        <View className="absolute bg-button p-2 rounded-xl top-2 left-2">
          <Text className="text-white font-semibold ">
            Quedan {info.packsLeft}
          </Text>
        </View>
        <View className="absolute top-2 right-2">
          {home ? (
            <View className="flex gap-2">
              <Pressable {...rest} className="bg-white p-2 rounded-full">
                <IconHeartOut size={18} />
              </Pressable>
              <Pressable
                {...rest}
                onPress={() => onBook()}
                className="bg-white p-2 rounded-full active:scale-125 z-20"
              >
                <IconAdd size={18} />
              </Pressable>
            </View>
          ) : (
            <View className="flex flex-row items-center z-20 gap-2 justify-center bg-white rounded-full p-1">
              <Pressable
                {...rest}
                onPress={() => minus()}
                className="active:scale-125"
              >
                {quantity > 1 ? <IconMinus /> : <IconTrash size={24} />}
              </Pressable>
              <Text className="text-center font-semibold text-lg">
                {quantity}
              </Text>
              <Pressable
                {...rest}
                onPress={() => onIncrement()}
                className="active:scale-125"
              >
                <IconPlus />
              </Pressable>
            </View>
          )}
        </View>
      </View>
      <View className="p-4">
        <Text className="text-lg font-semibold text-color">Pack Sorpresa</Text>
        <Text className="text-base font-light text-color">
          Recoger entre {info.pickUp}
        </Text>
        <View className="flex flex-row justify-between">
          <View className="flex flex-row gap-4">
            <View className="flex flex-row items-baseline gap-2">
              <IconStar size={16} color={Colors.color} />
              <Text className="text-lg font-semibold text-color">
                {info.rate}
              </Text>
            </View>
            <View className="w-0.5 h-full bg-gray-300 rounded-full" />
            <Text className="text-lg font-semibold text-color">
              {info.distance} km
            </Text>
          </View>
          <Text className="text-xl font-bold text-color">$ {info.price}</Text>
        </View>
      </View>
    </View>
  );
};

export default PackCard;
