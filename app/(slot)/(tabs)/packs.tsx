import { Pressable, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { IconAdd, IconHeartOut, IconStar } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";

const PacksTab = () => {
  return (
    <View className="px-6 py-4">
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
            source={require("@/assets/images/packs/background-kfc.png")}
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
              source={require("@/assets/images/packs/logo-kfc.png")}
              style={{ height: 60, width: 60, borderRadius: 9999 }}
            />
            <Text className="text-white font-semibold text-xl">
              Kentucky Fried Chicken
            </Text>
          </View>
          <View className="absolute bg-button p-2 rounded-xl top-2 left-2">
            <Text className="text-white font-semibold ">Quedan 3</Text>
          </View>
          <View className="absolute top-2 right-2 flex gap-2">
            <Pressable className=" bg-white p-2 rounded-full">
              <IconHeartOut size={18} />
            </Pressable>
            <Pressable className=" bg-white p-2 rounded-full">
              <IconAdd size={18} />
            </Pressable>
          </View>
        </View>
        <View className="p-4">
          <Text className="text-lg font-semibold text-color">
            Pack Sorpresa
          </Text>
          <Text className="text-base font-light text-color">
            Recoger entre 12:00 PM - 1:00 PM
          </Text>
          <View className="flex flex-row justify-between">
            <View className="flex flex-row gap-4">
              <View className="flex flex-row items-baseline gap-2">
                <IconStar size={16} color={Colors.color} />
                <Text className="text-lg font-semibold text-color">4.8</Text>
              </View>
              <View className="w-0.5 h-full bg-gray-300 rounded-full" />
              <Text className="text-lg font-semibold text-color">1.0 km</Text>
            </View>
            <Text className="text-xl font-bold text-color">$ 4.99</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PacksTab;
