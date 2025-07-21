import { View, Text, Pressable, PressableProps } from "react-native";
import React from "react";
import {
  IconCard,
  IconCash,
  IconFast,
  IconStandard,
  IconWait,
} from "./ui/Icons";
import { Colors } from "@/constants/Colors";

interface Props extends PressableProps {
  id: string;
  price?: number | null;
  label: string;
  description: string;
  selected: string;
  time?: string;

  setSelected: (id: string) => void;
}

export const Selection = ({
  id,
  price = null,
  label,
  selected,
  description,
  time,

  setSelected,

  ...rest
}: Props) => {
  const renderIcon = (id: string) => {
    if (id === "1") return <IconFast size={16} color={Colors.color} />;
    else if (id === "2") return <IconStandard size={16} color={Colors.color} />;
    else if (id === "3") return <IconWait size={16} color={Colors.color} />;
    else if (id === "4") return <IconCard size={16} color={Colors.color} />;
    else if (id === "5") return <IconCash size={16} color={Colors.color} />;
  };

  return (
    <Pressable
      {...rest}
      onPress={() => setSelected(id)}
      className={`rounded-xl border-2 px-4 py-3 ${
        selected === id ? "border-button bg-button/30" : "border-gray-300"
      }`}
    >
      <View className="flex flex-row items-center justify-between">
        <View>
          <View className="flex flex-row gap-4 items-center">
            {renderIcon(id)}
            <Text className="text-base text-color">{label}</Text>
            <Text className="font-light text-sm">{time}</Text>
          </View>
          {description.trim() !== "" && (
            <Text className="font-light text-sm text-gray-600">
              {description}
            </Text>
          )}
        </View>
        {price !== null && (
          <Text className="font-normal text-lg text-gray-600">${price}</Text>
        )}
      </View>
    </Pressable>
  );
};

export const AddressSelection = () => {
  
}