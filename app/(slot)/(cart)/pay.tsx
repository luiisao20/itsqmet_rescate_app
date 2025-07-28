import { View, Text, Pressable, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { IconCard, IconCash, IconGo } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import { ModalPayments } from "@/components/Modal";
import { Selection } from "@/components/Selection";
import { router } from "expo-router";
import { useAddressStore } from "@/components/store/useAddressStore";
import { useCardStore, useCustomerStore } from "@/components/store/useDb";
import { CardDB } from "@/infraestructure/database/tables";
import {useCartStore} from "@/components/store/usePacksStore";

export type Time = {
  id: string;
  label: string;
  description: string;
  time?: string;
  price?: number;
};

const PayScreen = () => {
  const [selected, setSelected] = useState<string>("2");
  const {getTotalPrice} = useCartStore();

  const options: Time[] = [
    {
      id: "1",
      label: "Más rápido",
      description: "Entrega directa a ti",
      time: "20 - 45 min",
      price: 0.79,
    },
    {
      id: "2",
      label: "Estándard",
      description: "Entrega regular",
      time: "30 - 50 min",
      price: 0,
    },
    {
      id: "3",
      label: "Ahorra sin apurarte",
      description: "Espera y ahorra",
      time: "45 - 65 min",
      price: -0.59,
    },
  ];

  const [paymentMethod, setPaymentMethod] = useState<string>("4");
  const { getSelectedAddress } = useAddressStore();
  const { fetchCards, getSelectedCard, selectedCardId } = useCardStore();
  const { customer } = useCustomerStore();

  const [modalProps, setModalProps] = useState<{
    message: string;
    isOpen: boolean;
    index: number;
  }>({
    message: "",
    isOpen: false,
    index: 0,
  });

  useEffect(() => {
    fetchCards(customer?.id!);
  }, []);

  useEffect(() => {
    renderPaymentMethod();
  }, [selectedCardId]);

  const renderPaymentMethod = () => {
    const card: CardDB | null = getSelectedCard();

    if (card) {
      return (
        <View className="flex flex-row items-center gap-4">
          <IconCard color={Colors.color} />
          <View>
            <Text className="text-lg font-light">
              {card.type} {card.number}
            </Text>
            <Text>
              {customer?.lastName} {customer?.name}
            </Text>
          </View>
        </View>
      );
    }
    return (
      <View className="flex flex-row items-center gap-4">
        <IconCash color={Colors.color} />
        <View>
          <Text className="text-lg font-light">Efectivo</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View className="py-4 gap-4 px-6">
        <Text className="text-xl text-color font-semibold">
          Dirección de entrega
        </Text>
        <Pressable
          onPress={() => router.push("/(slot)/(cart)/address")}
          className="flex p-2 flex-row justify-between items-center border-b-2 border-color active:bg-gray-200"
        >
          <View className="w-4/5">
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              className="text-lg font-light"
            >
              {getSelectedAddress()
                ? getSelectedAddress()?.description
                : "Escoger dirección"}
            </Text>
          </View>
          <IconGo color={Colors.color} />
        </Pressable>
        <Text className="text-xl text-color font-semibold">
          Tiempo de entrega
        </Text>
        <View className="flex gap-4">
          {options.map((opt, index) => (
            <Selection
              key={index}
              id={opt.id}
              price={opt.price}
              label={opt.label}
              time={opt.time}
              description={opt.description}
              selected={selected}
              setSelected={() => setSelected(opt.id)}
            />
          ))}
        </View>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xl text-color font-semibold">
            Método de pago
          </Text>
          <Pressable
            onPress={() => setModalProps((prev) => ({ ...prev, isOpen: true }))}
            className="bg-button py-2 px-4 rounded-xl active:bg-button/60"
          >
            <Text className="text-white text-xl text-center">Cambiar</Text>
          </Pressable>
        </View>
        <View className="flex p-2 flex-row justify-between items-center border-b-2 border-color">
          {renderPaymentMethod()}
        </View>
        <View className="bg-background p-4 rounded-xl flex gap-4">
          <View className="flex flex-row justify-between">
            <Text className="font-light text-lg text-color">Productos</Text>
            <Text className="font-light text-lg text-color">$ {getTotalPrice().toFixed(2)}</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="font-light text-lg text-color">
              Cobro por entrega
            </Text>
            <Text className="font-light text-lg text-color">$0.59</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="font-light text-lg text-color">
              Cobro por servicio
            </Text>
            <Text className="font-light text-lg text-color">$0.39</Text>
          </View>
        </View>
      </View>
      <ModalPayments
        isOpen={modalProps.isOpen}
        message={modalProps.message}
        onClose={() => setModalProps((prev) => ({ ...prev, isOpen: false }))}
        onSelect={(id) => {
          setPaymentMethod(id);
          setModalProps((prev) => ({ ...prev, isOpen: false }));
        }}
      />
    </ScrollView>
  );
};

export default PayScreen;
