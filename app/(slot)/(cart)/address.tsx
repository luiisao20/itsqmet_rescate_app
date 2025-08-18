import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { IconMap, IconSelect } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import { AddressDB } from "@/core/database/interfaces/address";
import { useAddresses } from "@/presentation/addresses/useAddresses";
import { useAddressStore } from "@/presentation/addresses/store/useAddressStore";

const AdressScreen = () => {
  const [addresses, setAddresses] = useState<AddressDB[]>([]);
  const { addressesQuery } = useAddresses();
  const { setSelectedAddress } = useAddressStore();

  useEffect(() => {
    if (addressesQuery.data) {
      setAddresses(addressesQuery.data);
    }
  }, [addressesQuery.data]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={addressesQuery.isFetching}
          onRefresh={async () => await addressesQuery.refetch()}
        />
      }
      className="py-4 px-6"
    >
      <Text className="text-2xl text-center text-color font-semibold mb-4">
        Ubicaciones guardadas
      </Text>
      {addressesQuery.isLoading ? (
        <ActivityIndicator color={Colors.button} size={30} className="my-10" />
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
                  setSelectedAddress(item);
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
        onPress={() => router.push("/(slot)/(cart)/position/0")}
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
