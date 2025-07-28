import { View, Text, Pressable, ScrollView } from "react-native";
import { IconMap, IconSelect } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useCustomerStore } from "@/components/store/useDb";
import { useEffect } from "react";
import { useAddressStore } from "@/components/store/useAddressStore";
import { ActivityIndicator } from "react-native-paper";

const AdressScreen = () => {
  const { customer } = useCustomerStore();
  const { setSelectedAddress, fetchAddresses, isLoading, addresses } =
    useAddressStore();

  useEffect(() => {
    if (customer?.id) {
      fetchAddresses(customer.id);
    }
  }, [customer]);

  return (
    <ScrollView className="py-4 px-6">
      <Text className="text-2xl text-center text-color font-semibold mb-4">
        Ubicaciones guardadas
      </Text>
      {isLoading ? (
        <ActivityIndicator size={40} color={Colors.color} className="my-10" />
      ) : (
        addresses.map((item, index) => (
          <View
            key={index}
            className="bg-background my-4 flex flex-row items-center justify-between p-4 rounded-xl"
          >
            <View>
              <Text className="text-xl font-semibold text-color">
                {item.alias}
              </Text>
              <Text className="font-light">{item.description}</Text>
            </View>
            <View className="flex gap-2 justify-center">
              <Pressable
                onPress={() =>
                  router.push(`/(slot)/(cart)/position/${item.id}`)
                }
                className="active:opacity-60"
              >
                <IconMap color={Colors.color} />
              </Pressable>
              <Pressable
                onPress={() => {
                  setSelectedAddress(item.id!);
                  router.replace("/(slot)/(cart)/pay");
                }}
                className="active:opacity-60"
              >
                <IconSelect color={Colors.color} />
              </Pressable>
            </View>
          </View>
        ))
      )}
      <Pressable
        onPress={() => router.push("/(slot)/(cart)/position/new")}
        className="bg-button p-4 rounded-xl mb-10"
      >
        <Text className="text-white font-semibold text-lg text-center">
          Añadir nueva ubicación
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default AdressScreen;
