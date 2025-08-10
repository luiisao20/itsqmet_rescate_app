import { Selection } from "@/components/Selection";
import { IconClose } from "@/components/ui/Icons";
import { CardDB } from "@/core/database/interfaces/card";
import { useCards } from "@/presentation/card/useCards";
import { useEffect, useState } from "react";
import { Modal, ModalProps, Pressable, Text, View } from "react-native";

export interface InfoProps extends ModalProps {
  isOpen: boolean;
  message: string;

  onClose: () => void;
  onSelect: (type: string, card?: CardDB) => void;
}

export const ModalPayments = ({
  isOpen,
  message,

  onClose,
  onSelect,
  ...rest
}: InfoProps) => {
  const [cards, setCards] = useState<CardDB[]>([]);
  const { cardQuery } = useCards();

  useEffect(() => {
    if (cardQuery.data) {
      setCards(cardQuery.data);
    }
  }, [cardQuery.data]);

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
                description={`${item.number} | ${item.month} / ${item.year}`}
                setSelected={() => {
                  onSelect("4", item);
                  onClose();
                }}
              />
            ))}
            <Selection
              id="5"
              label="Efectivo"
              setSelected={() => {
                onSelect("5", undefined);
                onClose()
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
