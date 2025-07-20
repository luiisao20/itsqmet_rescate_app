import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import {
  IconCard,
  IconFast,
  IconGo,
  IconStandard,
  IconWait,
} from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";

type Time = {
  id: number;
  label: string;
  description: string;
  time: string;
  price: number;
};

const PayScreen = () => {
  const address =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus soluta debitis ipsa est, assumenda necessitatibus voluptas deserunt voluptatum quas? Nihil sequi ut fuga error earum optio commodi pariatur tenetur labore.";
  const [selected, setSelected] = useState<number>(2);

  const numberCard: string = "3234345698987654";
  const options: Time[] = [
    {
      id: 1,
      label: "Más rápido",
      description: "Entrega directa a ti",
      time: "20 - 45 min",
      price: 0.79,
    },
    {
      id: 2,
      label: "Estándard",
      description: "Entrega regular",
      time: "30 - 50 min",
      price: 0,
    },
    {
      id: 3,
      label: "Ahorra sin apurarte",
      description: "Espera y ahorra",
      time: "45 - 65 min",
      price: -0.59,
    },
  ];

  const renderIcon = (price: number) => {
    if (price > 0) return <IconFast size={16} color={Colors.color} />;
    else if (price === 0)
      return <IconStandard size={16} color={Colors.color} />;
    else return <IconWait size={16} color={Colors.color} />;
  };

  return (
    <View className="py-4 gap-4 px-6">
      <Text className="text-xl text-color font-semibold">
        Dirección de entrega
      </Text>
      <Pressable className="flex p-2 flex-row justify-between items-center border-b-2 border-color active:bg-gray-200">
        <View className="w-4/5">
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className="text-lg font-light"
          >
            {address}
          </Text>
        </View>
        <IconGo color={Colors.color} />
      </Pressable>
      <Text className="text-xl text-color font-semibold">
        Tiempo de entrega
      </Text>
      <View className="flex gap-4">
        {options.map((opt) => (
          <Pressable
            key={opt.id}
            onPress={() => setSelected(opt.id)}
            className={`rounded-xl border-2 px-4 py-3 ${
              selected === opt.id
                ? "border-button bg-button/30"
                : "border-gray-300"
            }`}
          >
            <View className="flex flex-row items-center justify-between">
              <View>
                <View className="flex flex-row gap-4">
                  {renderIcon(opt.price)}
                  <Text className="text-base text-color">{opt.label}</Text>
                </View>
                <Text className="font-light text-sm text-gray-600">
                  {opt.description}
                </Text>
              </View>
              <Text
                className={`font-normal text-lg text-gray-600 ${
                  opt.price < 0 && "text-blue-600"
                }`}
              >
                ${opt.price}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-xl text-color font-semibold">Método de pago</Text>
        <Pressable className="bg-button py-2 px-4 rounded-xl active:bg-button/60">
          <Text className="text-white text-xl text-center">Cambiar</Text>
        </Pressable>
      </View>
      <View className="flex p-2 flex-row justify-between items-center border-b-2 border-color">
        <View className="flex flex-row items-center gap-4">
          <IconCard color={Colors.color} />
          <View>
            <Text className="text-lg font-light">Crédito *{numberCard.slice(-4)}</Text>
            <Text>Luis Bravo</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PayScreen;
