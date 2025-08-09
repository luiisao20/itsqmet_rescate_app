import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { router } from "expo-router";

import { Colors } from "@/constants/Colors";

import HomeCards from "@/components/HomeCards";
import { IconProfileHome } from "@/components/ui/Icons";
import { ProfileTabParamList } from "../_layout";
import { ActivityIndicator } from "react-native-paper";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { useCustomer } from "@/presentation/customer/useCustomer";

type NavigationProp = NativeStackNavigationProp<ProfileTabParamList>;

const InfoProfile = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setIsLoading] = useState<boolean>(false);
  const { logout } = useAuthStore();

  const { customerQuery } = useCustomer();

  if (customerQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator color={Colors.button} size={50} />
      </View>
    );
  }

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
    router.replace("/login");
  };

  const customer = customerQuery.data!;

  return (
    <View className="px-6 my-4">
      <IconProfileHome
        size={120}
        color={Colors.color}
        className="text-center"
      />
      <Text className="text-2xl text-color font-bold text-center">{customer.name}</Text>
      <Text className="text-xl text-color font-light text-center">
        {customer.email}
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
      <Pressable
        onPress={handleLogout}
        className="bg-button p-4 rounded-xl active:bg-button/60 my-4"
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-xl text-center font-semibold">
            Cerrar sesión
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default InfoProfile;
