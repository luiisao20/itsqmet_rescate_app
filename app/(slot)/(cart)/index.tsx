import { Pressable, Text, View } from "react-native";
import { useState } from "react";
import PackCard from "@/components/PackCard";
import { Pack } from "@/infraestructure/interfaces/PackInterface";
import { FlatList } from "react-native-gesture-handler";

const IndexCar = () => {
  const [packs, setPacks] = useState<Pack[]>([
    {
      title: "Kentucky Fried Chicken",
      price: 8.99,
      distance: 1,
      rate: 4.8,
      pickUp: "12:00PM - 1:00PM",
      packsLeft: 3,
      logo: require("@/assets/images/packs/logo-kfc.png"),
      background: require("@/assets/images/packs/background-kfc.png"),
      quantity: 3,
    },
    {
      title: "La Casa de la Humita",
      price: 3.5,
      distance: 0.8,
      rate: 4.6,
      pickUp: "10:30AM - 11:30AM",
      packsLeft: 5,
      logo: require("@/assets/images/packs/logo-humitas.png"),
      background: require("@/assets/images/packs/background-humitas.png"),
      quantity: 1,
    },
  ]);

  return (
    <FlatList
      data={packs}
      renderItem={({ item, index }) => (
        <View className="px-6 my-4">
          <PackCard key={index} home={false} info={item} />
        </View>
      )}
      ListFooterComponent={
        <View className="px-6 mb-20">
          <Pressable className="bg-danger active:bg-danger/60 py-4 rounded-xl">
            <Text className="text-white text-center font-semibold text-xl">
              Vaciar carrito
            </Text>
          </Pressable>
        </View>
      }
      removeClippedSubviews={true}
      maxToRenderPerBatch={5}
      updateCellsBatchingPeriod={100}
      initialNumToRender={5}
      windowSize={10}
      getItemLayout={(_, index) => ({
        length: 300,
        offset: 300 * index,
        index,
      })}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default IndexCar;
