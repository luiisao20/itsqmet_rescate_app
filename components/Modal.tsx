import { View, Modal, ModalProps, Text, Pressable } from "react-native";
import { IconClose, IconLike } from "./ui/Icons";
import { Portal } from "react-native-paper";
import { Colors } from "@/constants/Colors";

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
  onUnDone = () => {},
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
