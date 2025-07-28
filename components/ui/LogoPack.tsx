import { View, Text } from "react-native";
import React, { useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";

interface Props {
  route: string;
  title: string;
}

const LogoPack = ({ route, title }: Props) => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  return (
    <View className="flex flex-row items-end absolute left-2 bottom-2 z-10 gap-4">
      <View style={{ position: "relative" }}>
        {!logoLoaded && (
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              backgroundColor: "#e0e0e0",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              zIndex: 1,
            }}
          >
            <ActivityIndicator size="small" color={Colors.color} />
          </View>
        )}

        <Image
          source={{ uri: route }}
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
            opacity: logoLoaded ? 1 : 0,
          }}
          contentFit="cover"
          transition={200}
          priority="normal"
          cachePolicy="memory-disk"
          onLoad={() => setLogoLoaded(true)}
          onLoadStart={() => setLogoLoaded(false)}
        />
      </View>

      <Text className="text-white font-semibold text-xl text-wrap w-3/4">
        {title}
      </Text>
    </View>
  );
};

export default LogoPack;
