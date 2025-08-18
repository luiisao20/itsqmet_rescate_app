import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  Modal,
  ModalProps,
  Pressable,
  View,
} from "react-native";
import { Portal } from "react-native-paper";

import { IconClose } from "@/components/ui/Icons";
import InputThemed from "@/components/ui/InputThemed";
import { AddressDB } from "@/core/database/interfaces/address";
import { useAddress } from "../useAddresses";

export interface InputProps extends ModalProps {
  isOpen: boolean;
  infoLocation?: AddressDB;

  onClose: () => void;
  onUpdateLocation?: () => void;
  onReturn: () => void;
}

export const ModalLocation = ({
  isOpen,
  infoLocation,

  onClose,
  onUpdateLocation = () => console.log("no implementado"),
  onReturn,
  ...rest
}: InputProps) => {
  const [location, setLocation] = useState<AddressDB>({
    alias: "",
    description: "",
    latitude: 0,
    longitude: 0,
  });
  const { addressMutation } = useAddress(location.id);

  useEffect(() => {
    if (infoLocation) {
      location.alias = infoLocation.alias;
      location.description = infoLocation.description;
      location.latitude = infoLocation.latitude;
      location.longitude = infoLocation.longitude;

      if (infoLocation.id !== 0) location.id = infoLocation.id;
    }
  }, [isOpen]);

  return (
    <Portal>
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        statusBarTranslucent
        {...rest}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-[95%] rounded-xl py-8 px-10 justify-center items-center relative">
            <Pressable
              onPress={() => onClose()}
              className="absolute top-4 right-4 active:bg-button/60 rounded-xl"
            >
              <IconClose className="text-color" />
            </Pressable>
            <Text className="text-xl font-normal text-center">
              Actualiza la información de la ubicación
            </Text>
            <View className="w-full">
              <InputThemed
                label="Alias"
                autoCapitalize="words"
                value={location.alias}
                updateText={(text) =>
                  setLocation((prev) => ({
                    ...prev,
                    alias: text,
                  }))
                }
              />
              <InputThemed
                label="Dirección"
                autoCapitalize="words"
                value={location.description}
                updateText={(text) =>
                  setLocation((prev) => ({
                    ...prev,
                    description: text,
                  }))
                }
              />
            </View>
            <View className="flex flex-row justify-start gap-4">
              <Pressable
                className="bg-button rounded-lg px-4 mt-4 active:bg-button/60"
                onPress={async () => {
                  console.log({hola: location});
                  
                  await addressMutation.mutateAsync({ ...location });
                  onClose();
                  onReturn();
                }}
              >
                {addressMutation.isPending ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white py-3 text-center text-base font-bold">
                    Actualizar
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
