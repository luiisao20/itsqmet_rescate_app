import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import {router} from "expo-router";

const SuccessScreen = () => {
  const [showSuccess, setShowSuccess] = useState<boolean>(true);
  return (
    <View className="flex flex-1 justify-center items-center">
      {showSuccess ? (
        <>
          <Image
            source={require("@/assets/images/success-logo.png")}
            style={{
              resizeMode: "contain",
              width: "100%",
              height: 300,
            }}
          />
          <Pressable onPress={() => router.replace('/(slot)/(tabs)')} className="bg-button active:bg-button/60 rounded-xl p-4">
            <Text className="text-xl font-semibold text-white">
              Volver al inicio
            </Text>
          </Pressable>
        </>
      ) : (
        <>
          <Image
            source={require("@/assets/images/error-logo.png")}
            style={{
              resizeMode: "contain",
              width: "100%",
              height: 300,
            }}
          />
          <Pressable onPress={() => router.replace('/(slot)/(tabs)/donations/contact')} className="bg-button active:bg-button/60 rounded-xl p-4">
            <Text className="text-xl font-semibold text-white">
              Volver a intentarlo
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default SuccessScreen;
