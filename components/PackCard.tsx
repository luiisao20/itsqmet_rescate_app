import { View, Text, Pressable, PressableProps } from "react-native";
import React, { useEffect, useState } from "react";
import { IconMinus, IconPlus, IconTrash } from "./ui/Icons";
import { Colors } from "@/constants/Colors";

interface Props extends PressableProps {
  title: string;
  price: number;
  discountPrice?: number;
  home?: boolean;
  quantityValue?: number;

  onBook?: () => void;
  onOpenModal?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

const PackCard = ({
  title,
  price,
  discountPrice = 0,
  home = true,
  quantityValue = 1,

  onBook = () => console.log("No implementado"),
  onOpenModal = () => console.log('No implementado'),
  onIncrement = () => console.log('No implementado'),
  onDecrement = () => console.log('No implementado')
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
  }

  return (
    <View className="bg-button/60 p-4 rounded-xl">
      <Text className="text-2xl font-extrabold text-color">{title}</Text>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-color text-2xl font-bold">
          ${discountPrice !== 0 ? discountPrice : price}{" "}
          {discountPrice !== 0 && (
            <Text className="font-normal text-lg line-through ml-8">
              ${price}
            </Text>
          )}
        </Text>
        {home ? (
          <Pressable
            onPress={() => onBook()}
            className="bg-button p-2 w-[100] rounded-xl active:bg-button/60"
          >
            <Text className="text-white text-xl font-medium text-center">
              Reservar
            </Text>
          </Pressable>
        ) : (
          <View className="flex flex-row items-center gap-2 justify-center">
            <Pressable onPress={() => minus()} className="active:scale-125">
              {quantity > 1 ? (
                <IconMinus color={Colors.color} />
              ) : (
                <IconTrash color={Colors.color} size={30} />
              )}
            </Pressable>
            <Text className="text-white text-center font-semibold text-lg">{quantity}</Text>
            <Pressable onPress={() => onIncrement()} className="active:scale-125">
              <IconPlus color={Colors.color} />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default PackCard;
