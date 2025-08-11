import { FlatList, Pressable, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { router } from "expo-router";

import Carousel from "@/components/PacksCarousel";
import { IconGo } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import { useCategories } from "@/presentation/categories/useCategories";

const PacksTab = () => {
  const { categoriesQuery } = useCategories();

  return (
    <View>
      {categoriesQuery.isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={categoriesQuery.data}
          renderItem={({ item }) => (
            <View className="px-6 my-4">
              <View className="flex flex-row gap-4 items-center justify-between mb-4">
                <Text className="text-lg font-semibold text-wrap w-3/4">
                  {item.subtitle}
                </Text>
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/(slot)/(packs)/[id]",
                      params: { id: item.id },
                    })
                  }
                  className="flex flex-row items-baseline gap-2"
                >
                  <Text className="text-color text-base font-semibold">
                    Entrar
                  </Text>
                  <IconGo size={10} color={Colors.color} />
                </Pressable>
              </View>
              <Carousel category={item} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default PacksTab;
