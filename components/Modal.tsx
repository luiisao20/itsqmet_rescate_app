import { useEffect, useState } from "react";
import { View, Modal, ModalProps, Text, Pressable } from "react-native";
import { IconClose, IconLike } from "./ui/Icons";
import { TextInput } from "react-native-paper";
import { Colors } from "@/constants/Colors";

interface InputProps extends ModalProps {
  isOpen: boolean;
  label: string;
  inputMode?: "decimal" | "email" | "numeric" | "text";
  textValue?: string;
  infoCard?: {
    number: string;
    date: string;
    cvv: string;
  };

  onClose: () => void;
  onSendData?: (text: string) => void;
  onDeleteData?: (id: string) => void;
  onUpdateData?: (id: string) => void;
}

export const ModalInput = ({
  isOpen,
  label,
  inputMode = "text",
  textValue = "",

  onClose,
  onSendData = () => console.log("no implementado"),
  ...rest
}: InputProps) => {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    setText(textValue);
  }, [textValue]);

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
          <Text className="text-xl font-normal">
            ¿Quieres actualizar tu nombre?
          </Text>
          <View className="w-full">
            <TextInput
              className="bg-white"
              label={label}
              autoCapitalize="words"
              mode="flat"
              inputMode={inputMode}
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              value={text}
              onChangeText={(text) => setText(text)}
            />
          </View>
          <Pressable
            className="bg-button rounded-lg w-full mt-4 active:bg-button/60"
            onPress={() => onSendData(text)}
          >
            <Text className="text-white py-3 text-center text-base font-bold">
              Guardar
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export const ModalCard = ({
  isOpen,
  label,
  inputMode = "text",
  infoCard = {
    number: "",
    cvv: "",
    date: "",
  },

  onClose,
  onUpdateData = () => console.log("no implementado"),
  onDeleteData = () => console.log("no implementado"),
  ...rest
}: InputProps) => {
  const [card, setCard] = useState<{
    code: string;
    date: string;
    cvv: string;
  }>({ code: "", date: "", cvv: "" });

  useEffect(() => {
    card.code = infoCard.number;
    card.cvv = infoCard.cvv;
    card.date = infoCard.date;
  }, [infoCard]);

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
            Actualiza la información de tu tarjeta
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
              value={infoCard.number}
              onChangeText={(text) =>
                setCard((prev) => ({
                  ...prev,
                  number: text,
                }))
              }
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
                value={infoCard.date}
                onChangeText={(text) =>
                  setCard((prev) => ({
                    ...prev,
                    date: text,
                  }))
                }
              />
              <TextInput
                className="bg-white w-[120]"
                label="CVV"
                secureTextEntry
                autoCapitalize="words"
                mode="flat"
                inputMode={inputMode}
                textColor={Colors.color}
                underlineColor={Colors.color}
                activeUnderlineColor={Colors.button}
                value=""
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
            <Pressable
              className="bg-danger rounded-lg px-4 mt-4 active:bg-danger/60"
              onPress={() => onDeleteData("1")}
            >
              <Text className="text-white py-3 text-center text-base font-bold">
                Eliminar
              </Text>
            </Pressable>
            <Pressable
              className="bg-button rounded-lg px-4 mt-4 active:bg-button/60"
              onPress={() => onUpdateData("1")}
            >
              <Text className="text-white py-3 text-center text-base font-bold">
                Guardar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface InfoProps extends ModalProps {
  isOpen: boolean;
  message: string;
  cart?: boolean;

  onClose: () => void;
  onUnDone: () => void;
}

export const ModalInfo = ({
  isOpen,
  message,
  cart = false,

  onClose,
  onUnDone,
  ...rest
}: InfoProps) => {
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
          {cart ? (
            <Text className="text-xl text-color text-center">
              El paquete
              <Text className="font-bold"> {message} </Text>
              será eliminado del carrito
            </Text>
          ) : (
            <Text className="text-xl text-color text-center">
              El paquete
              <Text className="font-bold"> {message} </Text>
              ha sido reservado en el carrito
            </Text>
          )}
          <IconLike color={Colors.color} size={50} className="my-4" />
          <Pressable
            onPress={() => onUnDone()}
            className="bg-danger active:bg-danger/60 w-1/2 py-3 rounded-xl"
          >
            {cart ? (
              <Text className="text-white font-semibold text-xl text-center">
                Eliminar
              </Text>
            ) : (
              <Text className="text-white font-semibold text-xl text-center">
                Deshacer
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
