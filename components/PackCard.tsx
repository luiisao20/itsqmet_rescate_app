import { View, Text, Pressable } from "react-native";
import React from "react";

const PackCard = () => {
  
  return (
    <View className="bg-button/60 p-4 rounded-xl">
      <Text className="text-2xl font-extrabold text-color">
        Pack de KFC
      </Text>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-color text-2xl font-bold">
          $4.99{" "}
          <Text className="font-normal text-lg line-through ml-8">$8.99</Text>
        </Text>
        <Pressable className="bg-button p-2 w-[100] rounded-xl active:bg-button/60">
          <Text className="text-white text-xl font-medium text-center">
            Reservar
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PackCard;
