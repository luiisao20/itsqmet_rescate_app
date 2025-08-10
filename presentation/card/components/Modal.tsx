import { useEffect, useState } from "react";
import { Alert, Modal, ModalProps, Pressable, Text, View } from "react-native";
import { ActivityIndicator, TextInput } from "react-native-paper";

import { IconClose } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import { CardDB } from "@/core/database/interfaces/card";
import { useCards } from "../useCards";

export interface CardInput {
  number: string;
  date: string;
  cvv: string;
  type: string;
}

export interface InputProps extends ModalProps {
  isOpen: boolean;
  inputMode?: "decimal" | "email" | "numeric" | "text";
  showDelete?: boolean;
  idCurrentCard?: number | undefined;

  onClose: () => void;
}

export const ModalCard = ({
  isOpen,
  inputMode = "numeric",
  showDelete = true,
  idCurrentCard,

  onClose,
  ...rest
}: InputProps) => {
  const [card, setCard] = useState<CardInput>({
    number: "",
    date: "",
    cvv: "",
    type: "",
  });
  const [loading, setIsLoading] = useState<boolean>(false);
  const [deleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const { cardMutation, cardDeleteMutation } = useCards();

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

    const { number, date, cvv } = card;

    if (number === "" || date === "" || cvv.length !== 3) {
      Alert.alert("Debes llenar todos los datos");
      return;
    }

    const cardDb: CardDB = {
      number: parseInt(number.slice(-4)),
      month: parseInt(date.split("/")[0]),
      year: parseInt(date.split("/")[1]),
      type: card.type,
    };

    if (idCurrentCard) cardDb.id = idCurrentCard;

    await cardMutation.mutate({ ...cardDb });
    setIsLoading(false);
    onClose();
  };

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    await cardDeleteMutation.mutate(idCurrentCard!);
    setIsDeleteLoading(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      idCurrentCard = undefined;
      setCard({
        number: "",
        date: "",
        cvv: "",
        type: "",
      });
    }
  }, [isOpen]);

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
            onPress={onClose}
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
              onPress={handleCard}
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
