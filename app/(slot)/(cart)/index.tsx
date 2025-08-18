import { Pressable, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import PackCard from "@/components/PackCard";
import { IconEmpty } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import { useCartStore } from "@/presentation/packages/store/usePacksStore";

const IndexCar = () => {
  const { cart, clearCart } = useCartStore();

  return (
    <>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          renderItem={({ item, index }) => (
            <View className="px-6 my-4">
              <PackCard key={index} home={false} info={item} />
            </View>
          )}
          ListFooterComponent={
            <View className="px-6 mb-20">
              <Pressable
                onPress={clearCart}
                className="bg-danger active:bg-danger/60 py-4 rounded-xl"
              >
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
      ) : (
        <View className="flex flex-1 justify-center items-center">
          <Text className="text-xl text-color font-semibold text-center">
            No existen productos agregados por el momento
          </Text>
          <IconEmpty color={Colors.color} size={60} />
        </View>
      )}
    </>
  );
};

export default IndexCar;
