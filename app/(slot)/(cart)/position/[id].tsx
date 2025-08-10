import { useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { ModalLocation } from "@/presentation/addresses/components/ModalLocation";
import { AddressDB } from "@/core/database/interfaces/address";
import { useAddress } from "@/presentation/addresses/useAddresses";
import MapViewComponent from "@/presentation/components/MapViewComponent";
import { LatLng } from "@/infraestructure/interfaces/lat-lang";

interface ModalProps {
  isOpen: boolean;
  infoLocation: AddressDB;
}

const EditAdress = () => {
  const { id } = useLocalSearchParams();
  const isNew = id === "0";

  const { addressQuery, addressDeleteMutation } = useAddress(parseInt(`${id}`));

  const [modalProps, setModalProps] = useState<ModalProps>({
    isOpen: false,
    infoLocation: {
      description: "",
      alias: "",
      latitude: 0,
      longitude: 0,
      id: parseInt(`${id}`),
    },
  });

  useEffect(() => {
    if (addressQuery.data) {
      setModalProps((prev) => ({
        ...prev,
        infoLocation: {
          ...prev.infoLocation,
          alias: addressQuery.data.alias,
          description: addressQuery.data.description,
          latitude: addressQuery.data.latitude,
          longitude: addressQuery.data.longitude,
        },
      }));
    }
  }, [addressQuery.data]);

  if (addressQuery.isLoading) {
    return <ActivityIndicator size={30} className="my-10" />;
  }

  return (
    <View className="px-6 py-4">
      <Text className="text-2xl text-color text-center">
        {addressQuery.data ? modalProps.infoLocation.alias : "Mi ubicación"}
      </Text>
      <MapViewComponent
        locationRef={isNew ? undefined : modalProps.infoLocation}
        onUpdateLocation={(location: LatLng, address: string) => {
          setModalProps((prev) => ({
            ...prev,
            infoLocation: {
              ...prev.infoLocation,
              description: address,
              latitude: location.latitude,
              longitude: location.longitude,
            },
          }));
        }}
      />
      <View className="flex flex-row gap-4 justify-around items-center">
        <Pressable
          onPress={() =>
            setModalProps((prev) => ({
              ...prev,
              isOpen: true,
            }))
          }
          className="bg-button p-4 rounded-xl active:bg-button/60"
        >
          <Text className="text-xl text-white font-semibold">Editar</Text>
        </Pressable>
        {!isNew && (
          <Pressable
            disabled={addressDeleteMutation.isPending}
            onPress={async () => {
              await addressDeleteMutation.mutateAsync();
              router.dismiss();
            }}
            className="bg-danger p-4 rounded-xl active:bg-danger/60"
          >
            {addressDeleteMutation.isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-xl text-white font-semibold">Eliminar</Text>
            )}
          </Pressable>
        )}
      </View>
      <ModalLocation
        isOpen={modalProps.isOpen}
        onReturn={() => router.dismiss()}
        infoLocation={modalProps.infoLocation}
        onClose={() =>
          setModalProps((prev) => ({
            ...prev,
            isOpen: false,
          }))
        }
      />
    </View>
  );
};

export default EditAdress;
