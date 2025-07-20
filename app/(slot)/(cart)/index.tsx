import { Pressable, Text, View } from "react-native";
import { useState } from "react";
import PackCard from "@/components/PackCard";
import { ModalInfo } from "@/components/Modal";

type Pack = {
  title: string;
  price: number;
  discountPrice?: number;
  quantity: number;
};

const IndexCar = () => {
  const [modalProps, setModalProps] = useState<{
    message: string;
    isOpen: boolean;
    index: number;
  }>({
    message: "",
    isOpen: false,
    index: 0,
  });

  const [packs, setPacks] = useState<Pack[]>([
    {
      title: "Pack de KFC",
      price: 8.99,
      quantity: 2,
    },
    {
      title: "Pack de Menestras del negro",
      price: 10.99,
      discountPrice: 7.99,
      quantity: 1,
    },
  ]);

  const increment = (index: number) => {
    setPacks((prevPacks) =>
      prevPacks.map((pack, i) =>
        i === index ? { ...pack, quantity: pack.quantity + 1 } : pack
      )
    );
  };

  const decrement = (index: number) => {
    setPacks((prevPacks) =>
      prevPacks.map((pack, i) =>
        i === index ? { ...pack, quantity: pack.quantity - 1 } : pack
      )
    );
  };

  const removePack = () => {
    setPacks((prevPacks) => prevPacks.filter((_, i) => i !== modalProps.index));
    modalProps.isOpen = false;
  };

  return (
    <View className="px-6 flex gap-4">
      {packs.map((item, index) => (
        <PackCard
          key={index}
          home={false}
          title={item.title}
          price={item.price}
          quantityValue={item.quantity}
          discountPrice={item.discountPrice}
          onIncrement={() => increment(index)}
          onDecrement={() => decrement(index)}
          onOpenModal={() =>
            setModalProps((prev) => ({
              ...prev,
              isOpen: true,
              message: item.title,
              index: index,
            }))
          }
        />
      ))}
      <Pressable className="bg-danger active:bg-danger/60 py-4 rounded-xl">
        <Text className="text-white text-center font-semibold text-xl">
          Vaciar carrito
        </Text>
      </Pressable>
      <ModalInfo
        cart={true}
        message={modalProps.message}
        onClose={() => setModalProps((prev) => ({ ...prev, isOpen: false }))}
        onUnDone={() => removePack()}
        isOpen={modalProps.isOpen}
      />
    </View>
  );
};

export default IndexCar;
