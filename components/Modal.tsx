import { useEffect, useState } from "react";
import { View, Modal, ModalProps, Text, Pressable } from "react-native";
import { IconClose, IconLike } from "./ui/Icons";
import { ActivityIndicator, Portal, TextInput } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { Selection } from "./Selection";
import { AddressDB } from "@/infraestructure/database/tables";
import { useAddressStore } from "./store/useAddressStore";
import { router } from "expo-router";

export interface CardInput {
  number: string;
  date: string;
  cvv: string;
  type: string;
}

export interface InputProps extends ModalProps {
  isOpen: boolean;
  label?: string;
  inputMode?: "decimal" | "email" | "numeric" | "text";
  textValue?: string;
  infoCard?: CardInput;
  infoLocation?: {
    alias: string;
    description: string;
    latitude: number | null;
    longitude: number | null;
  };
  showDelete?: boolean;
  message?: string;
  labelButton?: string;
  idCurrentCard?: string | null;

  onClose: () => void;
  onSendData?: (text: string) => void;
  onDeleteData?: (id: string) => void;
  onUpdateData?: () => void;
  onUpdateLocation?: () => void;
}

export interface InfoProps extends ModalProps {
  isOpen: boolean;
  product?: string;
  message: string;
  cart?: boolean;

  onClose: () => void;
  onUnDone?: () => void;
  onSelect?: (id: string) => void;
}

export const ModalInfo = ({
  isOpen,
  message,
  product,
  cart = false,

  onClose,
  onUnDone = () => console.log("No implementado"),
  ...rest
}: InfoProps) => {
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
            <Text className="text-xl text-color text-center">
              El paquete
              <Text className="font-bold"> {product} </Text>
              {message}
            </Text>
            <IconLike color={Colors.color} size={50} className="my-4" />
            <Pressable
              onPress={() => onUnDone()}
              className="bg-danger active:bg-danger/60 w-1/2 py-3 rounded-xl"
            >
              <Text className="text-white font-semibold text-xl text-center">
                {cart ? "Eliminar" : "Deshacer"}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export const ModalLocation = ({
  isOpen,
  infoLocation = {
    alias: "",
    description: "",
    latitude: null,
    longitude: null,
  },

  onClose,
  onUpdateLocation = () => console.log("no implementado"),
  ...rest
}: InputProps) => {
  const [location, setLocation] = useState<{
    alias: string;
    description: string;
  }>({ alias: "", description: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { fetchAddresses } = useAddressStore();

  useEffect(() => {
    location.alias = infoLocation.alias;
    location.description = infoLocation.description;
  }, [infoLocation]);

  const handleAddress = async () => {
    setLoading(true);

    if (infoLocation.latitude && infoLocation.longitude) {
      try {
        const newAddress: AddressDB = {
          alias: location.alias,
          description: location.description,
          latitude: infoLocation.latitude,
          longitude: infoLocation.longitude,
        };
        setSuccess(true);
        router.dismiss();
      } catch (error) {
        console.log(error);
        alert(`Ha ocurrido un error: ${error}`);
      }
    }
    setLoading(false);
  };

  return (
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
            <TextInput
              className="bg-white"
              label="Alias"
              autoCapitalize="words"
              mode="flat"
              inputMode="text"
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              value={location.alias}
              onChangeText={(text) =>
                setLocation((prev) => ({
                  ...prev,
                  alias: text,
                }))
              }
            />
            <TextInput
              className="bg-white"
              label="Dirección"
              autoCapitalize="words"
              mode="flat"
              inputMode="text"
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              value={location.description}
              onChangeText={(text) =>
                setLocation((prev) => ({
                  ...prev,
                  description: text,
                }))
              }
            />
          </View>
          {success && (
            <Text className="mt-4 text-success">
              ¡La dirección se ha guardado con éxito!
            </Text>
          )}
          <View className="flex flex-row justify-start gap-4">
            <Pressable
              className="bg-button rounded-lg px-4 mt-4 active:bg-button/60"
              onPress={handleAddress}
            >
              {loading ? (
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
  );
};

export const ModalPayments = ({
  isOpen,
  message,

  onClose,
  onSelect = () => console.log("No implementado"),
  ...rest
}: InfoProps) => {
  const [selected, setSelected] = useState<string>("");

  return (
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
          <Text className="text-xl text-color text-center font-semibold">
            Escoge un método de pago
          </Text>
          <View className="flex gap-4 w-full my-4">
            {/* {cards.map((item, index) => (
              <Selection
                key={index}
                id="4"
                label={item.type}
                description={`${item.number} ${item.month} / ${item.year}`}
                setSelected={() => {
                  setSelectedCard(item.id!)
                }}
              />
            ))} */}
            <Selection
              id="5"
              label="Efectivo"
              setSelected={() => {
                setSelected('5')
              }}
            />
          </View>
          <Pressable
            onPress={() => onSelect(selected)}
            className="bg-success p-4 rounded-xl active:bg-success/40"
          >
            <Text className="text-white text-xl shadow-black">Seleccionar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
