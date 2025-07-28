import { useEffect, useState } from "react";
import { View, Modal, ModalProps, Text, Pressable } from "react-native";
import { IconClose, IconLike } from "./ui/Icons";
import { ActivityIndicator, Portal, TextInput } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { Time } from "@/app/(slot)/(cart)/pay";
import { Selection } from "./Selection";
import InputThemed from "./ui/InputThemed";
import { useCardStore, useCustomerStore } from "./store/useDb";
import { AddressDB, CardDB } from "@/infraestructure/database/tables";
import {
  deleteCard,
  saveCard,
  saveCustomerAddress,
  udpateCard,
} from "@/utils/database";
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

export const ModalInput = ({
  isOpen,
  label,
  inputMode = "text",
  textValue = "",
  message = "¿Quieres actualizar tu nombre?",
  labelButton = "Guardar",

  onClose,
  onSendData = () => console.log("no implementado"),
  ...rest
}: InputProps) => {
  const [text, setText] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);

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
          <Text className="text-xl font-normal">{message}</Text>
          <View className="w-full">
            <InputThemed
              value={text}
              updateText={(text, disabled) => {
                setText(text);
                setDisabled(!disabled);
              }}
              label={label}
              inputMode={inputMode}
              autoCapitalize={inputMode === "email" ? "none" : "words"}
            />
          </View>
          <Pressable
            disabled={disabled}
            className="bg-button rounded-lg w-full mt-4 active:bg-button/60 disabled:bg-slate-500"
            onPress={() => onSendData(text)}
          >
            <Text className="text-white py-3 text-center text-base font-bold">
              {labelButton}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export const ModalCard = ({
  isOpen,
  inputMode = "numeric",
  showDelete = true,
  idCurrentCard = "",

  onClose,
  onUpdateData = () => console.log("no implementado"),
  onDeleteData = () => console.log("no implementado"),
  ...rest
}: InputProps) => {
  const [card, setCard] = useState<CardInput>({
    number: "",
    date: "",
    cvv: "",
    type: "",
  });
  const { customer } = useCustomerStore();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [deleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    let formatted = cleaned;
    if (cleaned.length >= 3) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    setCard((prev) => ({ ...prev, date: formatted }));
  };

  const getCardBrand = (number: string): string => {
    if (number.startsWith("4")) return "Visa";
    if (/^5[1-5]/.test(number)) return "MasterCard";
    if (/^3[47]/.test(number)) return "American Express";
    if (/^6(?:011|5)/.test(number)) return "Discover";
    return "Otra";
  };

  const handleCard = async () => {
    setIsLoading(true);
    const cardDb: CardDB = {
      number: card.number.slice(-4),
      month: parseInt(card.date.split("/")[0]),
      year: parseInt(card.date.split("/")[1]),
      type: card.type,
      idCustomer: customer?.id,
    };
    await saveCard(cardDb);
    setIsLoading(false);
    onUpdateData();
    onClose();
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const cardDb: CardDB = {
      number: card.number.slice(-4),
      month: parseInt(card.date.split("/")[0]),
      year: parseInt(card.date.split("/")[1]),
      type: card.type,
      idCustomer: customer?.id,
    };
    await udpateCard(idCurrentCard, cardDb);
    setIsLoading(false);
    onUpdateData();
    onClose();
  };

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    await deleteCard(idCurrentCard);
    setIsDeleteLoading(false);
    onUpdateData();
    onClose();
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
            {showDelete
              ? "Actualiza la información de tu tarjeta"
              : "Rellena los datos"}
          </Text>
          <View className="w-full">
            <TextInput
              className="bg-white"
              label="Número de tarjeta"
              autoCapitalize="words"
              mode="flat"
              inputMode={inputMode}
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              value={card.number}
              onChangeText={(text) => {
                setCard((prev) => ({
                  ...prev,
                  number: text,
                  type: getCardBrand(text),
                }));
              }}
            />
            <View className="flex flex-row justify-center gap-4">
              <TextInput
                className="bg-white w-[120]"
                label="Fecha de expiración"
                autoCapitalize="words"
                mode="flat"
                inputMode={inputMode}
                textColor={Colors.color}
                underlineColor={Colors.color}
                activeUnderlineColor={Colors.button}
                value={card.date}
                onChangeText={handleChange}
              />
              <TextInput
                className="bg-white w-[120]"
                label="CVV"
                secureTextEntry
                autoCapitalize="words"
                mode="flat"
                inputMode="numeric"
                textColor={Colors.color}
                underlineColor={Colors.color}
                activeUnderlineColor={Colors.button}
                value={card.cvv}
                onChangeText={(text) =>
                  setCard((prev) => ({
                    ...prev,
                    cvv: text,
                  }))
                }
              />
            </View>
          </View>
          <View className="flex flex-row justify-start gap-4">
            {showDelete && (
              <Pressable
                className="bg-danger rounded-lg px-4 mt-4 active:bg-danger/60"
                onPress={handleDelete}
              >
                {deleteLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white py-3 text-center text-base font-bold">
                    Eliminar
                  </Text>
                )}
              </Pressable>
            )}
            <Pressable
              className="bg-button rounded-lg px-4 mt-4 active:bg-button/60"
              onPress={() => {
                if (showDelete) handleUpdate();
                else handleCard();
              }}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white py-3 text-center text-base font-bold">
                  Guardar
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
  const { customer } = useCustomerStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { fetchAddresses } = useAddressStore();

  useEffect(() => {
    location.alias = infoLocation.alias;
    location.description = infoLocation.description;
  }, [infoLocation]);

  const handleAddress = async () => {
    setLoading(true);

    if (infoLocation.latitude && infoLocation.longitude && customer?.id) {
      try {
        const newAddress: AddressDB = {
          alias: location.alias,
          description: location.description,
          latitude: infoLocation.latitude,
          longitude: infoLocation.longitude,
        };
        await saveCustomerAddress(newAddress, customer.id);
        setSuccess(true);
        fetchAddresses(customer.id);
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
  const { cards, setSelectedCard } = useCardStore();

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
            {cards.map((item, index) => (
              <Selection
                key={index}
                id="4"
                label={item.type}
                description={`${item.number} ${item.month} / ${item.year}`}
                setSelected={() => {
                  setSelectedCard(item.id!)
                }}
              />
            ))}
            <Selection
              id="5"
              label="Efectivo"
              setSelected={() => {
                setSelected('5')
                setSelectedCard("5")
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
