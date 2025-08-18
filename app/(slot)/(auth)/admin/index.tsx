import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const AdminScreen = () => {
  const [loading, setIsLoading] = useState<boolean>(false);

  const getCustomerData = async () => {
    setIsLoading(true);

    setIsLoading(false);
  };

  return (
    <View className="flex flex-1 justify-center items-center">
      <Pressable
        disabled={loading}
        onPress={getCustomerData}
        className="p-4 bg-button rounded-xl"
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-xl font-semibold text-center text-white">
            Agregar
          </Text>
        )}
      </Pressable>
      {/* <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/expo-push-notifications-1c7e1.firebasestorage.app/o/restaurants%2Fbackground-general.png?alt=media&token=b7499054-5d8d-4db6-845a-a69f92d0e29f",
        }}
        style={{
          height: 180,
          width: "100%",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
        contentFit="cover"
        transition={300}
        priority="high"
        cachePolicy="memory-disk"
        placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
      /> */}
    </View>
  );
};

export default AdminScreen;
